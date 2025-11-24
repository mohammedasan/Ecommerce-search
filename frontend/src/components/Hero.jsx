import React from 'react';
import styles from './Hero.module.css';

export default function Hero(){
  return (
    <section className={styles.hero}>
      <div className="container" style={{display:'flex', alignItems:'center', gap:20, padding:20}}>
        <div style={{flex:'1 1 420px'}}>
          <h1>Big deals on top products</h1>
          <p className={styles.lead}>Discover best sellers, discounts and trending products — all in one place.</p>
          <button className={styles.cta}>Shop Now</button>
        </div>
        <div className={styles.illustration}>
          <img src="https://picsum.photos/seed/store/800/420" alt="banner"/>
        </div>
      </div>
    </section>
  );
}
