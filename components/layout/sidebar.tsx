'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutDashboard, Library, Plus, Settings, Menu, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Books', href: '/books', icon: Library },
  { name: 'Add Book', href: '/books/new', icon: Plus },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Documentation', href: '/api-docs', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900/90 backdrop-blur-xl ring-1 ring-white/10 transition-colors hover:bg-slate-800/90 lg:hidden"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5 text-slate-400" />
        ) : (
          <Menu className="h-5 w-5 text-slate-400" />
        )}
      </button>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl transition-transform duration-300',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 backdrop-blur-sm ring-1 ring-blue-500/30">
              <BookOpen className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">BookVault</h1>
              <p className="text-xs text-slate-400">Library Management</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                             (item.href !== '/' && pathname?.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <Icon className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                  )} />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
              <p className="text-xs font-medium text-slate-300">Need Help?</p>
              <p className="mt-1 text-xs text-slate-500">
                Check our documentation for guides and tutorials
              </p>
              <Link
                href="/api-docs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-3 block w-full rounded-md bg-white/10 px-3 py-1.5 text-center text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
