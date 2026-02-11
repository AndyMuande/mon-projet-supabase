'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookForm } from '@/components/books/book-form';
import { CreateBookDto } from '@/shared/types/book.types';
import { ArrowLeft } from 'lucide-react';

async function createBook(data: CreateBookDto) {
  const response = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create book');
  const result = await response.json();
  if (!result.data) throw new Error('Failed to create book');
  return result.data;
}

export default function NewBookPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createBook,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      router.push(`/books/${data.id}`);
    },
  });

  return (
    <div className="p-4 md:p-8 lg:p-10">
      <Link
        href="/books"
        className="mb-6 inline-flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Books
      </Link>

      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            <span className="gradient-text">Add New Book</span>
          </h1>
          <p className="text-slate-400">Create a new book entry in your library</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-xl">
          <div className="p-6 md:p-8">
            <BookForm
              onSubmit={(data) => createMutation.mutateAsync(data)}
              isSubmitting={createMutation.isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
