import PasswordProtection from '@/components/PasswordProtection';
import Navigation from '@/components/Navigation';
import MobileBottomNav from '@/components/MobileBottomNav';
import TodoNotification from '@/components/TodoNotification';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/A36DC129-2A04-46D8-93F5-590A54FF9CDA.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="UniHUB" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body>
        <PasswordProtection>
          <Navigation />
          <main className="main-content app-content-with-bottom-nav">
            <div className="page-transition">
              {children}
            </div>
          </main>
          <MobileBottomNav />
          <TodoNotification />
        </PasswordProtection>
      </body>
    </html>
  )
}
