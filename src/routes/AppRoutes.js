import { Route, Routes } from "react-router-dom";

import HomePage from './../pages/HomePage';
import SignUpPage from './../pages/SignUpPage';
import Fruit from './../pages/Fruit';
import FruitList from './../pages/FruitList';
import Element from './../pages/Element';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/member/signup' element={<SignUpPage />} />
      <Route path='/fruit' element={<Fruit />} />
      <Route path='/fruit/list' element={<FruitList />} />
      <Route path='/element' element={<Element />} />
    </Routes>
  );
}

export default App;