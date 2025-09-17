import { AlertTriangle, Shield, Activity, Bell, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const AlertPanel = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      level: "warning",
      title: "Air Quality Alert",
      message: "AQI levels are expected to reach 105 (Unhealthy for Sensitive Groups) between 12:00-15:00 today.",
      recommendations: [
        "Sensitive individuals should limit outdoor activities",
        "Close windows and use air filtration if available",
        "Avoid strenuous outdoor exercise"
      ],
      timestamp: "2024-01-15T10:30:00Z",
      active: true
    },
    {
      id: 2,
      level: "info",
      title: "Weather Impact Notice",
      message: "High temperatures and low wind speeds may increase pollution concentrations this afternoon.",
      recommendations: [
        "Plan outdoor activities for early morning",
        "Stay hydrated and seek shade when outside"
      ],
      timestamp: "2024-01-15T08:00:00Z",
      active: true
    }
  ]);

  const dismissAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: false } : alert
    ).filter(alert => alert.active));
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "danger":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case "warning":
        return "border-orange-500 bg-orange-50 dark:bg-orange-950/20";
      case "danger":
        return "border-red-500 bg-red-50 dark:bg-red-950/20";
      default:
        return "border-blue-500 bg-blue-50 dark:bg-blue-950/20";
    }
  };

  const healthRecommendations = [
    {
      icon: Shield,
      title: "Protect Yourself",
      items: [
        "Use N95 masks when outdoors during high pollution",
        "Keep windows closed and use HEPA air filters",
        "Limit outdoor exercise during peak pollution hours"
      ]
    },
    {
      icon: Activity,
      title: "Monitor Your Health",
      items: [
        "Watch for symptoms: coughing, throat irritation, difficulty breathing",
        "Seek medical attention if symptoms persist",
        "Take prescribed medications as directed by your doctor"
      ]
    },
    {
      icon: Bell,
      title: "Stay Informed",
      items: [
        "Check air quality forecasts before planning activities",
        "Subscribe to air quality alerts for your area",
        "Follow local health department guidelines"
      ]
    }
  ];

  return (
    <section id="alerts" className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Air Quality Alerts</h2>
          <p className="text-muted-foreground">Real-time notifications and health recommendations</p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Active Alerts */}
          {alerts.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center space-x-2">
                <Bell className="h-5 w-5 text-orange-500" />
                <span>Active Alerts</span>
                <Badge variant="secondary">{alerts.length}</Badge>
              </h3>
              
              {alerts.map((alert) => (
                <Alert key={alert.id} className={`${getAlertColor(alert.level)} border-l-4`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.level)}
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-semibold">{alert.title}</h4>
                          <AlertDescription className="text-sm">
                            {alert.message}
                          </AlertDescription>
                        </div>
                        
                        {alert.recommendations.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">Recommendations:</p>
                            <ul className="text-sm space-y-1">
                              {alert.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-muted-foreground">•</span>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <p className="text-xs text-muted-foreground">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissAlert(alert.id)}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Alert>
              ))}
            </div>
          )}

          {/* Health Recommendations */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Health Protection Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {healthRecommendations.map((section, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <section.icon className="h-5 w-5 text-nasa-blue" />
                      <span className="text-lg">{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2 text-sm">
                          <span className="text-nasa-blue mt-1.5 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AQI Health Index Reference */}
          <Card>
            <CardHeader>
              <CardTitle>Air Quality Health Index Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                    <span className="font-semibold text-green-700 dark:text-green-300">Good (0-50)</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Air quality is satisfactory. Enjoy outdoor activities.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                    <span className="font-semibold text-yellow-700 dark:text-yellow-300">Moderate (51-100)</span>
                  </div>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Sensitive individuals may experience minor issues.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full" />
                    <span className="font-semibold text-orange-700 dark:text-orange-300">Unhealthy* (101-150)</span>
                  </div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    Sensitive groups should limit outdoor exposure.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full" />
                    <span className="font-semibold text-red-700 dark:text-red-300">Unhealthy (151+)</span>
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Everyone should reduce outdoor activities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AlertPanel;