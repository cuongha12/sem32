import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Btn_x from './component/btn/btn_x';
import Footer from './customer/layout/footer/footer';
import { Suspense, lazy } from 'react';
import { AppProvider } from './Context/AppContext.js';

const Shop = lazy(() => import('./customer/page/shop/shop.js'));
const Home = lazy(() => import('./customer/page/home/home.js'));
const Checkout = lazy(() => import('./customer/page/checkout/checkout.js'));
const DetailProduct = lazy(() => import('./customer/page/detail-product/detail_product.js'));
const Cart = lazy(() => import('./customer/page/cart/cart.js'));
const Login = lazy(() => import('./customer/page/login/LoginCustomer.js'));
const Main = lazy(() => import("./customer/layout/main/Main.js"));
const HeaderAdmin = lazy(() => import("./admin/header/Header.js"));
const Category = lazy(() => import("./admin/category/Category.js"));
function App() {
  return (
    // <AppProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='' element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/shop/" element={<Shop />} />
          <Route path="/detail/:id" element={<DetailProduct />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/checkout/" element={<Checkout />} />
          {/* <Route path="contact" element={<Contact />} /> */}
        </Route>
        <Route path='/admin/' element={<HeaderAdmin />}>
          {/* <Route path='get' element={<UserMember />} />
            <Route path='change-password' element={<ChangPassword />} />
            <Route path='profile' element={<UserProfile />} /> */}
          <Route path='category' element={<Category />} />
          {/* <Route path='item' element={<Item />} />
            <Route path='color' element={<Color />} />
            <Route path='size' element={<Size />} />
            <Route path='product' element={<Product />} />
            <Route path='*' element={<Notfound />} />
            <Route path='usercustomer' element={<UserCustomer />} /> */}
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </Suspense>
    // </AppProvider>
  );
}

export default App;
