import { NextRequest, NextResponse } from 'next/server';
import { bookService } from '@/services/book.service';
import { CreateBookDto } from '@/shared/types/book.types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let books;
    if (category) {
      books = await bookService.getBooksByCategory(category);
    } else if (search) {
      books = await bookService.searchBooks(search);
    } else {
      books = await bookService.getAllBooks();
    }

    return NextResponse.json({ data: books }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateBookDto = await request.json();

    if (!body.title || !body.author || !body.category || body.price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: title, author, category, and price are required' },
        { status: 400 }
      );
    }

    const book = await bookService.createBook(body);
    return NextResponse.json({ data: book, message: 'Book created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create book' },
      { status: 500 }
    );
  }
}
