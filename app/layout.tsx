import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/sidebar';
import { QueryProvider } from '@/providers/query-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'BookVault - Library Management',
  description: 'Modern book library management dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <QueryProvider>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto lg:ml-64">
              <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                {children}
              </div>
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
