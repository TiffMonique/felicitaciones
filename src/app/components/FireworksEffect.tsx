'use client'

import { useEffect, useRef } from 'react'
import { Fireworks, FireworksHandlers } from '@fireworks-js/react'

export function FireworksEffect() {
  const fireworksRef = useRef<FireworksHandlers>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (fireworksRef.current) {
        fireworksRef.current.launch(5)
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <Fireworks
      ref={fireworksRef}
      options={{
        opacity: 0.5,
        explosion: 7,
        intensity: 30,
        traceLength: 3,
        traceSpeed: 10,
        rocketsPoint: {
          min: 50,
          max: 50
        }
      }}
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
        background: 'transparent',
        zIndex: 1
      }}
    />
  )
}

