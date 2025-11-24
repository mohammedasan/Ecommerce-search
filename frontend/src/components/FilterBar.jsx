import React from 'react';
import styles from './FilterBar.module.css';

export default function FilterBar({ categories = [], selected, onChange }) {
  return (
    <div className={styles.wrap}>
      <label className={styles.label}>Category</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className={styles.select}
      >
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}
