import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./psges/Home";
import Products from "./psges/Products";
import Contact from "./psges/Contact";
import SinglePeoducts from "./psges/SingleProduct";
import MainLoyout from "./loyout/MainLoyout";
import Card from "./psges/Cart";
import Liked from "./psges/Favorites";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLoyout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products/:id" element={<SinglePeoducts />} />
          <Route path="card" element={<Card />} />
          <Route path="liked" element={<Liked />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
