import { PropsWithChildren } from 'react'

export function Fieldset({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  return (
    <fieldset>
      <legend>{title}</legend>
      {children}
    </fieldset>
  )
}
