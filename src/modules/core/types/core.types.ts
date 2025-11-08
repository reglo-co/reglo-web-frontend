export type PropsWithClassname = {
  className?: string
}

export type PropsWithParams<T extends Record<string, string>> = {
  params: Promise<T>
}
