import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Particles from './components/Particles'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-slate-100 relative">
      <Particles fullPage density={0.00012} color="rgba(255,255,255,0.85)" />
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1 relative z-10 page-snap">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
