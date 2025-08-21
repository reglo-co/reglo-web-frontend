'use client'

import type React from 'react'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Hash, ArrowLeft, Save, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useElementos } from '@/lib/elementos-context'

export default function CriarElementoPage() {
  const router = useRouter()
  const { criarElemento } = useElementos()
  const [hashtag, setHashtag] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)

  const validarHashtag = (valor: string) => {
    if (!valor) {
      return 'Hashtag é obrigatória'
    }
    if (!valor.startsWith('#')) {
      return 'Hashtag deve começar com #'
    }
    if (valor.length < 2) {
      return 'Hashtag deve ter pelo menos 2 caracteres'
    }
    if (!/^#[a-zA-Z0-9_-]+$/.test(valor)) {
      return 'Hashtag pode conter apenas letras, números, _ e -'
    }
    return ''
  }

  const handleHashtagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value

    // Adiciona # automaticamente se não estiver presente
    if (valor && !valor.startsWith('#')) {
      valor = '#' + valor
    }

    setHashtag(valor)
    setErro(validarHashtag(valor))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const erroValidacao = validarHashtag(hashtag)
    if (erroValidacao) {
      setErro(erroValidacao)
      return
    }

    setSalvando(true)

    try {
      await criarElemento(hashtag, descricao || undefined)
      router.push('/objetos')
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : 'Erro ao salvar elemento'
      )
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Link href="/objetos">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <Hash className="text-primary h-6 w-6" />
            <h1 className="text-2xl font-bold">Criar Objeto</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Novo Objeto</CardTitle>
            <CardDescription>
              Crie um novo objeto identificado por uma hashtag única
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="hashtag">Hashtag *</Label>
                <Input
                  id="hashtag"
                  type="text"
                  placeholder="#meu-elemento"
                  value={hashtag}
                  onChange={handleHashtagChange}
                  className={erro ? 'border-destructive' : ''}
                />
                {erro && (
                  <div className="text-destructive flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {erro}
                  </div>
                )}
                <p className="text-muted-foreground text-xs">
                  A hashtag deve começar com # e pode conter letras, números, _
                  e -
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição (opcional)</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva brevemente este objeto..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={3}
                />
                <p className="text-muted-foreground text-xs">
                  Uma descrição opcional para ajudar a identificar o elemento
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={!!erro || !hashtag || salvando}
                  className="flex-1"
                >
                  {salvando ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Criar Objeto
                    </>
                  )}
                </Button>
                <Link href="/objetos">
                  <Button type="button" variant="outline" disabled={salvando}>
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Sobre Objetos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Os objetos são objetos identificados por hashtags únicas.
              Futuramente, você poderá adicionar atributos personalizados como
              booleanos, números e strings para tornar seus objetos mais ricos e
              funcionais.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
