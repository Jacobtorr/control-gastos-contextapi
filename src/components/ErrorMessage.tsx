import { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className='bg-red-600 text-white font-bold p-2 text-center text-sm rounded-lg uppercase'>{children}</p>
  )
}

