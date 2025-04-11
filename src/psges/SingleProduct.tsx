import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  brand: string;
  category: string;
}

function SingleProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          setProduct(res.data);
          setLoading(false);
          checkFavorite(res.data.id);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const checkFavorite = (productId: number) => {
    const existing = localStorage.getItem("favorites");
    if (existing) {
      const favorites = JSON.parse(existing);
      const found = favorites.find((item: Product) => item.id === productId);
      setIsFavorited(!!found);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);
    const existing = localStorage.getItem("cart");
    const cart = existing ? JSON.parse(existing) : [];
    const updatedCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTimeout(() => {
      setIsAdding(false);
      toast.success("Mahsulot savatchaga qo‘shildi!");
    }, 500);
  };

  const toggleFavorite = () => {
    if (!product) return;
    const existing = localStorage.getItem("favorites");
    let favorites = existing ? JSON.parse(existing) : [];

    if (isFavorited) {
      favorites = favorites.filter((item: Product) => item.id !== product.id);
      setIsFavorited(false);
    } else {
      favorites.push(product);
      setIsFavorited(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  if (loading || !product) {
    return <p className="text-center text-muted-foreground">Loading...</p>;
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg"
        />
        <div className="flex flex-col justify-between gap-4 w-full">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold text-primary mb-2">
              {product.title}
            </h2>
            <motion.button
              whileTap={{ scale: 1.2 }}
              onClick={toggleFavorite}
              className="text-red-500"
            >
              <Heart
                className="w-6 h-6"
                fill={isFavorited ? "red" : "none"}
                color={isFavorited ? "red" : "currentColor"}
              />
            </motion.button>
          </div>

          <p className="text-muted-foreground mb-2">{product.description}</p>
          <p className="text-lg font-semibold text-green-600">
            ${product.price}
          </p>
          <p className="text-sm text-muted-foreground">
            Brand: {product.brand} | Category: {product.category}
          </p>

          <motion.div whileTap={{ scale: 0.95 }} className="mt-4">
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full"
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default SingleProduct;
