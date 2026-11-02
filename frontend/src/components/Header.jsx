export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-border shadow-light z-40">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center text-white font-bold">
            P
          </div>
          <h1 className="text-xl font-semibold text-navy font-heading">PortoCraft</h1>
        </div>

        <nav className="hidden md:flex gap-8">
          <a href="/" className="text-text-primary hover:text-navy transition-colors">Home</a>
          <a href="/templates" className="text-text-primary hover:text-navy transition-colors">Templates</a>
          <a href="/dashboard" className="text-text-primary hover:text-navy transition-colors">My CVs</a>
        </nav>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-navy font-semibold hover:bg-slate-50 rounded-lg transition-colors">
            Login
          </button>
          <button className="btn-primary text-sm">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
