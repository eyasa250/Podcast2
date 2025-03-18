import { createContext, useContext, useState, ReactNode } from 'react'

interface FloatingPlayerContextType {
  isVisible: boolean
  showPlayer: () => void
  hidePlayer: () => void
}

const FloatingPlayerContext = createContext<FloatingPlayerContextType | undefined>(undefined)

export const FloatingPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false)

  const showPlayer = () => setIsVisible(true)
  const hidePlayer = () => setIsVisible(false)

  return (
    <FloatingPlayerContext.Provider value={{ isVisible, showPlayer, hidePlayer }}>
      {children}
    </FloatingPlayerContext.Provider>
  )
}

export const useFloatingPlayer = () => {
  const context = useContext(FloatingPlayerContext)
  if (!context) {
    throw new Error('useFloatingPlayer must be used within a FloatingPlayerProvider')
  }
  return context
}
