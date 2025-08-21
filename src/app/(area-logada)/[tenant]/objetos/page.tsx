'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useElementos } from '@/lib/elementos-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Hash, Plus, Calendar, Trash2, Edit } from 'lucide-react'
import { withGlobalLoading } from '@/modules/common/components/global-loading'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function Page() {
  const { elementos, excluirElemento, carregando } = useElementos()
  const [excluindo, setExcluindo] = useState<string | null>(null)

  const handleExcluir = async (id: string, hashtag: string) => {
    if (!confirm(`Tem certeza que deseja excluir o elemento ${hashtag}?`)) {
      return
    }

    setExcluindo(id)
    try {
      await excluirElemento(id)
    } catch (error) {
      alert('Erro ao excluir elemento')
    } finally {
      setExcluindo(null)
    }
  }

  if (carregando) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Hash className="text-primary h-6 w-6" />
              <h1 className="-ml-2 text-2xl font-bold">Objetos</h1>
            </div>
            <Link href="/objetos/criar">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Criar Objeto
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {elementos.length === 0 ? (
          <div className="py-12 text-center">
            <Hash className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-semibold">
              Nenhum objeto encontrado
            </h2>
            <p className="text-muted-foreground mb-6">
              Comece criando seu primeiro objeto
            </p>
            <Link href="/objetos/criar">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Objeto
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Todos os Objetos</h2>
                <p className="text-muted-foreground">
                  {elementos.length} objeto(s) encontrado(s)
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {elementos.map((elemento) => (
                <Card
                  key={elemento.id}
                  className="transition-shadow hover:shadow-lg"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono text-sm">
                        {elemento.hashtag}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-xs">
                      <Calendar className="h-3 w-3" />
                      Criado em{' '}
                      {new Date(elemento.criadoEm).toLocaleDateString('pt-BR')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {elemento.descricao || 'Sem descrição'}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          handleExcluir(elemento.id, elemento.hashtag)
                        }
                        disabled={excluindo === elemento.id}
                      >
                        {excluindo === elemento.id ? (
                          <div className="h-3 w-3 animate-spin rounded-full border-b-2 border-white"></div>
                        ) : (
                          <>
                            <Trash2 className="mr-1 h-3 w-3" />
                            Excluir
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default withGlobalLoading(Page)
