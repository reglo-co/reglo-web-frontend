import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { MessageCircle, MoreHorizontal, Plus } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { withGlobalLoading } from '@/modules/common/components/global-loading'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function Page() {
  return (
    <div className="flex flex-col gap-10 px-8 py-6">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">Refinamentos</h1>
          <p className="text-muted-foreground ml-0.5">
            Refine suas ideias e dúvidas antes de move-las como regras de
            negócio
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="size-4" />
          Nova dúvida ou sugestão
        </Button>
      </div>

      <Tabs defaultValue="duvidas" className="w-full">
        <TabsList>
          <TabsTrigger value="duvidas">Dúvidas e Sugestões</TabsTrigger>
          <TabsTrigger value="refinamentos">Refinamentos</TabsTrigger>
        </TabsList>
        <TabsContent value="refinamentos">
          Change your password here.
        </TabsContent>
        <TabsContent value="duvidas">
          <div className="mt-2 flex cursor-pointer items-center gap-2 pl-2">
            <Checkbox id="ask-qtde" />
            <label htmlFor="ask-qtde" className="cursor-pointer">
              0 itens selecionados
            </label>
          </div>
          <div className="mt-6 grid w-full grid-cols-2 gap-4">
            <Card className="hover:bg-muted/30 cursor-pointer transition">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <Checkbox id="ask-item-1" />
                    <label
                      htmlFor="ask-item-1"
                      className="cursor-pointer text-lg"
                    >
                      O que acontece quando o usuário quando o usuário é
                      deletado?
                    </label>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </CardTitle>
              </CardHeader>

              <CardDescription className="flex flex-col gap-2 px-6">
                <span>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facere, eum a. Praesentium iste temporibus accusantium quod
                  iusto corporis, esse non cupiditate sint quae fuga dolor
                  itaque fugiat error hic labore.
                </span>
                <div className="mt-2 -ml-2 flex items-center justify-between gap-2">
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="relative -top-[0.5px] size-4" />
                    <span className="font-semibold">0</span>
                  </Button>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-green-200 text-green-800"
                    >
                      Aberto
                    </Badge>
                    <Avatar className="size-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardDescription>
            </Card>
            <Card className="hover:bg-muted/30 cursor-pointer transition">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <Checkbox id="ask-item-2" />
                    <label
                      htmlFor="ask-item-2"
                      className="cursor-pointer text-lg"
                    >
                      O que acontece quando o usuário quando o usuário é
                      deletado?
                    </label>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </CardTitle>
              </CardHeader>

              <CardDescription className="flex flex-col gap-2 px-6">
                <span>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facere, eum a. Praesentium iste temporibus accusantium quod
                  iusto corporis, esse non cupiditate sint quae fuga dolor
                  itaque fugiat error hic labore.
                </span>
                <div className="mt-2 -ml-2 flex items-center justify-between gap-2">
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="relative -top-[0.5px] size-4" />
                    <span className="font-semibold">0</span>
                  </Button>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-green-200 text-green-800"
                    >
                      Aberto
                    </Badge>
                    <Avatar className="size-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardDescription>
            </Card>
            <Card className="hover:bg-muted/30 cursor-pointer transition">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <Checkbox id="ask-item-3" />
                    <label
                      htmlFor="ask-item-3"
                      className="cursor-pointer text-lg"
                    >
                      O que acontece quando o usuário quando o usuário é
                      deletado?
                    </label>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </CardTitle>
              </CardHeader>

              <CardDescription className="flex flex-col gap-2 px-6">
                <span>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facere, eum a. Praesentium iste temporibus accusantium quod
                  iusto corporis, esse non cupiditate sint quae fuga dolor
                  itaque fugiat error hic labore.
                </span>
                <div className="mt-2 -ml-2 flex items-center justify-between gap-2">
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="relative -top-[0.5px] size-4" />
                    <span className="font-semibold">0</span>
                  </Button>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-green-200 text-green-800"
                    >
                      Aberto
                    </Badge>
                    <Avatar className="size-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardDescription>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default withGlobalLoading(Page)
