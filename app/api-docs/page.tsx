'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, BarChart3 } from 'lucide-react';

export default function ApiDocsPage() {
  return (
    <div className="p-4 md:p-8 lg:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            <span className="gradient-text">API Documentation</span>
          </h1>
          <p className="text-slate-400">Available REST endpoints for BookVault</p>
        </div>
        <Link
          href="/settings"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Settings
        </Link>
      </div>

      <div className="grid gap-6">
        <section className="rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 ring-1 ring-blue-500/30">
              <BookOpen className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Books</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <code className="rounded bg-slate-800 px-2 py-1 text-slate-200">GET /api/books</code>
              {' '}
              List all books
            </p>
            <p>
              <code className="rounded bg-slate-800 px-2 py-1 text-slate-200">POST /api/books</code>
              {' '}
              Create a new book
            </p>
            <p>
              <code className="rounded bg-slate-800 px-2 py-1 text-slate-200">GET /api/books/categories</code>
              {' '}
              Get available categories
            </p>
            <p>
              <code className="rounded bg-slate-800 px-2 py-1 text-slate-200">GET /api/books/:id</code>
              {' '}
              Get a book by ID
            </p>
            <p>
              <code className="rounded bg-slate-800 px-2 py-1 text-slate-200">PUT /api/books/:id</code>
              {' '}
              Update a book by ID
            </p>
            <p>
              <code className="rounded bg-slate-800 px-2 py-1 text-slate-200">DELETE /api/books/:id</code>
              {' '}
              Delete a book by ID
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 ring-1 ring-green-500/30">
              <BarChart3 className="h-5 w-5 text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Dashboard</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <code className="rounded bg-slate-800 px-2 py-1 text-slate-200">GET /api/dashboard/stats</code>
              {' '}
              Get dashboard statistics
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
