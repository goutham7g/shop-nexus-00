import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import ProductCard from "../components/products/ProductCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const Products = () => {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [sortBy, setSortBy] = useState("featured");
    const [coordinates, setCoordinates] = useState(null);
    const [searchResults, setSearchResults] = useState([
        {
            "id": 1,
            "name": "Ponni Rice",
            "image": '/src/asserts/Ponni-rice.png',
            "discount": 30,
            "price": 559
        },
        {
            "id": 2,
            "name": "5R20 Rice",
            "image": '/src/asserts/5R20-rice.png',
            "discount": 10,
            "price": 629
        }
    ]);
    const [isLoadingState, setIsLoadingState] = useState(false);

    const handleSearch = async (query) => {
        if (!coordinates) return;

        setIsLoadingState(true);
        try {
            const response = await fetch("https://ondc-backend-omega.vercel.app/ondc/buyer/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    keyword: query || "rice",
                    gps: `${coordinates.lat},${coordinates.lng}`,
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log('API Response:', data);
        } catch (error) {
            console.error("Error fetching products:", error);
            setSearchResults([]);
        } finally {
            setIsLoadingState(false);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoordinates({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setCoordinates({ lat: 12.9716, lng: 77.5946 });
                }
            );
        } else {
            setCoordinates({ lat: 12.9716, lng: 77.5946 });
        }
    }, []);

    useEffect(() => {
        const searchValue = searchParams.get("search");
        if (searchValue) {
            setSearchQuery(searchValue);
            handleSearch(searchValue);
        }
    }, [searchParams]);

    useEffect(() => {
        if (coordinates) {
            handleSearch(searchQuery);
        }
    }, [coordinates]);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-6">All Products</h1>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <Input
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearchQuery(value);
                                    handleSearch(value);
                                }}
                                className="pl-10"
                            />
                        </div>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline" size="icon">
                            <SlidersHorizontal className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {isLoadingState ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {searchResults?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;