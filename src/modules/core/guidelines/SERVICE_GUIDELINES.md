# Service Guidelines - Reglo Web Frontend

## Padrão para Criação de Novos Services

Este documento define o padrão para criação de services na aplicação.

## Template Básico

### Service com Fallback (operações de leitura)

```typescript
import { Result } from '@core/entities'
import { api } from '@lib/api'
import { executeService } from '@core/lib/service-helpers'

const SERVICE_NAME = 'myNewService'

type MyResponse = {
  data: string[]
  total: number
}

export async function myNewService(
  param: string
): Promise<Result<MyResponse>> {
  return executeService(
    SERVICE_NAME,
    () => api.get<MyResponse>(`endpoint/${param}`),
    { fallback: { data: [], total: 0 } }
  )
}
```

### Service sem Fallback (operações de escrita)

```typescript
import { Result } from '@core/entities'
import { api } from '@lib/api'
import { executeService } from '@core/lib/service-helpers'

const SERVICE_NAME = 'createSomething'

type CreatePayload = {
  name: string
  value: number
}

type CreateResponse = {
  id: string
  createdAt: string
}

export async function createSomething(
  payload: CreatePayload
): Promise<Result<CreateResponse>> {
  return executeService(
    SERVICE_NAME,
    () => api.post<CreateResponse>('endpoint', payload)
  )
}
```

### Service com Retorno Booleano

```typescript
import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'

const SERVICE_NAME = 'checkAvailability'

export async function checkAvailability(
  value: string
): Promise<Result<boolean>> {
  return executeService(
    SERVICE_NAME,
    async () => {
      const response = await api.get<{ available: boolean }>(`check/${value}`)
      return response.available
    },
    { fallback: false }
  )
}
```

## Regras Obrigatórias

### 1. Nome do Service

```typescript
const SERVICE_NAME = 'myServiceName'
```

- ✅ Use o mesmo nome da função
- ✅ Use camelCase
- ✅ Seja descritivo e específico

### 2. Tipagem

```typescript
export async function myService(
  param: string
): Promise<Result<MyType>> {
  // ...
}
```

- ✅ Sempre tipifique os parâmetros
- ✅ Sempre tipifique o retorno
- ✅ Use types/interfaces para responses complexas

### 3. Fallback Values

**Para operações de leitura (GET):**
```typescript
{ fallback: { list: [], total: 0 } }  // ✅ Listas vazias
{ fallback: null }                     // ✅ Itens opcionais
{ fallback: false }                    // ✅ Booleanos
```

**Para operações de escrita (POST/PUT/DELETE):**
```typescript
// ❌ NÃO use fallback
// ✅ Deixe o erro ser propagado via Result
return executeService(SERVICE_NAME, operation)
```

### 4. Imports

```typescript
import { Result } from '@core/entities'
import { api } from '@lib/api'
import { executeService, ServiceLogger } from '@core/lib/service-helpers'
```

- ✅ Use imports absolutos
- ✅ Agrupe por origem (core, lib, types)
- ✅ Ordene alfabeticamente

## Quando Usar Cada Padrão

### executeService com Fallback (operações não-críticas)

**Use quando:**
- ✅ Operação de leitura que não deve quebrar a UI
- ✅ Falha pode ser tratada com valor padrão seguro
- ✅ Hook pode fazer unwrap com `.getDataOrDefault()`

**Exemplo:** `checkSlugAvailable`, `listOrganizations`

```typescript
return executeService(
  SERVICE_NAME,
  () => api.get<Data>('endpoint'),
  { fallback: defaultValue }
)
```

### executeService sem Fallback (operações críticas)

**Use quando:**
- ✅ Operação de escrita (create, update, delete)
- ✅ Erro deve ser propagado para tratamento específico
- ✅ Hook deve fazer unwrap com `.getDataOrThrow()`

**Exemplo:** `createOrganization`, `updateProject`

```typescript
return executeService(
  SERVICE_NAME,
  () => api.post<Data>('endpoint', payload)
)
```

### Logging Manual

**Use quando:**
- ✅ Precisa de log adicional além do automático
- ✅ Quer registrar sucesso ou informações
- ✅ Debugging complexo

```typescript
import { ServiceLogger } from '@core/lib/service-helpers'

ServiceLogger.info(SERVICE_NAME, 'Operation completed', { 
  itemsProcessed: 10 
})
```

## Exemplos por Tipo de Operação

### GET - Lista

```typescript
type ListResponse = {
  list: Item[]
  total: number
}

export async function listItems(): Promise<Result<ListResponse>> {
  return executeService(
    'listItems',
    () => api.get<ListResponse>('items'),
    { fallback: { list: [], total: 0 } }
  )
}
```

### GET - Item Único

```typescript
export async function getItemById(
  id: string
): Promise<Result<Item | null>> {
  return executeService(
    'getItemById',
    () => api.get<Item>(`items/${id}`),
    { fallback: null }
  )
}
```

### POST - Criar

```typescript
type CreateItemPayload = Pick<Item, 'name' | 'description'>

export async function createItem(
  data: CreateItemPayload
): Promise<Result<Item>> {
  return executeService(
    'createItem',
    () => api.post<Item>('items', data)
  )
}
```

### PUT/PATCH - Atualizar

```typescript
export async function updateItem(
  id: string,
  data: Partial<Item>
): Promise<Result<Item>> {
  return executeService(
    'updateItem',
    () => api.patch<Item>(`items/${id}`, data)
  )
}
```

### DELETE

```typescript
export async function deleteItem(
  id: string
): Promise<Result<void>> {
  return executeService(
    'deleteItem',
    () => api.delete<void>(`items/${id}`)
  )
}
```

### Verificação (boolean)

```typescript
export async function canAccessItem(
  id: string
): Promise<Result<boolean>> {
  return executeService(
    'canAccessItem',
    async () => {
      const response = await api.get<{ hasAccess: boolean }>(`items/${id}/access`)
      return response.hasAccess
    },
    { fallback: false }
  )
}
```

## Consumindo Services nos Hooks

### Operações de Escrita (Mutations)

```typescript
import { useMutation } from '@tanstack/react-query'
import { createItem } from './services'

export function useCreateItem() {
  return useMutation({
    mutationFn: async (data) => {
      const result = await createItem(data)
      return result.getDataOrThrow()  // ✅ Propaga erro para React Query
    }
  })
}
```

### Operações de Leitura (Queries)

```typescript
import { useQuery } from '@tanstack/react-query'
import { listItems } from './services'

export function useListItems() {
  const response = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const result = await listItems()
      return result.getDataOrDefault({ list: [], total: 0 })  // ✅ Sempre retorna dados válidos
    }
  })

  return {
    items: response.data?.list || [],
    total: response.data?.total || 0,
    isLoading: response.isLoading,
  }
}
```

### Verificações Booleanas

```typescript
import { useQuery } from '@tanstack/react-query'
import { canAccessItem } from './services'

export function useCanAccessItem(id: string) {
  const response = useQuery({
    queryKey: ['can-access', id],
    queryFn: async () => {
      const result = await canAccessItem(id)
      return result.getDataOrDefault(false)  // ✅ Retorna false em caso de erro
    },
    enabled: !!id,
  })

  return {
    canAccess: response.data ?? false,
    isLoading: response.isLoading,
  }
}
```

## Erros Comuns a Evitar

### ❌ NÃO fazer try-catch manual

```typescript
// ❌ ERRADO
export async function myService() {
  try {
    return await api.get('endpoint')
  } catch (error) {
    console.error(error)
    return null
  }
}

// ✅ CORRETO
export async function myService(): Promise<Result<Data | null>> {
  return executeService(
    'myService',
    () => api.get<Data>('endpoint'),
    { fallback: null }
  )
}
```

### ❌ NÃO usar console.log/error direto

```typescript
// ❌ ERRADO
console.error('Error:', error)

// ✅ CORRETO
ServiceLogger.error('myService', error, { context: 'additional info' })
```

### ❌ NÃO retornar tipos primitivos diretamente (sem Result)

```typescript
// ❌ ERRADO - Perde contexto de erro
export async function myService(): Promise<Data | null> {
  try {
    return await api.get<Data>('endpoint')
  } catch {
    return null  // Erro silencioso!
  }
}

// ✅ CORRETO - Result pattern consistente
export async function myService(): Promise<Result<Data | null>> {
  return executeService(
    'myService',
    () => api.get<Data>('endpoint'),
    { fallback: null }
  )
}
```

### ❌ NÃO ignorar erros

```typescript
// ❌ ERRADO
export async function myService() {
  try {
    return await api.get('endpoint')
  } catch {
    return { list: [] }  // Erro silencioso!
  }
}

// ✅ CORRETO
export async function myService(): Promise<Result<ListResponse>> {
  return executeService(
    'myService',
    () => api.get<ListResponse>('endpoint'),
    { fallback: { list: [], total: 0 } }  // Erro registrado + fallback
  )
}
```

## Checklist para Novos Services

Antes de criar um PR, verifique:

- [ ] Service name constante definida
- [ ] Imports corretos (`@core/entities`, `@lib/api`, `@core/lib/service-helpers`)
- [ ] Tipagem completa (parâmetros e retorno)
- [ ] Uso de `executeService` ou `executeServiceWithFallback`
- [ ] Fallback apropriado para o tipo de operação
- [ ] Types/interfaces exportados se necessário
- [ ] Hook correspondente criado/atualizado
- [ ] Testes (se aplicável)
- [ ] Documentação (se API complexa)

## Troubleshooting

### Erro: "Cannot access data on a failed result"

```typescript
// ❌ Tentando acessar .data sem verificar
const result = await myService()
console.log(result.data)  // Pode lançar erro!

// ✅ Use métodos seguros
const result = await myService()
console.log(result.getDataOrDefault(defaultValue))
// ou
if (result.ok) {
  console.log(result.data)
}
```

### Hook não atualiza após mudança no service

```typescript
// ✅ Certifique-se de usar getDataOrDefault ou getDataOrThrow
queryFn: async () => {
  const result = await myService()
  return result.getDataOrDefault(defaultValue)
}
```

### Logs não aparecem

```typescript
// ✅ Verifique se está usando ServiceLogger
import { ServiceLogger } from '@core/lib/service-helpers'

ServiceLogger.error('serviceName', error)
```

## Referências

- `src/modules/core/lib/service-helpers.ts` - Implementação dos helpers
- `src/modules/core/entities/result.entity.ts` - Result pattern
- `MELHORIAS_SERVICES_PT.md` - Documentação completa das melhorias

## Perguntas?

Em caso de dúvidas, consulte os services existentes como referência ou revise este documento.

