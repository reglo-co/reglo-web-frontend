import { cn } from '@/lib/utils'
import type { PropsWithChildren } from 'react'

export type TypographProps = PropsWithChildren & {
  className?: string
}

function TypographyH1({ children, className }: TypographProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-bold tracking-tight text-balance',
        className
      )}
    >
      {children}
    </h1>
  )
}

function TypographyH2({ children, className }: TypographProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h2>
  )
}

function TypographyH3({ children, className }: TypographProps) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h3>
  )
}

function TypographyH4({ children, className }: TypographProps) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h4>
  )
}

function TypographyP({ children, className }: TypographProps) {
  return <p className={cn('leading-7', className)}>{children}</p>
}

function TypographyBlockquote({ children, className }: TypographProps) {
  return (
    <blockquote className={cn('border-l-2 pl-4 italic', className)}>
      {children}
    </blockquote>
  )
}

function TypographyInlineCode({ children, className }: TypographProps) {
  return (
    <code
      className={cn(
        'bg-muted relative rounded font-mono text-sm font-semibold',
        className
      )}
    >
      {children}
    </code>
  )
}

function TypographyLead({ children, className }: TypographProps) {
  return (
    <p className={cn('text-muted-foreground text-xl', className)}>{children}</p>
  )
}

function TypographyLarge({ children, className }: TypographProps) {
  return (
    <div className={cn('text-lg font-semibold', className)}>{children}</div>
  )
}

function TypographySmall({ children, className }: TypographProps) {
  return (
    <small className={cn('text-sm leading-none font-medium', className)}>
      {children}
    </small>
  )
}

function TypographyMuted({ children, className }: TypographProps) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
  )
}

function TypographyTableWrapper({ children, className }: TypographProps) {
  return <table className={cn('w-full', className)}>{children}</table>
}

function TypographyTableHeader({ children, className }: TypographProps) {
  return <thead className={cn('w-full', className)}>{children}</thead>
}

function TypographyTableBody({ children, className }: TypographProps) {
  return <tbody className={cn('w-full', className)}>{children}</tbody>
}

function TypographyTableTr({ children, className }: TypographProps) {
  return <tr className={cn('even:bg-muted border-t', className)}>{children}</tr>
}

function TypographyTableTh({ children, className }: TypographProps) {
  return (
    <th
      className={cn(
        'border text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
    >
      {children}
    </th>
  )
}

function TypographyTableTd({ children, className }: TypographProps) {
  return (
    <td
      className={cn(
        'border text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
    >
      {children}
    </td>
  )
}

function TypographyListWrapper({ children, className }: TypographProps) {
  return <ul className={cn('list-disc', className)}>{children}</ul>
}

function TypographyListItem({ children, className }: TypographProps) {
  return <li className={cn('', className)}>{children}</li>
}

export const Typo = {
  H1: TypographyH1,
  H2: TypographyH2,
  H3: TypographyH3,
  H4: TypographyH4,
  P: TypographyP,
  Blockquote: TypographyBlockquote,
  InlineCode: TypographyInlineCode,
  Lead: TypographyLead,
  Large: TypographyLarge,
  Small: TypographySmall,
  Muted: TypographyMuted,
  Table: {
    Wrapper: TypographyTableWrapper,
    Header: TypographyTableHeader,
    Body: TypographyTableBody,
    Tr: TypographyTableTr,
    Th: TypographyTableTh,
    Td: TypographyTableTd,
  },
  List: {
    Wrapper: TypographyListWrapper,
    Item: TypographyListItem,
  },
}
