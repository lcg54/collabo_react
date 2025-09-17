import { Route, Routes } from "react-router-dom";
import Fruit from './../pages/Fruit';
import FruitList from './../pages/FruitList';
import Element from './../pages/Element';

function App() {
  return (
    <Routes>
      <Route path='/fruit' element={<Fruit />} />
      <Route path='/fruit/list' element={<FruitList />} />
      <Route path='/element' element={<Element />} />
    </Routes>
  );
}

export default App;