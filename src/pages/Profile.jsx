import { useState } from "react";
import { User, MapPin, CreditCard, Settings } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";

const Profile = () => {
    const { toast } = useToast();
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleUpdateProfile = async () => {
        // TODO: Call /update API
        toast({
            title: "Profile updated",
            description: "Your profile has been updated successfully",
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">My Profile</h1>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="profile">
                            <User className="w-4 h-4 mr-2" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="addresses">
                            <MapPin className="w-4 h-4 mr-2" />
                            Addresses
                        </TabsTrigger>
                        <TabsTrigger value="payment">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Payment Methods
                        </TabsTrigger>
                        <TabsTrigger value="settings">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    />
                                </div>
                                <Separator />
                                <Button onClick={handleUpdateProfile}>Save Changes</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="addresses">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Saved Addresses</CardTitle>
                                    <Button>Add New Address</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">No saved addresses yet</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="payment">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Payment Methods</CardTitle>
                                    <Button>Add Payment Method</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">No payment methods saved</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Email Notifications</Label>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" id="orderUpdates" />
                                            <label htmlFor="orderUpdates">Order Updates</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" id="promotions" />
                                            <label htmlFor="promotions">Promotions</label>
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <Button variant="destructive">Delete Account</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Profile;