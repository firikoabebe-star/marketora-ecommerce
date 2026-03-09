'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-semibold">Sort By</h3>
        <select
          onChange={(e) => updateFilter('sortBy', e.target.value)}
          defaultValue={searchParams.get('sortBy') || ''}
          className="w-full border p-2"
        >
          <option value="">Default</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Price Range</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min"
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            defaultValue={searchParams.get('minPrice') || ''}
            className="w-full border p-2"
          />
          <input
            type="number"
            placeholder="Max"
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            defaultValue={searchParams.get('maxPrice') || ''}
            className="w-full border p-2"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Size</h3>
        <div className="flex flex-wrap gap-2">
          {['US 8', 'US 9', 'US 10', 'S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              onClick={() => updateFilter('size', searchParams.get('size') === size ? '' : size)}
              className={`border px-3 py-1 ${
                searchParams.get('size') === size ? 'bg-black text-white' : 'hover:bg-gray-100'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Color</h3>
        <div className="flex flex-wrap gap-2">
          {['Black', 'White', 'Blue', 'Gray'].map((color) => (
            <button
              key={color}
              onClick={() => updateFilter('color', searchParams.get('color') === color ? '' : color)}
              className={`border px-3 py-1 ${
                searchParams.get('color') === color ? 'bg-black text-white' : 'hover:bg-gray-100'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
