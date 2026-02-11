import { NextResponse } from 'next/server';
import { bookService } from '@/services/book.service';

export async function GET() {
  try {
    const stats = await bookService.getDashboardStats();
    return NextResponse.json({ data: stats }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
