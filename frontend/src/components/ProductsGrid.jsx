import React from 'react';
import styles from './ProductsGrid.module.css';

function Rating({ value = 0 }) {
  const full = Math.round(value);
  return <div className={styles.rating}>{'★'.repeat(full)}{'☆'.repeat(5 - full)}</div>;
}

export default function ProductsGrid({ products = [], loading }) {
  if (loading) {
    return <div style={{padding:20}}>Loading products...</div>;
  }
  if (!products.length) {
    return <div style={{padding:20}}>No products found.</div>;
  }

  return (
    <div className={styles.grid}>
      {products.map(p => (
        <div key={p.id} className={styles.card}>
          <div className={styles.media}>
            <img src={p.image || `https://picsum.photos/seed/${p.id}/400/300`} alt={p.name} />
          </div>
          <div className={styles.body}>
            <div className={styles.title}>{p.name}</div>
            <div className={styles.muted}>{p.category}</div>
            <div className={styles.row}>
              <div className={styles.price}>₹{p.price}</div>
              <Rating value={p.rating} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
