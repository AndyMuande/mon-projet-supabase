'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Book } from '@/shared/types/book.types';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

// Définir le Select simple
function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
      {...props}
    >
      {children}
    </select>
  );
}

// Schema avec published_year comme string pour le formulaire
const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number().min(0, 'Price must be positive'),
  stock: z.coerce.number().int().min(0, 'Stock must be a positive integer'),
  description: z.string().optional(),
  publisher: z.string().optional(),
  published_year: z.string()
    .refine(val => !val || /^\d{4}$/.test(val), {
      message: 'Must be a 4-digit year',
    })
    .refine(val => !val || (parseInt(val) >= 1000 && parseInt(val) <= new Date().getFullYear() + 1), {
      message: `Year must be between 1000 and ${new Date().getFullYear() + 1}`,
    })
    .optional(),
  cover_image: z.string().url().optional().or(z.literal('')),
});

type BookFormData = z.infer<typeof bookSchema>;

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: Omit<BookFormData, 'published_year'> & { 
    published_year?: number 
  }) => Promise<void>;
  isSubmitting?: boolean;
}

const categories = [
  'Fiction',
  'Science Fiction',
  'Mystery',
  'Thriller',
  'Romance',
  'Fantasy',
  'History',
  'Biography',
  'Business',
  'Technology',
  'Science',
  'Self-Help',
  'Health',
  'Travel',
  'Cooking',
  'Art',
  'Poetry',
  'Drama',
  'Other',
];

export function BookForm({ initialData, onSubmit, isSubmitting }: BookFormProps) {
  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      isbn: '',
      category: '',
      price: 0,
      stock: 0,
      description: '',
      publisher: '',
      published_year: '',
      cover_image: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title || '',
        author: initialData.author || '',
        isbn: initialData.isbn || '',
        category: initialData.category || '',
        price: initialData.price || 0,
        stock: initialData.stock || 0,
        description: initialData.description || '',
        publisher: initialData.publisher || '',
        published_year: initialData.published_year 
          ? initialData.published_year.toString() 
          : '',
        cover_image: initialData.cover_image || '',
      });
    }
  }, [initialData, form]);

  const handleCancel = () => {
    if (form.formState.isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to cancel?'
      );
      if (!confirmLeave) return;
    }
    window.history.back();
  };

  // Gérer la soumission avec conversion
  const handleFormSubmit = async (formData: BookFormData) => {
    // Convertir published_year de string à number
    const dataToSubmit = {
      ...formData,
      published_year: formData.published_year 
        ? parseInt(formData.published_year, 10) 
        : undefined,
    };
    
    await onSubmit(dataToSubmit);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter book title"
                    className="bg-white/5 border-white/10"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Author</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter author name"
                    className="bg-white/5 border-white/10"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">ISBN</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="978-0-123456-78-9"
                    className="bg-white/5 border-white/10"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription className="text-slate-500">
                  Optional
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="bg-white/5 border-white/10"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Stock</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="0"
                    className="bg-white/5 border-white/10"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Publisher</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter publisher name"
                    className="bg-white/5 border-white/10"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription className="text-slate-500">
                  Optional
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="published_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Published Year</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="2024"
                    className="bg-white/5 border-white/10"
                    disabled={isSubmitting}
                    min="1000"
                    max={new Date().getFullYear() + 1}
                  />
                </FormControl>
                <FormDescription className="text-slate-500">
                  Optional
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-200">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter book description"
                  rows={4}
                  className="bg-white/5 border-white/10"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription className="text-slate-500">
                Optional
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cover_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-200">Cover Image URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://example.com/image.jpg"
                  className="bg-white/5 border-white/10"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription className="text-slate-500">
                Optional
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Update Book' : 'Create Book'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="bg-white/5 border-white/10 hover:bg-white/10"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}