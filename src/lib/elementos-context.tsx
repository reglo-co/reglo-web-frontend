'use client'

import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

export interface Elemento {
  id: string
  hashtag: string
  descricao?: string
  criadoEm: string
  atualizadoEm: string
  atributos?: Record<string, unknown>
}

interface ElementosContextType {
  elementos: Elemento[]
  criarElemento: (hashtag: string, descricao?: string) => Promise<Elemento>
  atualizarElemento: (id: string, dados: Partial<Elemento>) => Promise<Elemento>
  excluirElemento: (id: string) => Promise<void>
  buscarElemento: (id: string) => Elemento | undefined
  buscarPorHashtag: (hashtag: string) => Elemento | undefined
  carregando: boolean
}

const ElementosContext = createContext<ElementosContextType | undefined>(
  undefined
)

export function ElementosProvider({ children }: { children: React.ReactNode }) {
  const [elementos, setElementos] = useState<Elemento[]>([])
  const [carregando, setCarregando] = useState(true)

  // Carrega elementos do localStorage na inicialização
  useEffect(() => {
    const carregarElementos = () => {
      try {
        const elementosSalvos = localStorage.getItem('elementos')
        if (elementosSalvos) {
          setElementos(JSON.parse(elementosSalvos))
        }
      } catch (error) {
        console.error('Erro ao carregar elementos:', error)
      } finally {
        setCarregando(false)
      }
    }

    carregarElementos()
  }, [])

  // Salva elementos no localStorage sempre que a lista muda
  useEffect(() => {
    if (!carregando) {
      try {
        localStorage.setItem('elementos', JSON.stringify(elementos))
      } catch (error) {
        console.error('Erro ao salvar elementos:', error)
      }
    }
  }, [elementos, carregando])

  const criarElemento = async (
    hashtag: string,
    descricao?: string
  ): Promise<Elemento> => {
    // Verifica se hashtag já existe
    const existente = elementos.find(
      (el) => el.hashtag.toLowerCase() === hashtag.toLowerCase()
    )
    if (existente) {
      throw new Error('Já existe um elemento com esta hashtag')
    }

    const novoElemento: Elemento = {
      id: crypto.randomUUID(),
      hashtag,
      descricao,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    }

    setElementos((prev) => [...prev, novoElemento])
    return novoElemento
  }

  const atualizarElemento = async (
    id: string,
    dados: Partial<Elemento>
  ): Promise<Elemento> => {
    const elemento = elementos.find((el) => el.id === id)
    if (!elemento) {
      throw new Error('Elemento não encontrado')
    }

    // Se está atualizando hashtag, verifica duplicatas
    if (dados.hashtag && dados.hashtag !== elemento.hashtag) {
      const existente = elementos.find(
        (el) =>
          el.id !== id &&
          el.hashtag.toLowerCase() === dados.hashtag!.toLowerCase()
      )
      if (existente) {
        throw new Error('Já existe um elemento com esta hashtag')
      }
    }

    const elementoAtualizado: Elemento = {
      ...elemento,
      ...dados,
      atualizadoEm: new Date().toISOString(),
    }

    setElementos((prev) =>
      prev.map((el) => (el.id === id ? elementoAtualizado : el))
    )
    return elementoAtualizado
  }

  const excluirElemento = async (id: string): Promise<void> => {
    const elemento = elementos.find((el) => el.id === id)
    if (!elemento) {
      throw new Error('Elemento não encontrado')
    }

    setElementos((prev) => prev.filter((el) => el.id !== id))
  }

  const buscarElemento = (id: string): Elemento | undefined => {
    return elementos.find((el) => el.id === id)
  }

  const buscarPorHashtag = (hashtag: string): Elemento | undefined => {
    return elementos.find(
      (el) => el.hashtag.toLowerCase() === hashtag.toLowerCase()
    )
  }

  const value: ElementosContextType = {
    elementos,
    criarElemento,
    atualizarElemento,
    excluirElemento,
    buscarElemento,
    buscarPorHashtag,
    carregando,
  }

  return (
    <ElementosContext.Provider value={value}>
      {children}
    </ElementosContext.Provider>
  )
}

export function useElementos() {
  const context = useContext(ElementosContext)
  if (context === undefined) {
    throw new Error(
      'useElementos deve ser usado dentro de um ElementosProvider'
    )
  }
  return context
}
