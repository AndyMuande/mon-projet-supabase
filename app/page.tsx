
export default function Home() {
  return (
    <div className="p-4 md:p-8 lg:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          <span className="gradient-text">Dashboardd</span>
        </h1>
        <p className="text-slate-400">Welcome back! Here's your library overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Total Books */}
        <div className="stat-card group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 ring-1 ring-blue-500/30">
              <BookOpen className="h-6 w-6 text-blue-400" />
            </div>
            <p className="mb-1 text-3xl font-bold text-white">
              {isLoading ? (
                <span className="text-slate-500">-</span>
              ) : (
                stats.totalBooks
              )}
            </p>
            <p className="text-sm text-slate-400">Total Books</p>
          </div>
        </div>

        {/* Total Stock */}
        <div className="stat-card group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20 ring-1 ring-green-500/30">
              <Package className="h-6 w-6 text-green-400" />
            </div>
            <p className="mb-1 text-3xl font-bold text-white">
              {isLoading ? (
                <span className="text-slate-500">-</span>
              ) : (
                stats.totalStock
              )}
            </p>
            <p className="text-sm text-slate-400">Total Stock</p>
          </div>
        </div>

        {/* Total Value */}
        <div className="stat-card group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 ring-1 ring-purple-500/30">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <p className="mb-1 text-3xl font-bold text-white">
              {isLoading ? (
                <span className="text-slate-500">-</span>
              ) : (
                `$${(stats.totalValue / 1000).toFixed(1)}k`
              )}
            </p>
            <p className="text-sm text-slate-400">Total Value</p>
          </div>
        </div>

        {/* Categories */}
        <div className="stat-card group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/20 ring-1 ring-orange-500/30">
              <Layers className="h-6 w-6 text-orange-400" />
            </div>
            <p className="mb-1 text-3xl font-bold text-white">
              {isLoading ? (
                <span className="text-slate-500">-</span>
              ) : (
                stats.categoriesCount
              )}
            </p>
            <p className="text-sm text-slate-400">Categories</p>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="stat-card group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/20 ring-1 ring-red-500/30">
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
            <p className="mb-1 text-3xl font-bold text-white">
              {isLoading ? (
                <span className="text-slate-500">-</span>
              ) : (
                stats.lowStockBooks
              )}
            </p>
            <p className="text-sm text-slate-400">Low Stock</p>
          </div>
        </div>
      </div>

      {/* Recent Books Section */}
      <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Recent Books</h2>
              <p className="mt-1 text-sm text-slate-400">Latest additions to your library</p>
            </div>
            <Link
              href="/books"
              className="flex items-center gap-2 rounded-lg bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/30"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center px-6 py-12">
            <Loader className="h-6 w-6 animate-spin text-blue-400" />
          </div>
        ) : error ? (
          <div className="px-6 py-12 text-center">
            <p className="text-red-400">Failed to load books. Please try again.</p>
          </div>
        ) : recentBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12">
            <BookOpen className="mb-3 h-12 w-12 text-slate-600" />
            <p className="text-slate-400">No books yet. Start by adding your first book!</p>
            <Link
              href="/books/new"
              className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              Add Book
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10 bg-slate-800/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Title
                  </th>
                  <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 sm:table-cell">
                    Author
                  </th>
                  <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 md:table-cell">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Price
                  </th>
                  <th className="hidden px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400 lg:table-cell">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="transition-colors hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        {book.cover_image ? (
                          <img
                            src={book.cover_image}
                            alt={book.title}
                            className="h-10 w-8 rounded object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-8 items-center justify-center rounded bg-slate-700">
                            <BookOpen className="h-4 w-4 text-slate-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-white">{book.title}</p>
                          <p className="text-xs text-slate-500 sm:hidden">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 text-sm text-slate-300 sm:table-cell">
                      {book.author}
                    </td>
                    <td className="hidden px-6 py-4 text-sm text-slate-400 md:table-cell">
                      {book.category}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          book.stock < 5
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {book.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      ${book.price.toFixed(2)}
                    </td>
                    <td className="hidden px-6 py-4 text-right lg:table-cell">
                      <Link
                        href={`/books/${book.id}/edit`}
                        className="text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
