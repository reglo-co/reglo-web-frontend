import { BreadcrumbAuto } from '@core/ui'

type HeaderProjectProps = {
  breadcrumb?: {
    title?: string
    url?: string
  }[]
}

export function HeaderProject({ breadcrumb }: HeaderProjectProps) {
  return (
    <header className="border-border/50 flex items-center gap-4 border-b pb-4 pl-1">
      {breadcrumb && (
        <BreadcrumbAuto
          breadcrumb={breadcrumb.map((item) => ({
            title: item.title ?? '',
            url: item.url,
          }))}
        />
      )}
    </header>
  )
}
