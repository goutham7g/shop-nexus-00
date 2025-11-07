import { useQuery } from "@tanstack/react-query";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "../components/ui/separator";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();

    const { data: cartItems, isLoading } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            // TODO: Fetch cart items
            return [];
        },
    });

    const subtotal = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
    const shipping = 50;
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        // TODO: Call /confirm API
        navigate("/orders");
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {isLoading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
                                ))}
                            </div>
                        ) : cartItems?.length === 0 ? (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <p className="text-muted-foreground mb-4">Your cart is empty</p>
                                    <Button onClick={() => navigate("/products")}>
                                        Continue Shopping
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            cartItems?.map((item) => (
                                <Card key={item.id}>
                                    <CardContent className="p-4">
                                        <div className="flex gap-4">
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold mb-2">{item.name}</h3>
                                                <p className="text-lg font-bold text-primary">₹{item.price}</p>
                                            </div>
                                            <div className="flex flex-col items-end justify-between">
                                                <Button variant="ghost" size="icon">
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                                        <Minus className="w-3 h-3" />
                                                    </Button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-semibold">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="font-semibold">₹{shipping}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-lg">
                                    <span>Total</span>
                                    <span className="font-bold">₹{total}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" size="lg" onClick={handleCheckout}>
                                    Checkout
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;