'use client'

import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'

import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes'

import { Button } from '../ui/button'
import { useSearchParams } from 'next/navigation'

export const Social = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT_URL,
    })
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button size={'lg'} variant={'outline'} className="w-full" onClick={() => onClick('google')}>
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button size={'lg'} variant={'outline'} className="w-full" onClick={() => onClick('github')}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
