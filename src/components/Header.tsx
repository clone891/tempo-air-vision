import { Satellite, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const navItems = [
    { label: "Home", href: "#home", active: true },
    { label: "Live Map", href: "#map" },
    { label: "Forecast", href: "#forecast" },
    { label: "Alerts", href: "#alerts" },
    { label: "About", href: "#about" },
    { label: "Profile", href: "#profile" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-nasa-dark/95 backdrop-blur supports-[backdrop-filter]:bg-nasa-dark/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Satellite className="h-8 w-8 text-nasa-blue" />
              <div>
                <h1 className="text-xl font-bold text-white">CleanAir Forecast</h1>
                <p className="text-xs text-nasa-light-blue">Powered by NASA TEMPO</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-nasa-blue ${
                  item.active ? "text-nasa-blue" : "text-white/80"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-nasa-dark border-border">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-nasa-blue ${
                      item.active ? "text-nasa-blue" : "text-white/80"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;