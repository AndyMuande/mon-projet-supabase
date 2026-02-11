import { NextResponse } from 'next/server';
import { bookService } from '@/services/book.service';

export async function GET() {
  try {
    const categories = await bookService.getCategories();
    return NextResponse.json({ data: categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
