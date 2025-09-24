import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  DollarSign, 
  Users, 
  Settings, 
  Plus,
  Edit3,
  Trash2,
  Star,
  Gift,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Subscriptions = () => {
  const { toast } = useToast();
  
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    {
      id: 1,
      name: "Básico",
      price: 9.99,
      description: "Acceso a contenido exclusivo básico",
      features: ["Contenido semanal", "Mensajes directos", "Fotos exclusivas"],
      subscribers: 156,
      isActive: true,
      color: "blue"
    },
    {
      id: 2,
      name: "Premium",
      price: 19.99,
      description: "Acceso completo con beneficios adicionales",
      features: ["Todo del plan básico", "Videos HD", "Lives privados", "Descuentos especiales"],
      subscribers: 89,
      isActive: true,
      color: "purple"
    },
    {
      id: 3,
      name: "VIP",
      price: 39.99,
      description: "La experiencia más exclusiva",
      features: ["Todo del plan premium", "Contenido personalizado", "Videollamadas 1:1", "Regalos físicos"],
      subscribers: 23,
      isActive: true,
      color: "gold"
    }
  ]);

  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    description: "",
    features: [""]
  });

  const [recentSubscriptions] = useState([
    {
      id: 1,
      userName: "María García",
      userAvatar: "MG",
      plan: "Premium",
      amount: 19.99,
      date: "2024-01-20",
      status: "active"
    },
    {
      id: 2,
      userName: "Carlos Ruiz",
      userAvatar: "CR",
      plan: "Básico",
      amount: 9.99,
      date: "2024-01-19",
      status: "active"
    },
    {
      id: 3,
      userName: "Ana López",
      userAvatar: "AL",
      plan: "VIP",
      amount: 39.99,
      date: "2024-01-18",
      status: "active"
    }
  ]);

  const addFeature = () => {
    setNewPlan({
      ...newPlan,
      features: [...newPlan.features, ""]
    });
  };

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...newPlan.features];
    updatedFeatures[index] = value;
    setNewPlan({
      ...newPlan,
      features: updatedFeatures
    });
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = newPlan.features.filter((_, i) => i !== index);
    setNewPlan({
      ...newPlan,
      features: updatedFeatures
    });
  };

  const handleCreatePlan = () => {
    if (!newPlan.name || !newPlan.price || !newPlan.description) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    const plan = {
      id: subscriptionPlans.length + 1,
      name: newPlan.name,
      price: parseFloat(newPlan.price),
      description: newPlan.description,
      features: newPlan.features.filter(f => f.trim() !== ""),
      subscribers: 0,
      isActive: true,
      color: "blue"
    };

    setSubscriptionPlans([...subscriptionPlans, plan]);
    setNewPlan({ name: "", price: "", description: "", features: [""] });
    
    toast({
      title: "Plan creado",
      description: "El nuevo plan de suscripción ha sido creado exitosamente"
    });
  };

  const togglePlanStatus = (planId: number) => {
    setSubscriptionPlans(plans =>
      plans.map(plan =>
        plan.id === planId ? { ...plan, isActive: !plan.isActive } : plan
      )
    );
  };

  const getTotalRevenue = () => {
    return subscriptionPlans.reduce((total, plan) => {
      return total + (plan.price * plan.subscribers);
    }, 0);
  };

  const getTotalSubscribers = () => {
    return subscriptionPlans.reduce((total, plan) => total + plan.subscribers, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Gestión de Suscripciones</h1>
                <p className="text-sm text-muted-foreground">Administra tus planes y suscriptores</p>
              </div>
            </div>
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos por Suscripciones</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${getTotalRevenue().toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% desde el mes pasado
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Suscriptores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getTotalSubscribers()}</div>
              <p className="text-xs text-muted-foreground">
                +8.2% desde el mes pasado
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Planes Activos</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscriptionPlans.filter(p => p.isActive).length}</div>
              <p className="text-xs text-muted-foreground">
                de {subscriptionPlans.length} planes totales
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plans">Planes de Suscripción</TabsTrigger>
            <TabsTrigger value="subscribers">Suscriptores</TabsTrigger>
            <TabsTrigger value="create">Crear Plan</TabsTrigger>
          </TabsList>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card key={plan.id} className="relative hover-lift">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={plan.isActive ? "default" : "secondary"}>
                          {plan.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                        {plan.name === "VIP" && <Crown className="w-4 h-4 text-yellow-500" />}
                      </div>
                      <Switch
                        checked={plan.isActive}
                        onCheckedChange={() => togglePlanStatus(plan.id)}
                      />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {plan.name}
                      <span className="text-2xl font-bold text-primary">
                        ${plan.price}
                      </span>
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Características:</h4>
                        <ul className="space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <Star className="w-3 h-3 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm">
                          <span className="font-medium">{plan.subscribers}</span>
                          <span className="text-muted-foreground"> suscriptores</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Suscripciones Recientes</CardTitle>
                <CardDescription>
                  Las suscripciones más recientes a tus planes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSubscriptions.map((subscription) => (
                    <div
                      key={subscription.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                          {subscription.userAvatar}
                        </div>
                        <div>
                          <div className="font-medium">{subscription.userName}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {subscription.plan}
                            </Badge>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {subscription.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          ${subscription.amount}
                        </div>
                        <Badge variant="default" className="text-xs">
                          {subscription.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Plan Tab */}
          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crear Nuevo Plan</CardTitle>
                <CardDescription>
                  Define un nuevo plan de suscripción para tus seguidores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plan-name">Nombre del Plan*</Label>
                    <Input
                      id="plan-name"
                      placeholder="ej. Plan Premium"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan-price">Precio Mensual ($)*</Label>
                    <Input
                      id="plan-price"
                      type="number"
                      placeholder="19.99"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="plan-description">Descripción*</Label>
                  <Textarea
                    id="plan-description"
                    placeholder="Describe qué incluye este plan..."
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Características del Plan</Label>
                  {newPlan.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="ej. Acceso a contenido exclusivo"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                        disabled={newPlan.features.length <= 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addFeature} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Característica
                  </Button>
                </div>
                
                <Button onClick={handleCreatePlan} className="w-full">
                  <Gift className="w-4 h-4 mr-2" />
                  Crear Plan de Suscripción
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Subscriptions;