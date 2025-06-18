import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to load product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full object-cover rounded"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4">{product.category}</p>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <p className="mb-6">{product.description}</p>

          <a
            href={`https://example.com/affiliate/${product.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button label="Buy via Affiliate" icon="pi pi-external-link" />
          </a>
        </div>
      </div>
    </div>
  );
}
