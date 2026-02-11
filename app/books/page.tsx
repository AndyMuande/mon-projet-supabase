'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Search, Plus, BookOpen, Loader, ChevronRight } from 'lucide-react';
import { Book } from '@/shared/types/book.types';

async function fetchBooks(): Promise<Book[]> {
  const response = await fetch('/api/books');
  if (!response.ok) throw new Error('Failed to fetch books');
  const data = await response.json();
  return data.data || [];
}

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    staleTime: 60 * 1000,
  });

  const categories = useMemo(() => {
    const cats = new Set(books.map((b) => b.category));
    return Array.from(cats).sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        searchQuery === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === '' || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [books, searchQuery, selectedCategory]);

  return (
    <div className="p-4 md:p-8 lg:p-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            <span className="gradient-text">Books Library</span>
          </h1>
          <p className="text-slate-400">Manage your book collection</p>
        </div>
        <Link
          href="/books/new"
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add Book</span>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="relative">
          <Search className="absolute left-4 top-3 h-5 w-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 py-2 pl-12 pr-4 text-white placeholder-slate-500 transition-colors focus:border-blue-500/50 focus:outline-none"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white transition-colors focus:border-blue-500/50 focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Books Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-6 w-6 animate-spin text-blue-400" />
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          Failed to load books. Please try again.
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-slate-900/50 py-12">
          <BookOpen className="mb-3 h-12 w-12 text-slate-600" />
          <p className="text-slate-400">
            {searchQuery || selectedCategory ? 'No books found matching your filters.' : 'No books yet.'}
          </p>
          {!(searchQuery || selectedCategory) && (
            <Link
              href="/books/new"
              className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              Add Your First Book
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}/edit`}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {/* Book Cover */}
              <div className="relative h-48 overflow-hidden bg-slate-800">
                {book.cover_image ? (
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <BookOpen className="h-16 w-16 text-slate-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />

                {/* Stock Badge */}
                <div className="absolute right-2 top-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold backdrop-blur-xl ${
                      book.stock < 5
                        ? 'bg-red-500/30 text-red-300 ring-1 ring-red-500/50'
                        : 'bg-green-500/30 text-green-300 ring-1 ring-green-500/50'
                    }`}
                  >
                    {book.stock} in stock
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-1 line-clamp-2 font-semibold text-white">{book.title}</h3>
                <p className="mb-3 text-xs text-slate-400">{book.author}</p>

                <div className="mb-3 flex flex-wrap gap-1">
                  <span className="inline-block rounded bg-slate-700/50 px-2 py-0.5 text-xs text-slate-300">
                    {book.category}
                  </span>
                </div>

                <div className="mt-auto space-y-2 border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Price</span>
                    <span className="font-semibold text-white">${book.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">ISBN</span>
                    <span className="text-xs text-slate-300">{book.isbn || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Hover Action */}
              <div className="flex items-center justify-between border-t border-white/10 bg-slate-900/50 px-4 py-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="text-xs font-medium text-slate-400">View Details</span>
                <ChevronRight className="h-4 w-4 text-blue-400" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
