import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ShoppingBag, Truck, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Index = () => {
  const navigate = useNavigate();

  const { data: featuredProducts } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      // TODO: Call /search API with featured filter
      return [];
    },
  });

  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      // TODO: Fetch brands
      return [];
    },
  });

  const features = [
    {
      icon: ShoppingBag,
      title: "Wide Selection",
      description: "Thousands of products to choose from",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable shipping",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Safe and encrypted transactions",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to ShopNexus
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/products")}
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="outline" onClick={() => navigate("/products")}>
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              {(featuredProducts?.length > 0 ? featuredProducts : [...Array(8)]).map((product: any, index: number) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                        <img
                          src={product?.image || "/placeholder.svg"}
                          alt={product?.name || "Product"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold mb-2 truncate">
                        {product?.name || `Product ${index + 1}`}
                      </h3>
                      <p className="text-lg font-bold text-primary">
                        ₹{product?.price || "999"}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Brand</h2>
          
          <Carousel className="w-full">
            <CarouselContent>
              {(brands?.length > 0 ? brands : [...Array(6)]).map((brand: any, index: number) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/6">
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <img
                          src={brand?.logo || "/placeholder.svg"}
                          alt={brand?.name || "Brand"}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Start Shopping Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of happy customers
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate("/products")}
          >
            Browse Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
