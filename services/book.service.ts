import { supabase } from '@/lib/supabase/client';
import {
  Book,
  CreateBookDto,
  UpdateBookDto,
  DashboardStats
} from '@/shared/types/book.types';

export class BookService {
  async getAllBooks(): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch books: ${error.message}`);
    }

    return data || [];
  }

  async getBookById(id: string): Promise<Book | null> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch book: ${error.message}`);
    }

    return data;
  }

  async createBook(bookData: CreateBookDto): Promise<Book> {
    const { data, error } = await supabase
      .from('books')
      .insert([bookData])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create book: ${error.message}`);
    }

    return data;
  }

  async updateBook(id: string, bookData: UpdateBookDto): Promise<Book> {
    const { data, error } = await supabase
      .from('books')
      .update(bookData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update book: ${error.message}`);
    }

    return data;
  }

  async deleteBook(id: string): Promise<void> {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete book: ${error.message}`);
    }
  }

  async getBooksByCategory(category: string): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('category', category)
      .order('title');

    if (error) {
      throw new Error(`Failed to fetch books by category: ${error.message}`);
    }

    return data || [];
  }

  async searchBooks(query: string): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .or(`title.ilike.%${query}%,author.ilike.%${query}%,isbn.ilike.%${query}%`)
      .order('title');

    if (error) {
      throw new Error(`Failed to search books: ${error.message}`);
    }

    return data || [];
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const { data: books, error } = await supabase
      .from('books')
      .select('*');

    if (error) {
      throw new Error(`Failed to fetch dashboard stats: ${error.message}`);
    }

    const totalBooks = books?.length || 0;
    const totalValue = books?.reduce((sum, book) => sum + (book.price * book.stock), 0) || 0;
    const totalStock = books?.reduce((sum, book) => sum + book.stock, 0) || 0;
    const categories = new Set(books?.map(book => book.category) || []);
    const categoriesCount = categories.size;
    const lowStockBooks = books?.filter(book => book.stock < 10).length || 0;
    const recentBooks = books
      ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5) || [];

    return {
      totalBooks,
      totalValue,
      totalStock,
      categoriesCount,
      lowStockBooks,
      recentBooks,
    };
  }

  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('books')
      .select('category');

    if (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    const categorySet = new Set(data?.map(book => book.category) || []);
    const categories = Array.from(categorySet);
    return categories.sort();
  }
}

export const bookService = new BookService();
