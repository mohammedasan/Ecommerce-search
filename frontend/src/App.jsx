import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProductsGrid from './components/ProductsGrid';
import { fetchProducts } from './api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const prods = await fetchProducts(25);
        setProducts(prods);
        setFiltered(prods);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (category === 'All') {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p => p.category === category));
    }
  }, [category, products]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category))).filter(Boolean)];

  return (
    <div className={styles.app}>
      <Header />
      <div className="container">
        <Hero />
        <div className={styles.main}>
          <div className="top-controls">
            <FilterBar
              categories={categories}
              selected={category}
              onChange={c => setCategory(c)}
            />
            <div style={{ color: '#6b7280', fontSize: 14 }}>
              {loading ? 'Loading products...' : `${filtered.length} products`}
            </div>
          </div>

          <ProductsGrid products={filtered} loading={loading} />
        </div>
      </div>
    </div>
  );
}
