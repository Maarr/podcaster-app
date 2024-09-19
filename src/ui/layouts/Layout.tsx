import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import useGlobalStore from '@/store/useGlobalStore.store'
import Spinner from '@/ui/components/Spinner'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const { transitioning } = useGlobalStore()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white drop-shadow-md flex items-center justify-between">
        <div className="container mx-auto py-4 px-6">
          <Link
            to="/"
            className="text-xl font-bold text-sky-600 hover:text-sky-500"
          >
            Podcaster
          </Link>
        </div>
        {transitioning && <Spinner />}
      </header>
      <main className="flex-grow container mx-auto px-6 py-8">{children}</main>
    </div>
  )
}

export default Layout
