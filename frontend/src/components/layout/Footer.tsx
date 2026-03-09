import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:underline">All Products</Link></li>
              <li><Link href="/products?category=mens" className="hover:underline">Men</Link></li>
              <li><Link href="/products?category=womens" className="hover:underline">Women</Link></li>
              <li><Link href="/products?category=kids" className="hover:underline">Kids</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/orders" className="hover:underline">Order Status</Link></li>
              <li><Link href="#" className="hover:underline">Shipping</Link></li>
              <li><Link href="#" className="hover:underline">Returns</Link></li>
              <li><Link href="#" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">About</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">Our Story</Link></li>
              <li><Link href="#" className="hover:underline">Careers</Link></li>
              <li><Link href="#" className="hover:underline">Sustainability</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-600">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Premium Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
