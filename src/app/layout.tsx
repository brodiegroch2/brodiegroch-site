import PasswordProtection from '@/components/PasswordProtection';
import Navigation from '@/components/Navigation';
import MobileBottomNav from '@/components/MobileBottomNav';
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
        </PasswordProtection>
      </body>
    </html>
  )
}
