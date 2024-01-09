'use client'

import { useRouter } from 'next/navigation'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

export const LoginButton = ({ children }: LoginButtonProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push('/auth/login')
  }

  return (
    <span role="button" onClick={onClick}>
      {children}
    </span>
  )
}
