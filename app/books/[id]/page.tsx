'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BookOpen, Loader, Trash2, Edit, ArrowLeft } from 'lucide-react';
import { Book } from '@/shared/types/book.types';

async function fetchBook(id: string): Promise<Book> {
  const response = await fetch(`/api/books/${id}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Failed to fetch book (${response.status})`);
  }
  const data = await response.json();
  if (!data.data) throw new Error('Book not found');
  return data.data;
}

async function deleteBook(id: string): Promise<void> {
  const response = await fetch(`/api/books/${id}`, { 
    method: 'DELETE' 
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Failed to delete book (${response.status})`);
  }
}

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  // Validation de l'ID
  const id = params.id as string;
  if (!id || typeof id !== 'string') {
    return (
      <div className="p-8">
        <Link
          href="/books"
          className="mb-6 flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Link>
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-8 text-center text-red-400">
          <BookOpen className="mb-3 h-12 w-12 mx-auto" />
          <p>Invalid book ID</p>
        </div>
      </div>
    );
  }

  const { 
    data: book, 
    isLoading, 
    error,
    isError 
  } = useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBook(id),
    enabled: !!id, // Ne pas exécuter si pas d'ID
    retry: 1,
  });

  const deleteBookMutation = useMutation({
    mutationFn: () => deleteBook(id),
    onSuccess: () => {
      // Invalider les queries pertinentes
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.removeQueries({ queryKey: ['book', id] });
      router.push('/books');
      // Optionnel: afficher un toast de succès
    },
    onError: (error: Error) => {
      alert(`Failed to delete book: ${error.message}`);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <Loader className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="p-8">
        <Link
          href="/books"
          className="mb-6 flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Link>
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-8 text-center text-red-400">
          <BookOpen className="mb-3 h-12 w-12 mx-auto" />
          <p>{error?.message || 'Book not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-10">
      {/* Back Button */}
      <Link
        href="/books"
        className="mb-6 inline-flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Books
      </Link>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Book Cover */}
        <div className="md:col-span-1">
          <div className="sticky top-6 space-y-4">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-800 aspect-[3/4]">
              {book.cover_image ? (
                <img
                  src={book.cover_image}
                  alt={`Cover of ${book.title}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`flex h-full w-full items-center justify-center bg-slate-800 ${book.cover_image ? 'hidden' : ''}`}>
                <BookOpen className="h-20 w-20 text-slate-600" />
              </div>
            </div>

            {/* Stock Status */}
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl">
              <p className="mb-2 text-sm text-slate-400">Stock Status</p>
              <p className="mb-2 text-2xl font-bold text-white">{book.stock}</p>
              <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                <div
                  className={`h-full transition-all ${
                    book.stock < 5 ? 'bg-red-500' : book.stock < 20 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ 
                    width: `${Math.min((book.stock / Math.max(book.stock, 100)) * 100, 100)}%` 
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                {book.stock < 5 && '⚠️ Low stock'}
                {book.stock >= 5 && book.stock < 20 && '⚠️ Medium stock'}
                {book.stock >= 20 && '✓ Healthy stock'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link
                href={`/books/${id}/edit`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <Edit className="h-4 w-4" />
                Edit Book
              </Link>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
                    deleteBookMutation.mutate();
                  }
                }}
                disabled={deleteBookMutation.isPending}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 font-medium text-red-400 transition-colors hover:border-red-500/50 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <Trash2 className="h-4 w-4" />
                {deleteBookMutation.isPending ? 'Deleting...' : 'Delete Book'}
              </button>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="md:col-span-2">
          <div className="space-y-6">
            {/* Title and Author */}
            <div>
              <h1 className="mb-2 text-4xl font-bold text-white">{book.title}</h1>
              <p className="text-lg text-blue-400">{book.author}</p>
            </div>

            {/* Basic Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl">
                <p className="mb-1 text-xs text-slate-400">Category</p>
                <p className="font-semibold text-white">{book.category || 'Not specified'}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl">
                <p className="mb-1 text-xs text-slate-400">Price</p>
                <p className="text-2xl font-bold text-green-400">
                  ${typeof book.price === 'number' ? book.price.toFixed(2) : '0.00'}
                </p>
              </div>
              {book.isbn && (
                <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl">
                  <p className="mb-1 text-xs text-slate-400">ISBN</p>
                  <p className="font-mono text-white">{book.isbn}</p>
                </div>
              )}
              {book.publisher && (
                <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl">
                  <p className="mb-1 text-xs text-slate-400">Publisher</p>
                  <p className="text-white">{book.publisher}</p>
                </div>
              )}
              {book.published_year && (
                <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl">
                  <p className="mb-1 text-xs text-slate-400">Published Year</p>
                  <p className="text-white">{book.published_year}</p>
                </div>
              )}
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl">
                <p className="mb-1 text-xs text-slate-400">Created</p>
                <p className="text-sm text-white">
                  {new Date(book.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Description */}
            {book.description && (
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">
                <h3 className="mb-3 text-lg font-semibold text-white">Description</h3>
                <p className="text-slate-300 whitespace-pre-line">{book.description}</p>
              </div>
            )}

            {/* Metadata */}
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">
              <h3 className="mb-3 text-lg font-semibold text-white">Metadata</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-400">Total Value</p>
                  <p className="text-lg font-semibold text-white">
                    ${((book.price || 0) * (book.stock || 0)).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Last Updated</p>
                  <p className="text-sm text-white">
                    {new Date(book.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}