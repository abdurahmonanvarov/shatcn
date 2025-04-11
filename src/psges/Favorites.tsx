// src/pages/Favorites.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

function Favorites() {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const fav = localStorage.getItem("favorites");
    if (fav) {
      setFavorites(JSON.parse(fav));
    }
  }, []);

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <p className="text-center text-muted-foreground">Yoqtirilganlar bo‘sh</p>
    );
  }

  return (
    <motion.div
      className="grid gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {favorites.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-4 bg-white shadow rounded-xl"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div className="flex-1">
            <Link to={`/products/${item.id}`}>
              <h2 className="text-lg font-semibold hover:underline">
                {item.title}
              </h2>
            </Link>
            <p className="text-sm text-green-600">${item.price}</p>
          </div>
          <Button variant="outline" onClick={() => removeFavorite(item.id)}>
            Remove
          </Button>
        </div>
      ))}
    </motion.div>
  );
}

export default Favorites;
