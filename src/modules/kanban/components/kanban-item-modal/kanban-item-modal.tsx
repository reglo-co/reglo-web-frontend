import { LogoRegloSymbol } from '@common/components'
import { Modal } from '@common/components/modal'
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@common/components/ui'
import { AlertTriangle } from 'lucide-react'
import { useKanban } from '../../stores/kanban.store'

export function KanbanItemModal() {
  const { selectedItem } = useKanban()

  if (!selectedItem) return null

  const percentage = selectedItem.progressPercentage || 0

  return (
    <Modal.root name="kanban-item-details">
      <Modal.content className="max-w-2xl">
        <Modal.header>
          <Modal.title className="flex items-center gap-2 text-xl font-semibold">
            <LogoRegloSymbol className="text-rg-primary mt-0.5" />
            {selectedItem.title}
          </Modal.title>
        </Modal.header>

        <Modal.body>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-gray-200">
                <div
                  className="bg-rg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">{percentage}%</span>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {selectedItem.detailedDescription}
                </CardDescription>
              </CardContent>
            </Card>

            {selectedItem.blockedDescription && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-yellow-800">
                    <AlertTriangle className="mt-0.5 size-4" />
                    Em Impedimento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-yellow-700">
                    {selectedItem.blockedDescription}
                  </CardDescription>
                </CardContent>
              </Card>
            )}
          </div>
        </Modal.body>

        <Modal.footer className="flex w-full !flex-row !justify-between gap-4">
          <div>
            <h4 className="mb-2 text-sm font-medium">Relatores</h4>
            <div className="flex flex-wrap gap-2">
              {selectedItem.reporters.map((reporter, index) => (
                <Badge key={index} variant="secondary">
                  {reporter}
                </Badge>
              ))}
            </div>
          </div>
          <Modal.close asChild>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors">
              Fechar
            </button>
          </Modal.close>
        </Modal.footer>
      </Modal.content>
    </Modal.root>
  )
}
