import { CircleCheck, CircleDot, CircleX, Loader2 } from 'lucide-react'

export type VerifyInputStatus = 'success' | 'invalid' | 'neutral' | 'loading'

type VerifyInputProps = {
  status?: VerifyInputStatus
}

export function VerifyInput({ status = 'neutral' }: VerifyInputProps) {
  const Icon = {
    success: <CircleCheck className="text-rg-success mt-0.5 mr-2 size-3.5" />,
    invalid: <CircleX className="text-rg-invalid mt-0.5 mr-2 size-3.5" />,
    neutral: <CircleDot className="text-rg-gray-2 mt-0.5 mr-2 size-3.5" />,
    loading: (
      <Loader2 className="text-rg-gray-4 mt-0.5 mr-2 size-3.5 animate-spin" />
    ),
  }

  return <div className="flex items-center">{Icon[status]}</div>
}
