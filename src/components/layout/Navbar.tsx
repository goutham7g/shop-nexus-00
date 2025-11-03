import { ShoppingCart, Heart, User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 
              className="text-2xl font-bold text-primary cursor-pointer"
              onClick={() => navigate("/")}
            >
              ShopNexus
            </h1>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button variant="ghost" onClick={() => navigate("/products")}>
                Products
              </Button>
            </nav>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate("/products");
                  }
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/wishlist")}
              className="relative"
            >
              <Heart className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/cart")}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                0
              </Badge>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/profile")}
            >
              <User className="w-5 h-5" />
            </Button>

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <Button variant="ghost" onClick={() => navigate("/")} className="justify-start">
                    Home
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/products")} className="justify-start">
                    Products
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/orders")} className="justify-start">
                    My Orders
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/profile")} className="justify-start">
                    Profile
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;