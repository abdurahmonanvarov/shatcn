import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      className="flex flex-col items-center text-center gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <motion.section
        className="max-w-2xl"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Welcome to MyShop
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          We offer high-quality products crafted with care and precision. Browse
          through our collection and find what suits you best.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/products">
            <Button className="text-base px-6 py-2">Browse Products</Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Social Links */}
      <motion.section
        className="flex gap-6 items-center text-muted-foreground"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
      >
        {[
          {
            icon: <Github className="w-6 h-6" />,
            url: "https://github.com/abdurahmonanvarov",
          },
          {
            icon: <Instagram className="w-6 h-6" />,
            url: "https://www.instagram.com/dtc_pubg?igsh=MWNqaGI2dmwyaWdwNQ==",
          },
          {
            icon: <Linkedin className="w-6 h-6" />,
            url: "https://www.linkedin.com/company/your-company",
          },
        ].map(({ icon, url }, i) => (
          <motion.a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ rotate: 10, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="hover:text-primary transition-colors"
          >
            {icon}
          </motion.a>
        ))}
      </motion.section>
    </motion.div>
  );
}

export default Home;
