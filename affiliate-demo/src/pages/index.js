import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Skeleton } from 'primereact/skeleton';
import { fetchProducts } from '@/services/productService';
import Link from 'next/link';
import styles from '@/styles/HomePage.module.css';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((p) => p.category))];
        setCategories([
          { label: 'All Categories', value: null },
          ...uniqueCategories.map((cat) => ({ label: cat, value: cat }))
        ]);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const truncateDescription = (text, maxLength = 100) => {
    return text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (loading) {
    return (
      <div className={styles.ecommerceContainer}>
        <div className={styles.headerSection}>
          <Skeleton width="300px" height="40px" />
        </div>
        <div className={styles.productGrid}>
          {[...Array(6)].map((_, index) => (
            <Card key={index} className={styles.productCard}>
              <Skeleton width="100%" height="256px" />
              <div className="p-4">
                <Skeleton width="80%" height="24px" className="mb-2" />
                <Skeleton width="60%" height="16px" className="mb-3" />
                <Skeleton width="100%" height="60px" className="mb-3" />
                <div className="flex justify-between items-center">
                  <Skeleton width="80px" height="24px" />
                  <div className="flex gap-2">
                    <Skeleton width="80px" height="36px" />
                    <Skeleton width="100px" height="36px" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ecommerceContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover Amazing Products
          </h1>
          <p className={styles.heroSubtitle}>
            Find the best deals on top-quality products from trusted brands
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.filterContainer}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <i className="pi pi-filter"></i>
              Filter by Category
            </label>
            <Dropdown
              value={selectedCategory}
              options={categories}
              onChange={(e) => setSelectedCategory(e.value)}
              placeholder="Select Category"
              className={styles.categoryDropdown}
              showClear
            />
          </div>
          <div className={styles.resultCount}>
            <Badge 
              value={filteredProducts.length} 
              className={styles.countBadge}
            />
            <span>Products Found</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className={styles.productCard}
            header={
              <div className={styles.productImageContainer}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={styles.productImage}
                />
                <div className={styles.productBadge}>
                  <Badge value="NEW" severity="success" />
                </div>
              </div>
            }
          >
            <div className={styles.productContent}>
              <div className={styles.productHeader}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <span className={styles.productBrand}>
                  {product.brand || product.category}
                </span>
              </div>
              
              <p className={styles.productDescription}>
                {truncateDescription(product.description)}
              </p>
              
              <div className={styles.productFooter}>
                <div className={styles.priceSection}>
                  <span className={styles.currentPrice}>
                    {formatPrice(product.price)}
                  </span>
                  {product.discountPercentage && (
                    <span className={styles.discount}>
                      -{Math.round(product.discountPercentage)}%
                    </span>
                  )}
                </div>
                
                <div className={styles.actionButtons}>
                  <Link href={`/product/${product.id}`}>
                    <Button 
                      label="Details" 
                      icon="pi pi-info-circle"
                      className={styles.viewButton}
                      outlined
                    />
                  </Link>
                  <Link href={`/redirect/${product.id}`}>
                    <Button 
                      label="Buy Now" 
                      icon="pi pi-external-link"
                      className={styles.buyButton}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <i className="pi pi-search" style={{ fontSize: '3rem', color: '#64748b' }}></i>
          <h3>No products found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
}