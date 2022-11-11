import { ReactNode } from 'react'

const FormErrorMessage = ({ children }: { children: ReactNode }) => (
  <p className='mt-1 block text-left text-sm text-red-600'>{children}</p>
)

export default FormErrorMessage
