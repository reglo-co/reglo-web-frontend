'use client'

import { Breadcrumb } from '@/components/ui/navigation/breadcrumb'
import { Typo } from '@/modules/common/components/typo'
import type { PropsWithChildren } from 'react'

type RuleSubItemProps = {
  title: string
  description: string
}

function RuleSubItem({ title, description }: RuleSubItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <Typo.H4>{title}</Typo.H4>
      <Typo.Muted className="text-base">{description}</Typo.Muted>
    </div>
  )
}

type RuleMainProps = PropsWithChildren & {
  title: string
  description: string
}

function RuleMain({ title, description, children }: RuleMainProps) {
  return (
    <div className="flex flex-col gap-4">
      <Typo.H2>{title}</Typo.H2>
      <Typo.Muted className="text-base">{description}</Typo.Muted>
      <div className="flex flex-col gap-6 pt-3">{children}</div>
    </div>
  )
}

function RuleManager() {
  return (
    <div className="flex flex-col gap-10">
      <RuleMain
        title="1. Criação de Recebedores"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      >
        <RuleSubItem
          title="1.1. Fluxo Principal"
          description="Consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
        />
        <RuleSubItem
          title="1.2. Tratamento da Resposta"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
        />
        <RuleSubItem
          title="1.3. Migração para Tabela"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
        />
      </RuleMain>
      <RuleMain
        title="2. Fluxos Secundários"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      >
        <RuleSubItem
          title="2.1. Criar ou alterar regra"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
        />
      </RuleMain>
      <RuleMain
        title="3. Fluxos Terciários"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      >
        <RuleSubItem
          title="3.1. Criar ou alterar regra"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
        />
      </RuleMain>
    </div>
  )
}

export default function Page() {
  return (
    <div className="flex w-full flex-col">
      <Breadcrumb />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-14 px-10 pt-20">
        <Typo.H1>Plano de Desenvolvimento: Recebedores Pagar.me</Typo.H1>
        <RuleManager />
      </div>
    </div>
  )
}
