'use client'

import { Footer, HeaderHero } from '@/modules/common/components'
import { KanbanBoard, KanbanItemModal } from '@kanban/components'
import { kanbanData } from '@kanban/data'
import { KanbanData } from '@kanban/types'

export default function KanbanPage() {
  const data: KanbanData = kanbanData

  return (
    <div className="container mx-auto">
      <HeaderHero />
      <section id="kanban" className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-16">
            <h1 className="text-foreground mb-2 text-3xl font-bold">
              Kanban Board
            </h1>
            <p className="text-muted-foreground">
              Visualize o progresso das funcionalidades que mapeamos para a
              nossa plataforma.
            </p>
          </div>

          <KanbanBoard data={data} />
          <KanbanItemModal />
        </div>
      </section>
      <Footer />
    </div>
  )
}
