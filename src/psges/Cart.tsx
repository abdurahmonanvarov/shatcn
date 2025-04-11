// src/pages/Cart.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  const handleRemove = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  if (cartItems.length === 0) {
    return <p className="text-center text-muted-foreground">Savatcha bo‘sh</p>;
  }

  return (
    <motion.div
      className="grid gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {cartItems.map((item) => (
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
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm text-green-600">${item.price}</p>
          </div>
          <Button variant="destructive" onClick={() => handleRemove(item.id)}>
            Remove
          </Button>
        </div>
      ))}
    </motion.div>
  );
}

export default Cart;
