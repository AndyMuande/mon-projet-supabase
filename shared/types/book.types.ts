export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string | null;
  category: string;
  price: number;
  stock: number;
  description?: string | null;
  publisher?: string | null;
  published_year?: number | null;
  cover_image?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  isbn?: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  publisher?: string;
  published_year?: number;
  cover_image?: string;
}

export interface UpdateBookDto {
  title?: string;
  author?: string;
  isbn?: string;
  category?: string;
  price?: number;
  stock?: number;
  description?: string;
  publisher?: string;
  published_year?: number;
  cover_image?: string;
}

export interface DashboardStats {
  totalBooks: number;
  totalValue: number;
  totalStock: number;
  categoriesCount: number;
  lowStockBooks: number;
  recentBooks: Book[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
