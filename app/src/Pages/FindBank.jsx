import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Star,
  Search,
  Filter,
  Route
} from "lucide-react";
import { motion } from "framer-motion";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function FindBank() {
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [language, setLanguage] = useState("en");

  // Mock bank data - in real app would come from API
  const nearbyBanks = [
    {
      id: 1,
      name: "State Bank of India",
      branch: "Main Branch",
      address: "123 MG Road, Delhi",
      phone: "+91 11 2345 6789",
      rating: 4.2,
      distance: "0.8 km",
      timings: "10:00 AM - 4:00 PM",
      services: ["DBT Seeding", "Account Opening", "Aadhaar Linking"],
      position: [28.6139, 77.2090]
    },
    {
      id: 2,
      name: "Punjab National Bank",
      branch: "Connaught Place",
      address: "45 CP Block, Delhi",
      phone: "+91 11 2876 5432",
      rating: 4.0,
      distance: "1.2 km",
      timings: "10:00 AM - 4:00 PM",
      services: ["DBT Seeding", "Mobile Banking", "Digital Services"],
      position: [28.6304, 77.2177]
    },
    {
      id: 3,
      name: "HDFC Bank",
      branch: "Sector 18",
      address: "Plot 67, Sector 18, Noida",
      phone: "+91 120 4567 890",
      rating: 4.5,
      distance: "2.1 km",
      timings: "9:30 AM - 6:30 PM",
      services: ["DBT Seeding", "Net Banking", "Customer Support"],
      position: [28.5706, 77.3272]
    }
  ];

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log("Location access denied");
          // Default to Delhi coordinates
          setUserLocation([28.6139, 77.2090]);
        }
      );
    } else {
      setUserLocation([28.6139, 77.2090]);
    }
  }, []);

  const content = {
    en: {
      title: "Find Nearby Banks for DBT Seeding",
      subtitle: "Locate banks near you that can help enable DBT on your account",
      searchPlaceholder: "Search by area, bank name...",
      getDirections: "Get Directions",
      callNow: "Call Now",
      selectBank: "Select Bank",
      services: "Available Services",
      timings: "Bank Timings",
      distance: "Distance",
      rating: "Rating"
    },
    hi: {
      title: "डीबीटी सीडिंग के लिए नज़दीकी बैंक खोजें",
      subtitle: "अपने नज़दीक के बैंक खोजें जो आपके खाते पर डीबीटी सक्षम करने में मदद कर सकें",
      searchPlaceholder: "क्षेत्र, बैंक नाम से खोजें...",
      getDirections: "दिशा निर्देश प्राप्त करें",
      callNow: "अभी कॉल करें",
      selectBank: "बैंक चुनें",
      services: "उपलब्ध सेवाएं",
      timings: "बैंक का समय",
      distance: "दूरी",
      rating: "रेटिंग"
    }
  };

  const currentContent = content[language];

  const handleGetDirections = (bank) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${bank.position[0]},${bank.position[1]}`;
    window.open(url, '_blank');
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const filteredBanks = nearbyBanks.filter(bank =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bank.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!userLocation) {
    return (
      <div className="min-h-screen bg-[var(--background-light)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-orange)] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-light)]">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-blue)] mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {currentContent.subtitle}
          </p>
          
          {/* Language Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-1 shadow-md border border-[var(--border-color)]">
              <Button
                variant={language === "en" ? "default" : "ghost"}
                onClick={() => setLanguage("en")}
                className={`rounded-full px-6 ${language === 'en' ? 'bg-[var(--primary-blue)] text-white hover:bg-blue-900' : 'text-gray-700'}`}
              >
                English
              </Button>
              <Button
                variant={language === "hi" ? "default" : "ghost"}
                onClick={() => setLanguage("hi")}
                className={`rounded-full px-6 ${language === 'hi' ? 'bg-[var(--primary-blue)] text-white hover:bg-blue-900' : 'text-gray-700'}`}
              >
                हिंदी
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 bg-white border border-[var(--border-color)]">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={currentContent.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-[var(--primary-orange)] hover:bg-orange-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="bg-white border border-[var(--border-color)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--primary-blue)]">
                  <MapPin className="w-5 h-5" />
                  {language === "en" ? "Bank Locations" : "बैंक स्थान"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 w-full">
                  <MapContainer 
                    center={userLocation} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    
                    {/* User location marker */}
                    <Marker position={userLocation}>
                      <Popup>
                        <div className="text-center">
                          <p className="font-semibold text-[var(--primary-blue)]">
                            {language === "en" ? "Your Location" : "आपका स्थान"}
                          </p>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Bank markers */}
                    {filteredBanks.map((bank) => (
                      <Marker 
                        key={bank.id} 
                        position={bank.position}
                        eventHandlers={{
                          click: () => setSelectedBank(bank)
                        }}
                      >
                        <Popup>
                          <div className="min-w-48">
                            <h3 className="font-bold text-[var(--primary-blue)] mb-1">{bank.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{bank.branch}</p>
                            <div className="flex items-center gap-1 mb-2">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{bank.rating}</span>
                              <span className="text-xs text-gray-500">• {bank.distance}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleGetDirections(bank)}
                                className="bg-[var(--primary-orange)] hover:bg-orange-700 text-xs"
                              >
                                <Navigation className="w-3 h-3 mr-1" />
                                {currentContent.getDirections}
                              </Button>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bank List */}
          <div className="space-y-4">
            <Card className="bg-white border border-[var(--border-color)]">
              <CardHeader>
                <CardTitle className="text-[var(--primary-blue)]">
                  {language === "en" ? "Nearby Banks" : "नज़दीकी बैंक"} 
                  <Badge variant="outline" className="ml-2">{filteredBanks.length}</Badge>
                </CardTitle>
              </CardHeader>
            </Card>

            {filteredBanks.map((bank) => (
              <motion.div
                key={bank.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: bank.id * 0.1 }}
              >
                <Card className={`cursor-pointer transition-all duration-200 border ${
                  selectedBank?.id === bank.id 
                    ? 'border-[var(--primary-orange)] bg-orange-50' 
                    : 'border-[var(--border-color)] bg-white hover:shadow-md'
                }`}
                onClick={() => setSelectedBank(bank)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-[var(--primary-blue)]">{bank.name}</h3>
                        <p className="text-sm text-gray-600">{bank.branch}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{bank.rating}</span>
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {bank.distance}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{bank.address}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Clock className="w-4 h-4" />
                      <span>{bank.timings}</span>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">{currentContent.services}:</p>
                      <div className="flex flex-wrap gap-1">
                        {bank.services.map((service, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-blue-100 text-[var(--secondary-blue)]">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetDirections(bank);
                        }}
                        className="flex-1 bg-[var(--primary-orange)] hover:bg-orange-700"
                      >
                        <Route className="w-4 h-4 mr-1" />
                        {currentContent.getDirections}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCall(bank.phone);
                        }}
                        className="border-[var(--secondary-blue)] text-[var(--secondary-blue)] hover:bg-blue-50"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <Alert className="mt-6 bg-blue-50 border-blue-200">
          <MapPin className="w-4 h-4 text-[var(--secondary-blue)]" />
          <AlertDescription className="text-blue-800">
            {language === "en" 
              ? "Visit any of these banks with your Aadhaar card to enable DBT seeding. Call ahead to confirm DBT services availability."
              : "डीबीटी सीडिंग सक्षम करने के लिए अपने आधार कार्ड के साथ इनमें से किसी भी बैंक जाएं। डीबीटी सेवाओं की उपलब्धता की पुष्टि के लिए पहले कॉल करें।"
            }
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}