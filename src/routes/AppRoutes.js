import { Route, Routes } from "react-router-dom";
import { API_PATH } from "../config/api";
import HomePage from './../pages/HomePage';
import SignupPage from '../pages/SignupPage';
import LoginPage from './../pages/LoginPage';
import ProductListPage from './../pages/ProductListPage';
import ProductPage from './../pages/ProductPage';
import ProductInsertPage from '../pages/ProductInsertPage';
import ProductUpdatePage from '../pages/ProductUpdatePage';

import Fruit from './../pages/Fruit';
import FruitList from './../pages/FruitList';
import Element from './../pages/Element';

export default function AppRoutes({ user, setUser }) {
  return (
    <Routes>
      <Route path={API_PATH.HOME} element={<HomePage />} />
      <Route path={API_PATH.SIGNUP} element={<SignupPage />} />
      <Route path={API_PATH.LOGIN} element={<LoginPage setUser={setUser} />} />
      <Route path={API_PATH.PRODUCT_LIST} element={<ProductListPage user={user} />} />
      <Route path={API_PATH.PRODUCT} element={<ProductPage />} />
      <Route path={API_PATH.PRODUCT_INSERT} element={<ProductInsertPage />} />
      <Route path={API_PATH.PRODUCT_UPDATE} element={<ProductUpdatePage />} />

      <Route path={API_PATH.FRUIT} element={<Fruit />} />
      <Route path={API_PATH.FRUIT_LIST} element={<FruitList />} />
      <Route path={API_PATH.ELEMENT} element={<Element />} />
    </Routes>
  );
}