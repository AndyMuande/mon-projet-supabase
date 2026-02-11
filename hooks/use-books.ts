import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Book, CreateBookDto, UpdateBookDto, DashboardStats, ApiResponse } from '@/shared/types/book.types';

const API_BASE = '/api';

async function fetchBooks(params?: { category?: string; search?: string }): Promise<Book[]> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.append('category', params.category);
  if (params?.search) searchParams.append('search', params.search);

  const url = `${API_BASE}/books${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  const result: ApiResponse<Book[]> = await response.json();
  return result.data || [];
}

async function fetchBook(id: string): Promise<Book> {
  const response = await fetch(`${API_BASE}/books/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }

  const result: ApiResponse<Book> = await response.json();
  if (!result.data) throw new Error('Book not found');
  return result.data;
}

async function createBook(data: CreateBookDto): Promise<Book> {
  const response = await fetch(`${API_BASE}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create book');
  }

  const result: ApiResponse<Book> = await response.json();
  if (!result.data) throw new Error('Failed to create book');
  return result.data;
}

async function updateBook(id: string, data: UpdateBookDto): Promise<Book> {
  const response = await fetch(`${API_BASE}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update book');
  }

  const result: ApiResponse<Book> = await response.json();
  if (!result.data) throw new Error('Failed to update book');
  return result.data;
}

async function deleteBook(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/books/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete book');
  }
}

async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_BASE}/dashboard/stats`);

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard stats');
  }

  const result: ApiResponse<DashboardStats> = await response.json();
  if (!result.data) throw new Error('No stats available');
  return result.data;
}

async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE}/books/categories`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const result: ApiResponse<string[]> = await response.json();
  return result.data || [];
}

export function useBooks(params?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: ['books', params],
    queryFn: () => fetchBooks(params),
  });
}

export function useBook(id: string) {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBook(id),
    enabled: !!id,
  });
}

export function useCreateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}

export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookDto }) =>
      updateBook(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}
