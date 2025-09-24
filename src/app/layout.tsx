import PasswordProtection from '@/components/PasswordProtection';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PasswordProtection>
          {children}
        </PasswordProtection>
      </body>
    </html>
  )
}
