'use client'

import { logout } from '@/actions/logout'

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const onClick = () => {
    logout()
  }

  return (
    <span role="button" onClick={onClick}>
      {children}
    </span>
  )
}
