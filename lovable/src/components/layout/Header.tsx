import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/10">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white hover-scale cursor-pointer">
            ContentHub
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-all duration-200 font-medium hover:scale-105">
              Inicio
            </Link>
            <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition-all duration-200 font-medium hover:scale-105">
              Dashboard
            </Link>
            <Link to="/library" className="text-foreground/80 hover:text-primary transition-all duration-200 font-medium hover:scale-105">
              Biblioteca
            </Link>
            <Link to="/upload" className="text-foreground/80 hover:text-primary transition-all duration-200 font-medium hover:scale-105">
              Subir
            </Link>
            <Link to="/messages" className="text-foreground/80 hover:text-primary transition-all duration-200 font-medium hover:scale-105">
              Mensajes
            </Link>
            <Link to="/profile" className="text-foreground/80 hover:text-primary transition-all duration-200 font-medium hover:scale-105">
              Perfil
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <Button variant="ghost" asChild className="hover-scale">
              <Link to="/login">Iniciar Sesión</Link>
            </Button>
            <Button variant="premium" asChild className="hover-scale">
              <Link to="/register">Registrarse</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover-scale"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 glass rounded-lg border border-white/20">
            <div className="space-y-4">
              <nav className="space-y-3">
                <Link to="/" className="block text-foreground/80 hover:text-primary font-medium">
                  Inicio
                </Link>
                <Link to="/dashboard" className="block text-foreground/80 hover:text-primary font-medium">
                  Dashboard
                </Link>
                <Link to="/library" className="block text-foreground/80 hover:text-primary font-medium">
                  Biblioteca
                </Link>
                <Link to="/upload" className="block text-foreground/80 hover:text-primary font-medium">
                  Subir
                </Link>
                <Link to="/messages" className="block text-foreground/80 hover:text-primary font-medium">
                  Mensajes
                </Link>
                <Link to="/profile" className="block text-foreground/80 hover:text-primary font-medium">
                  Perfil
                </Link>
              </nav>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="ghost" size="sm" className="justify-start" asChild>
                  <Link to="/login">Iniciar Sesión</Link>
                </Button>
                <Button variant="premium" size="sm" asChild>
                  <Link to="/register">Registrarse</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;