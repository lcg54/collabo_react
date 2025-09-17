import { Route, Routes } from "react-router-dom";
import Fruit from './../pages/Fruit'
import FruitList from './../pages/FruitList'

function App() {
  return (
    <Routes>
      <Route path='/fruit' element={<Fruit />} />
      <Route path='/fruit/list' element={<FruitList />} />
    </Routes>
  );
}

export default App;