import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { searchProducts } from '../api';

export default function Header() {
  const [query, setQuery] = useState('');
  const [suggest, setSuggest] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShow(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggest([]);
      return;
    }
    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await searchProducts(query.trim());
        setSuggest(res);
        setShow(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const onSelect = (name) => {
    setQuery(name);
    setShow(false);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.brand}>MyStore</div>

        <div className={styles.searchWrap} ref={wrapperRef}>
          <input
            className={styles.search}
            placeholder="Search products, e.g. phone, shirt..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => query && setShow(true)}
          />
          <button className={styles.searchBtn}>Search</button>

          {show && (suggest.length > 0 || loading) && (
            <div className={styles.dropdown}>
              {loading && <div className={styles.item}>Searching…</div>}
              {!loading && suggest.map(p => (
                <div key={p.id} className={styles.item} onClick={() => onSelect(p.name)}>
                  <img src={p.image || '/'} alt="" />
                  <div className={styles.itemText}>
                    <div className={styles.name}>{p.name}</div>
                    <div className={styles.muted}>{p.category} • ₹{p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className={styles.actions}>
          <button className={styles.icon}>🛒</button>
        </nav>
      </div>
    </header>
  );
}
