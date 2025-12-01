import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '🎄 Calendario dell\'Avvento 2024 - 24 Sfide per Cambiare',
  description: 'Un calendario dell\'avvento speciale con 24 sfide quotidiane per migliorarti ogni giorno fino a Natale!',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Dancing+Script:wght@400;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}

