# 🛒 Product Landing Page with Autosuggest Search (MERN Stack Assignment)

A clean, responsive e-commerce style landing page built using **React (Vite)** for the frontend and **Node.js + Express** for the backend. The app includes a **live autosuggest search bar**, responsive product grid, filters, and API integration.

---

## 🚀 Features

### 🔎 **Autosuggest Search**
- Search box in the header
- Calls backend: `GET /search?q=term`
- Returns **maximum 5 suggestions**
- Case-insensitive partial match
- Clicking a suggestion fills the input box

### 🖼 **Hero Section**
- Large banner with text + CTA button

### 🛍 **Products Grid**
- 10–25 products displayed
- Product image, name, category, price, rating
- Hover effects & responsive layout

### 🎚 **Filter**
- Category dropdown filter
- Client-side filtering

### 📱 **Fully Responsive**
- Smooth layout for Desktop, Tablet, Mobile

### 🧩 **Backend**
- Node.js + Express
- `/products` → returns list of products from DummyJSON API
- `/search` → same data but filtered for search

---

## 📁 Folder Structure

├── frontend/ # React + Vite code
├── backend/ # Node.js + Express backend
├── README.md # You're reading this!



---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- CSS Modules
- Fetch API

### Backend
- Node.js
- Express
- Axios
- CORS
- DummyJSON API

---

## 🧪 APIs Implemented

### **GET /products?limit=20**
Returns a list of products.

Response format:
```json
{
  "count": 20,
  "products": [
    {
      "id": 1,
      "name": "Smartphone Max",
      "category": "Phones",
      "price": 39999,
      "rating": 4.5,
      "image": "https://..."
    }
  ]
}

GET /search?q=term

Returns up to 5 matching products (case-insensitive).
GET http://localhost:5000/search?q=phone


Setup Instructions
🔧 Backend (Node.js + Express)
cd backend
npm install
npm start


Backend runs on:

http://localhost:5000

🖥 Frontend (React + Vite)
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

