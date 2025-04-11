import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

function Contact() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !address || !phone) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const formData = {
      email,
      address,
      phone,
      cartItems,
    };

    console.log("Yuborilgan ma'lumot:", formData);

    // TODO: Replace this with real API request to send email
    toast.success("Ma'lumot yuborildi!");

    // Reset
    setEmail("");
    setAddress("");
    setPhone("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-primary">Biz bilan bog‘lanish</h1>

      {/* Cart preview */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Siz tanlagan mahsulotlar:</h2>
        {cartItems.length === 0 ? (
          <p className="text-muted-foreground">Hozircha mahsulot yo‘q.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">${item.price}</p>
              </div>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-14 h-14 object-cover rounded-md"
              />
            </div>
          ))
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="address" className="mb-2">
            Manzil
          </Label>
          <Textarea
            id="address"
            placeholder="Turar joy manzilingiz"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone" className="mb-2">
            Telefon raqami
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+998901234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Yuborish
        </Button>
      </form>
    </div>
  );
}

export default Contact;
