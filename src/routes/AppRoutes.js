import { Route, Routes } from "react-router-dom";

import HomePage from './../pages/HomePage';
import SignupPage from '../pages/SignupPage';
import LoginPage from './../pages/LoginPage';
import ProductListPage from './../pages/ProductListPage';
import ProductDetailPage from './../pages/ProductDetailPage';
import ProductInsertPage from '../pages/ProductInsertPage';
import ProductUpdatePage from '../pages/ProductUpdatePage';
import CartPage from '../pages/CartPage';
import OrderListPage from '../pages/OrderListPage';

import Fruit from './../pages/Fruit';
import FruitList from './../pages/FruitList';
import Element from './../pages/Element';

import { API_PATH } from "../config/api";

export default function AppRoutes({ user, setUser }) {
  return (
    <Routes>
      <Route path={API_PATH.HOME} element={<HomePage />} />
      <Route path={API_PATH.SIGNUP} element={<SignupPage />} />
      <Route path={API_PATH.LOGIN} element={<LoginPage setUser={setUser} />} />
      <Route path={API_PATH.PRODUCT_LIST} element={<ProductListPage user={user} />} />
      <Route path={`${API_PATH.PRODUCT_DETAIL}/:id`} element={<ProductDetailPage user={user} />} />
      <Route path={API_PATH.PRODUCT_INSERT} element={<ProductInsertPage />} />
      <Route path={`${API_PATH.PRODUCT_UPDATE}/:id`} element={<ProductUpdatePage />} />
      <Route path={API_PATH.CART} element={<CartPage user={user} />} />
      <Route path={API_PATH.ORDER_LIST} element={<OrderListPage user={user} />} />

      <Route path={API_PATH.FRUIT} element={<Fruit />} />
      <Route path={API_PATH.FRUIT_LIST} element={<FruitList />} />
      <Route path={API_PATH.ELEMENT} element={<Element />} />
    </Routes>
  );
}