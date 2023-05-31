import Footer from './landing/footer'
import Meta from './meta'
import { ClerkProvider } from '@clerk/nextjs'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <ClerkProvider>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </ClerkProvider>
  )
}

export default Layout
