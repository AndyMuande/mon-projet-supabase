import { NextRequest, NextResponse } from 'next/server';
import { bookService } from '@/services/book.service';
import { UpdateBookDto } from '@/shared/types/book.types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const book = await bookService.getBookById(params.id);

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: book }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch book' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateBookDto = await request.json();
    const book = await bookService.updateBook(params.id, body);

    return NextResponse.json(
      { data: book, message: 'Book updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update book' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await bookService.deleteBook(params.id);

    return NextResponse.json(
      { message: 'Book deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete book' },
      { status: 500 }
    );
  }
}
