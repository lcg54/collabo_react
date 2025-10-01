import { Route, Routes } from "react-router-dom";

import HomePage from './../pages/HomePage';
import SignupPage from '../pages/SignupPage';
import LoginPage from './../pages/LoginPage';
import Info from '../pages/Info';
import ProductListPage from './../pages/ProductListPage';
import ProductDetailPage from './../pages/ProductDetailPage';
import ProductInsertPage from '../pages/ProductInsertPage';
import ProductUpdatePage from '../pages/ProductUpdatePage';
import CartPage from '../pages/CartPage';
import OrderListPage from '../pages/OrderListPage';

import Fruit from './../pages/Fruit';
import FruitList from './../pages/FruitList';
import Element from './../pages/Element';

import { PATH } from "../config/url";

export default function AppRoutes({ user, setUser }) {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<HomePage />} />

      <Route path={PATH.SIGNUP} element={<SignupPage />} />
      <Route path={PATH.LOGIN} element={<LoginPage setUser={setUser} />} />
      <Route path={PATH.INFO} element={<Info user={user} />} />

      <Route path={PATH.PRODUCT_LIST} element={<ProductListPage user={user} />} />
      <Route path={`${PATH.PRODUCT_DETAIL}/:id`} element={<ProductDetailPage user={user} />} />
      <Route path={PATH.PRODUCT_INSERT} element={<ProductInsertPage />} />
      <Route path={`${PATH.PRODUCT_UPDATE}/:id`} element={<ProductUpdatePage />} />

      <Route path={PATH.CART} element={<CartPage user={user} />} />

      <Route path={PATH.ORDER_LIST} element={<OrderListPage user={user} />} />

      <Route path={PATH.FRUIT} element={<Fruit />} />
      <Route path={PATH.FRUIT_LIST} element={<FruitList />} />
      <Route path={PATH.ELEMENT} element={<Element />} />
    </Routes>
  );
}