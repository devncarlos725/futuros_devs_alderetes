'use client'

import { useEffect, type ReactNode } from 'react'

export function ScrollRevealRoot({ children }: { children: ReactNode }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.06,
        rootMargin: '0px 0px -5% 0px',
      },
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return <div className="min-w-0">{children}</div>
}
