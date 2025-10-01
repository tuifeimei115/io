export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 dark:border-slate-700/50 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Zhi. All rights reserved.
      </div>
    </footer>
  )
}
