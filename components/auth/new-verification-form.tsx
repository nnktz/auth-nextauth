'use client'

import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { CardWrapper } from './card-wrapper'
import { newVerification } from '@/actions/new-verification'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'

export const NewVerificationForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const onSubmit = useCallback(() => {
    if (success || error) {
      return
    }

    if (!token) {
      setError('Missing token!')
      return
    }

    newVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success)
        } else {
          setError(data.error)
        }
      })
      .catch(() => setError('Something went wrong!'))
  }, [error, success, token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <BeatLoader />}

        <FormError message={error} />

        {!error && <FormSuccess message={success} />}
      </div>
    </CardWrapper>
  )
}
