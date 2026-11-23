import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import WhatsAppOrder from './pages/WhatsAppOrder'
import RecentlyViewed from './pages/RecentlyViewed'
import AdminLogin from './pages/admin/AdminLogin'
import AdminProducts from './pages/admin/AdminProducts'
import AdminNewProduct from './pages/admin/AdminNewProduct'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produto/:id" element={<ProductDetail />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/pedido-whatsapp" element={<WhatsAppOrder />} />
              <Route path="/vistos-recentemente" element={<RecentlyViewed />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/produtos"
                element={
                  <ProtectedRoute>
                    <AdminProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/produtos/novo"
                element={
                  <ProtectedRoute>
                    <AdminNewProduct />
                  </ProtectedRoute>
                }
              />
            </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}