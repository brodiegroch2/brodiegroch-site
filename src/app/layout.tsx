import PasswordProtection from '@/components/PasswordProtection';
import Navigation from '@/components/Navigation';
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
          <main className="main-content">
            {children}
          </main>
        </PasswordProtection>
      </body>
    </html>
  )
}
