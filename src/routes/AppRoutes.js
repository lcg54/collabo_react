import { Route, Routes } from "react-router-dom";

import HomePage from './../pages/HomePage';
import SignupPage from '../pages/SignupPage';
import LoginPage from './../pages/LoginPage';
import Fruit from './../pages/Fruit';
import FruitList from './../pages/FruitList';
import Element from './../pages/Element';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/member/signup' element={<SignupPage />} />
      <Route path='/member/login' element={<LoginPage />} />
      <Route path='/fruit' element={<Fruit />} />
      <Route path='/fruit/list' element={<FruitList />} />
      <Route path='/element' element={<Element />} />
    </Routes>
  );
}

export default App;