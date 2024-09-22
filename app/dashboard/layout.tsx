import '@ui/global.css';
import Layout from "@/src/components/dashboard/layout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {/* Layout UI */}
          <main>{children}</main>
        </Layout>
      </body>
    </html>
  )
}