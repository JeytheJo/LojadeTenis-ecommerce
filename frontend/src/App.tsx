import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
<<<<<<< HEAD
import { ProtectedRoute } from './components/layout/ProtectedRoute';

=======
>>>>>>> 275f2cc (feat: update product detail and recently viewed pages with improved loading states and error handling)
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
<<<<<<< HEAD
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
=======
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produto/:id" element={<ProductDetail />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/pedido-whatsapp" element={<WhatsAppOrder />} />
            <Route path="/vistos-recentemente" element={<RecentlyViewed />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/produtos" element={<AdminProducts />} />
            <Route path="/admin/produtos/novo" element={<AdminNewProduct />} />
          </Routes>
>>>>>>> 275f2cc (feat: update product detail and recently viewed pages with improved loading states and error handling)
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}