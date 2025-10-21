'use client'

import { Footer, HeaderHero, Navigation } from '@/modules/common/components'
import { Button } from '@/modules/common/components/ui'
import { KanbanBoard, KanbanItemModal } from '@kanban/components'
import { kanbanData } from '@kanban/data'
import { KanbanData } from '@kanban/types'
import { Plus } from 'lucide-react'

export default function KanbanPage() {
  const data: KanbanData = kanbanData

  return (
    <div className="container mx-auto">
      <HeaderHero />
      <section id="kanban" className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div
            data-slot="kanban-header"
            className="mb-16 flex items-start justify-between"
          >
            <div>
              <h1 className="text-foreground mb-2 text-3xl font-bold">
                Kanban Board
              </h1>
              <p className="text-muted-foreground">
                Visualize o progresso das funcionalidades que mapeamos para a
                nossa plataforma.
              </p>
            </div>
            <Navigation.link
              href="https://forms.gle/zkMSiLW5DhqHRedBA"
              target="_blank"
            >
              <Button variant="secondary" rounded>
                <Plus strokeWidth={1.25} className="text-rg-gray-6 size-4" />
                Sugerir funcionalidade
              </Button>
            </Navigation.link>
          </div>

          <KanbanBoard data={data} />
          <KanbanItemModal />
        </div>
      </section>
      <Footer />
    </div>
  )
}
