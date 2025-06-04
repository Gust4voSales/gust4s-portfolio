'use client'

import i18next from './i18next'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const runsOnServerSide = typeof window === 'undefined'

export function useT(ns?: string | string[], options?: { keyPrefix?: string }) {
  const lng = useParams()?.lng as string
  if (typeof lng !== 'string') throw new Error('useT is only available inside /app/[lng]')

  if (runsOnServerSide && i18next.resolvedLanguage !== lng) {
    i18next.changeLanguage(lng)
  }

  const ret = useTranslation(ns, options)
  const { i18n } = ret

  useEffect(() => {
    if (!runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng)
    }
  }, [lng, i18n])

  return ret
} 