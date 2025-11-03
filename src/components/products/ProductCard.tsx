import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    rating?: number;
    discount?: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
          onClick={() => navigate(`/product/${product.id}`)}
        />
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
            {product.discount}% OFF
          </Badge>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      
      <CardContent className="p-4" onClick={() => navigate(`/product/${product.id}`)}>
        <h3 className="font-semibold truncate mb-2">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">₹{product.price}</span>
          {product.discount && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{Math.round(product.price / (1 - product.discount / 100))}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;