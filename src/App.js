import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Btn_x from './component/btn/btn_x';
import Footer from './customer/layout/footer/footer';
import { Suspense, lazy, useLayoutEffect } from 'react';
import { AppProvider } from './Context/AppContext.js';
import { Spin } from 'antd';
import { useLocation } from 'react-router-dom';
const Shop = lazy(() => import('./customer/page/shop/shop.js'));
const Home = lazy(() => import('./customer/page/home/home.js'));
const Checkout = lazy(() => import('./customer/page/checkout/checkout.js'));
const DetailProduct = lazy(() => import('./customer/page/detail-product/detail_product.js'));
const Login = lazy(() => import('./customer/page/login/LoginCustomer.js'));
const Main = lazy(() => import("./customer/layout/main/Main.js"));
const HeaderAdmin = lazy(() => import("./admin/header/Header.js"));
const Register = lazy(() => import("./customer/page/register/Register.js"))
const LoginAdmin = lazy(() => import("./admin/page/login/LoginAdmin.js"));
const Category = lazy(() => import("./admin/page/category/Category.js"));
const Account = lazy(() => import("./admin/page/user/User"))
const Product = lazy(() => import("./admin/page/product/Product.js"));
const Notfound = lazy(() => import("./component/404/Notfound.js"))
const Detail = lazy(() => import("./customer/page/detail-product/detail_product.js"))
const Cart = lazy(() => import("./customer/page/cart/cart.js"))
function App() {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <AppProvider>
      <Suspense fallback={<Spin spinning={true} tip="Loading" size="large">
        <div className="content" />
      </Spin>}>
        <Routes>
          <Route path='' element={<Main />}>
            <Route index element={<Home />} />
            <Route path="/shop/" element={<Shop />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/checkout/" element={<Checkout />} />
            {/* <Route path='*' element={<Notfound />} /> */}
          </Route>
          <Route path='/admin/' element={<HeaderAdmin />}>
            <Route path='category' element={<Category />} />
            <Route path='account' element={<Account />} />
            <Route path='product' element={<Product />} />
            {/* <Route path='*' element={<Notfound />} /> */}

          </Route>
          <Route path={'/register'} element={<Register />}></Route>
          <Route path='login' element={<Login />} />
          <Route path='/admin/login' element={<LoginAdmin />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Suspense>
    </AppProvider>
  );
}

export default App;
