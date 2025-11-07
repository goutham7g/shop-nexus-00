import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { useToast } from "../hooks/use-toast";

const ProductDetail = () => {
    const { id } = useParams();
    const { toast } = useToast();

    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            // TODO: Call /select API
            return null;
        },
    });

    const handleAddToCart = async () => {
        // TODO: Call /init API
        toast({
            title: "Added to cart",
            description: "Product has been added to your cart",
        });
    };

    const handleBuyNow = async () => {
        // TODO: Call /init and /confirm APIs
        toast({
            title: "Processing order",
            description: "Redirecting to checkout...",
        });
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-96 bg-muted rounded-lg mb-8" />
                    <div className="h-8 bg-muted rounded w-3/4 mb-4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                            <img
                                src={product?.image || "/placeholder.svg"}
                                alt={product?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < (product?.rating || 0)
                                                    ? "fill-accent text-accent"
                                                    : "text-muted-foreground"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    ({product?.reviews || 0} reviews)
                                </span>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-primary">
                                    ₹{product?.price}
                                </span>
                                {product?.discount && (
                                    <>
                                        <span className="text-xl text-muted-foreground line-through">
                                            ₹{Math.round(product.price / (1 - product.discount / 100))}
                                        </span>
                                        <Badge className="bg-accent text-accent-foreground">
                                            {product.discount}% OFF
                                        </Badge>
                                    </>
                                )}
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="font-semibold">Description</h3>
                            <p className="text-muted-foreground">{product?.description}</p>
                        </div>

                        <Separator />

                        <div className="flex gap-4">
                            <Button onClick={handleAddToCart} variant="outline" className="flex-1">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                            </Button>
                            <Button onClick={handleBuyNow} className="flex-1">
                                Buy Now
                            </Button>
                            <Button variant="outline" size="icon">
                                <Heart className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;