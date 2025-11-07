import { useQuery } from "@tanstack/react-query";
import { Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const navigate = useNavigate();

    const { data: wishlistItems, isLoading } = useQuery({
        queryKey: ["wishlist"],
        queryFn: async () => {
            // TODO: Fetch wishlist items
            return [];
        },
    });

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
                        ))}
                    </div>
                ) : wishlistItems?.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
                            <Button onClick={() => navigate("/products")}>
                                Browse Products
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems?.map((item) => (
                            <Card key={item.id} className="group overflow-hidden">
                                <div
                                    className="relative aspect-square overflow-hidden bg-muted cursor-pointer"
                                    onClick={() => navigate(`/product/${item.id}`)}
                                >
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold truncate mb-2">{item.name}</h3>
                                    <p className="text-lg font-bold text-primary mb-4">₹{item.price}</p>
                                    <div className="flex gap-2">
                                        <Button className="flex-1" size="sm">
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;