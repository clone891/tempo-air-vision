import { useState } from "react";
import { MapPin, Layers, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapLayer, setMapLayer] = useState("aqi");

  // Mock data points for different cities
  const locations = [
    { id: 1, name: "Washington, DC", lat: 38.9, lng: -77.0, aqi: 85, status: "moderate" },
    { id: 2, name: "New York, NY", lat: 40.7, lng: -74.0, aqi: 72, status: "moderate" },
    { id: 3, name: "Los Angeles, CA", lat: 34.0, lng: -118.2, aqi: 105, status: "unhealthy-sensitive" },
    { id: 4, name: "Chicago, IL", lat: 41.9, lng: -87.6, aqi: 45, status: "good" },
    { id: 5, name: "Houston, TX", lat: 29.8, lng: -95.4, aqi: 92, status: "moderate" },
    { id: 6, name: "Phoenix, AZ", lat: 33.4, lng: -112.1, aqi: 118, status: "unhealthy-sensitive" }
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "bg-aqi-good";
    if (aqi <= 100) return "bg-aqi-moderate";
    if (aqi <= 150) return "bg-aqi-unhealthy-sensitive";
    return "bg-aqi-unhealthy";
  };

  const getAQILabel = (aqi: number) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive";
    return "Unhealthy";
  };

  return (
    <section id="map" className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Live Air Quality Map</h2>
          <p className="text-muted-foreground">Interactive map showing real-time AQI data across North America</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Map Container */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] relative overflow-hidden">
                <CardHeader className="absolute top-4 left-4 z-10 bg-background/95 backdrop-blur rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant={mapLayer === "aqi" ? "default" : "outline"}
                      onClick={() => setMapLayer("aqi")}
                    >
                      <Layers className="h-4 w-4 mr-1" />
                      AQI
                    </Button>
                    <Button
                      size="sm"
                      variant={mapLayer === "satellite" ? "default" : "outline"}
                      onClick={() => setMapLayer("satellite")}
                    >
                      Satellite
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 h-full">
                  {/* Simplified Map Representation */}
                  <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-900">
                    {/* Map overlay with data points */}
                    <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20" />
                    
                    {/* AQI Data Points */}
                    {locations.map((location) => (
                      <div
                        key={location.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{
                          left: `${((location.lng + 130) / 60) * 100}%`,
                          top: `${((50 - location.lat) / 25) * 100}%`
                        }}
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className={`w-6 h-6 rounded-full ${getAQIColor(location.aqi)} border-2 border-white shadow-lg animate-pulse`} />
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-background/95 px-2 py-1 rounded border whitespace-nowrap">
                          {location.aqi}
                        </div>
                      </div>
                    ))}

                    {/* Legend */}
                    <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur rounded-lg border p-3">
                      <h4 className="text-sm font-semibold mb-2">AQI Scale</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-aqi-good rounded-full" />
                          <span>0-50 Good</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-aqi-moderate rounded-full" />
                          <span>51-100 Moderate</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-aqi-unhealthy-sensitive rounded-full" />
                          <span>101-150 Unhealthy*</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-aqi-unhealthy rounded-full" />
                          <span>151+ Unhealthy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Location Details Panel */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5" />
                    <span>Location Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedLocation ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedLocation.name}</span>
                        </h3>
                        <div className="mt-2">
                          <div className="text-3xl font-bold text-aqi-moderate">{selectedLocation.aqi}</div>
                          <Badge variant="secondary" className="mt-1">
                            {getAQILabel(selectedLocation.aqi)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>PM2.5:</span>
                          <span>24.1 μg/m³</span>
                        </div>
                        <div className="flex justify-between">
                          <span>O₃:</span>
                          <span>65 ppb</span>
                        </div>
                        <div className="flex justify-between">
                          <span>NO₂:</span>
                          <span>38 ppb</span>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          Data from TEMPO satellite and local monitoring stations
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Click on a location marker to view details</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Sources</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-nasa-blue rounded-full" />
                    <span>NASA TEMPO Satellite</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Ground Monitoring Stations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span>Weather Data Integration</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;