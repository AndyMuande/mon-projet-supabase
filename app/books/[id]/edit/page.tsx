'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BookForm } from '@/components/books/book-form';
import { Book, UpdateBookDto } from '@/shared/types/book.types';
import { Loader, ArrowLeft } from 'lucide-react';

async function fetchBook(id: string): Promise<Book> {
  const response = await fetch(`/api/books/${id}`);
  if (!response.ok) throw new Error('Failed to fetch book');
  const data = await response.json();
  if (!data.data) throw new Error('Book not found');
  return data.data;
}

async function updateBook(id: string, data: UpdateBookDto): Promise<Book> {
  const response = await fetch(`/api/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update book');
  const result = await response.json();
  if (!result.data) throw new Error('Failed to update book');
  return result.data;
}

export default function EditBookPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = params.id as string;

  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBook(id),
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateBookDto) => updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book', id] });
      router.push(`/books/${id}`);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (error || !book) {
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
          Book not found. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-10">
      <Link
        href={`/books/${id}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Book Details
      </Link>

      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            <span className="gradient-text">Edit Book</span>
          </h1>
          <p className="text-slate-400">Update book information</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-xl">
          <div className="p-6 md:p-8">
            <BookForm
              initialData={book}
              onSubmit={(data) => updateMutation.mutateAsync(data)}
              isSubmitting={updateMutation.isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
