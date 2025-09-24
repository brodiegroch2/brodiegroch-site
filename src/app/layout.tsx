import PasswordProtection from '@/components/PasswordProtection';
import Navigation from '@/components/Navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
