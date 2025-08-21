import { useEffect, useState } from 'react'

export function useLineCount(ref: React.RefObject<Element | null>) {
  const [lines, setLines] = useState(0)

  useEffect(() => {
    if (!ref?.current) return

    const el = ref.current

    const calculateLines = () => {
      const text = el.textContent || ''
      const computedStyle = getComputedStyle(el)

      // Cria um elemento temporário com as mesmas características do original
      const temp = document.createElement('div')
      temp.style.cssText = `
        position: absolute;
        visibility: hidden;
        width: ${el.clientWidth}px;
        font-family: ${computedStyle.fontFamily};
        font-size: ${computedStyle.fontSize};
        line-height: ${computedStyle.lineHeight};
        white-space: pre-wrap;
        word-wrap: break-word;
        margin: 0;
        padding: 0;
      `

      // Cria um elemento com o texto em uma única linha para referência
      const singleLine = document.createElement('div')
      singleLine.style.cssText = temp.style.cssText + 'white-space: nowrap;'
      singleLine.textContent = text

      document.body.appendChild(singleLine)
      const singleLineWidth = singleLine.offsetWidth
      document.body.removeChild(singleLine)

      // Se o texto em uma linha é menor que a largura disponível, é uma linha
      if (singleLineWidth <= el.clientWidth) {
        setLines(1)
        return
      }

      // Se precisar de mais de uma linha, retorna 2 (devido ao truncate-2-lines)
      setLines(2)
    }

    calculateLines()

    const ro = new ResizeObserver(calculateLines)
    ro.observe(el)

    return () => ro.disconnect()
  }, [ref])

  return lines
}
