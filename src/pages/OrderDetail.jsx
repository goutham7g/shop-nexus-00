import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Calendar, Package, CreditCard } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { useToast } from "../hooks/use-toast";

const OrderDetail = () => {
    const { id } = useParams();
    const { toast } = useToast();

    const { data: order, isLoading } = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            // TODO: Call /status API for specific order
            return null;
        },
    });

    const handleCancelOrder = async () => {
        // TODO: Call /cancel API
        toast({
            title: "Order cancelled",
            description: "Your order has been cancelled successfully",
        });
    };

    const handleTrackOrder = () => {
        // TODO: Navigate to tracking page or call /track API
        toast({
            title: "Tracking info",
            description: "Opening tracking details...",
        });
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-muted rounded w-1/4" />
                    <div className="h-64 bg-muted rounded" />
                </div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "delivered":
                return "bg-green-500";
            case "in-progress":
                return "bg-blue-500";
            case "cancelled":
                return "bg-red-500";
            default:
                return "bg-yellow-500";
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold">Order Details</h1>
                        <Badge className={getStatusColor(order?.status)}>
                            {order?.status}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">Order #{id}</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {order?.items?.map((item, index) => (
                                    <div key={index}>
                                        {index > 0 && <Separator className="my-4" />}
                                        <div className="flex gap-4">
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold mb-1">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Quantity: {item.quantity}
                                                </p>
                                                <p className="font-bold text-primary">₹{item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Address</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-4">
                                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="font-semibold mb-1">{order?.shippingAddress?.name}</p>
                                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                                            {order?.shippingAddress?.address}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {order?.shippingAddress?.phone}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Order Timeline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {order?.timeline?.map((event, index) => (
                                        <div key={index} className="flex gap-4">
                                            <Calendar className="w-5 h-5 text-primary shrink-0" />
                                            <div>
                                                <p className="font-semibold">{event.title}</p>
                                                <p className="text-sm text-muted-foreground">{event.description}</p>
                                                <p className="text-sm text-muted-foreground">{event.timestamp}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-semibold">₹{order?.subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="font-semibold">₹{order?.shipping}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-lg">
                                    <span>Total</span>
                                    <span className="font-bold">₹{order?.total}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-4">
                                    <CreditCard className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="font-semibold mb-1">{order?.payment?.method}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {order?.payment?.status}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <Button className="w-full" onClick={handleTrackOrder}>
                                <Package className="w-4 h-4 mr-2" />
                                Track Order
                            </Button>
                            {order?.status !== "delivered" && order?.status !== "cancelled" && (
                                <Button
                                    variant="outline"
                                    className="w-full text-destructive"
                                    onClick={handleCancelOrder}
                                >
                                    Cancel Order
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;