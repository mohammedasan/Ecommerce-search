// API helper — change base if your backend runs elsewhere
export const API_BASE = 'http://localhost:5000';

export async function fetchProducts(limit = 20) {
  const res = await fetch(`${API_BASE}/products?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  return json.products || [];
}

export async function searchProducts(q) {
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) {
    const j = await res.json().catch(()=>({}));
    throw new Error(j.error || 'Search failed');
  }
  const json = await res.json();
  return json.products || [];
}
