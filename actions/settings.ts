'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { getUserByEmail, getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { SettingsSchema } from '@/schemas'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import { update } from '@/auth'

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: 'Unauthorized' }
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' }
    }

    const verificationToken = await generateVerificationToken(values.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: 'Verification email sent!' }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password)

    if (!passwordMatch) {
      return { error: 'Incorrect password!' }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)

    values.password = hashedPassword
    values.newPassword = undefined
  }

  const updateUer = await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  })

  update({
    user: {
      name: updateUer.name,
      email: updateUer.email,
      isTwoFactorEnabled: updateUer.isTwoFactorEnabled,
      role: updateUer.role,
    },
  })

  return { success: 'Settings updated!' }
}