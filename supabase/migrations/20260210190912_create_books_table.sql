/*
  # Book Management System - Initial Schema

  ## Overview
  Creates the core database structure for a professional book management system
  for bookstores and libraries.

  ## New Tables
  
  ### `books`
  Main table storing book information:
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text, required) - Book title
  - `author` (text, required) - Book author
  - `isbn` (text, optional) - International Standard Book Number
  - `category` (text, required) - Book category/genre
  - `price` (numeric, required) - Book price
  - `stock` (integer, required, default: 0) - Current stock quantity
  - `description` (text, optional) - Book description
  - `publisher` (text, optional) - Publisher name
  - `published_year` (integer, optional) - Year of publication
  - `cover_image` (text, optional) - URL to cover image
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on `books` table
  - Add policy for public read access (for browsing)
  - Add policy for authenticated users to create, update, delete books
  
  ## Indexes
  - Index on `category` for faster filtering
  - Index on `title` for search functionality
*/

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  isbn text,
  category text NOT NULL,
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  description text,
  publisher text,
  published_year integer CHECK (published_year > 1000 AND published_year <= EXTRACT(YEAR FROM CURRENT_DATE) + 1),
  cover_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);
CREATE INDEX IF NOT EXISTS idx_books_author ON books(author);

-- Enable Row Level Security
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Policy: Allow everyone to read books (public browsing)
CREATE POLICY "Anyone can view books"
  ON books
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert books
CREATE POLICY "Authenticated users can create books"
  ON books
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update books
CREATE POLICY "Authenticated users can update books"
  ON books
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete books
CREATE POLICY "Authenticated users can delete books"
  ON books
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_books_updated_at
  BEFORE UPDATE ON books
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for demonstration
INSERT INTO books (title, author, category, price, stock, description, publisher, published_year, isbn)
VALUES 
  ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 12.99, 25, 'A classic American novel set in the Jazz Age', 'Scribner', 1925, '978-0-7432-7356-5'),
  ('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 14.99, 30, 'A gripping tale of racial injustice and childhood innocence', 'J.B. Lippincott & Co.', 1960, '978-0-06-112008-4'),
  ('1984', 'George Orwell', 'Science Fiction', 13.99, 20, 'A dystopian social science fiction novel', 'Secker & Warburg', 1949, '978-0-452-28423-4'),
  ('Clean Code', 'Robert C. Martin', 'Technology', 39.99, 15, 'A Handbook of Agile Software Craftsmanship', 'Prentice Hall', 2008, '978-0-13-235088-4'),
  ('Sapiens', 'Yuval Noah Harari', 'History', 24.99, 18, 'A Brief History of Humankind', 'Harper', 2015, '978-0-06-231609-7'),
  ('The Psychology of Money', 'Morgan Housel', 'Business', 16.99, 22, 'Timeless lessons on wealth, greed, and happiness', 'Harriman House', 2020, '978-0-85719-769-9')
ON CONFLICT DO NOTHING;