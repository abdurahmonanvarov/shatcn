import { Outlet, Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

function MainLoyout() {
  const location = useLocation();

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
    { name: "Contact", to: "/contact" },
    { name: "Card", to: "/card" },
    { name: "Liked", to: "/liked" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">MyShop</h1>
          <nav className="flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.to
                    ? "text-primary underline underline-offset-4"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-grow">
        <Outlet />
      </main>

      <footer className="bg-white text-center text-muted-foreground py-4 text-sm border-t">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </footer>
    </div>
  );
}

export default MainLoyout;
