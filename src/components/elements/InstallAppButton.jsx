import React, { useEffect, useMemo, useState } from 'react'
import ArrowDownTrayIcon from './icons/ArrowDownTrayIcon'

const InstallAppButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isPrompting, setIsPrompting] = useState(false)
  const [showManualHint, setShowManualHint] = useState(false)

  const isIOS = useMemo(() => {
    if (typeof window === 'undefined') return false
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const inStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
    setIsInstalled(inStandaloneMode)

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
      setShowManualHint(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setShowManualHint(true)
      return
    }

    setIsPrompting(true)

    try {
      deferredPrompt.prompt()
      await deferredPrompt.userChoice
      setDeferredPrompt(null)
      setShowManualHint(false)
    } finally {
      setIsPrompting(false)
    }
  }

  if (isInstalled) {
    return null
  }

  return (
    <div className="fixed right-6 bottom-24 z-50 md:bottom-6">
      <button
        className="rounded-xl bg-accent-dark text-at-white px-4 py-3 text-sm font-semibold shadow-lg shadow-black/10 flex items-center gap-2 hover:bg-accent transition-colors"
        onClick={handleInstallClick}
        type="button"
      >
        <ArrowDownTrayIcon className="w-5 h-5" />
        {isPrompting ? 'Opening install prompt...' : 'Install App'}
      </button>

      {showManualHint && (
        <p className="mt-2 max-w-60 text-xs rounded-lg bg-white/95 dark:bg-at-dark-surface px-3 py-2 shadow-lg shadow-black/10">
          {isIOS ? 'On iPhone/iPad, open browser Share menu and tap Add to Home Screen.' : 'If no prompt appears, use your browser menu and choose Install app/Add to Home Screen.'}
        </p>
      )}
    </div>
  )
}

export default InstallAppButton
