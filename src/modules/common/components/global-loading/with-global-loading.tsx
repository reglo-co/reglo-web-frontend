import type { ComponentType } from 'react'
import { GlobalLoadingWatch } from './global-loading-watch'

export function withGlobalLoading<P extends object>(Page: ComponentType<P>) {
  return function WrappedPage(props: P) {
    return (
      <>
        <GlobalLoadingWatch />
        <Page {...props} />
      </>
    )
  }
}
