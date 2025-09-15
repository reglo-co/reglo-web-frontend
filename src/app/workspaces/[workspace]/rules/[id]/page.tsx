import { notFound } from 'next/navigation'

type PageProps = {
  params: {
    workspace: string
    id: string
  }
}

export default function RuleDetailPage({ params }: PageProps) {
  // Esta é a rota principal que será interceptada pelo modal
  // Quando acessada diretamente (sem intercepting), mostra a página completa
  // Quando interceptada, o modal será exibido sobre a página atual

  // Por enquanto, vamos mostrar um conteúdo básico
  // Você pode implementar a lógica de busca da regra aqui
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Regra {params.id}</h1>
      <p className="text-gray-600">
        Esta é a página da regra {params.id} no workspace {params.workspace}.
      </p>
      <p className="mt-4 text-sm text-gray-500">
        Quando você clicar em um link para esta rota, o intercepting route deve
        mostrar um modal. Quando você acessar diretamente a URL, esta página
        será exibida.
      </p>
    </div>
  )
}
