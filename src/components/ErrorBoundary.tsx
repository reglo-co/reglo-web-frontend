'use client'

import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] Captured error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    })
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false, error: null })
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="bg-background flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md space-y-4 text-center">
            <h2 className="text-2xl font-bold">Algo deu errado</h2>
            <p className="text-muted-foreground">
              Ocorreu um erro inesperado. Por favor, tente novamente.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="bg-muted mt-4 rounded-md p-4 text-left">
                <summary className="cursor-pointer font-medium">
                  Detalhes do erro (dev)
                </summary>
                <pre className="mt-2 overflow-auto text-xs">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={this.handleReset}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-md px-4 py-2 transition-colors"
              >
                Tentar novamente
              </button>
              <button
                onClick={this.handleReload}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
              >
                Recarregar página
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
