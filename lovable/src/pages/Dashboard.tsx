import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";
import { 
  Users, 
  DollarSign, 
  Heart, 
  TrendingUp, 
  Plus, 
  Settings, 
  BarChart3, 
  MessageCircle,
  Eye,
  Crown
} from "lucide-react";

const Dashboard = () => {
  // Datos simulados para mostrar la interfaz
  const [stats] = useState({
    totalSubscribers: 1247,
    monthlyRevenue: 3420,
    totalLikes: 8932,
    growthRate: 12.5,
  });

  const [recentContent] = useState([
    {
      id: 1,
      title: "Tutorial de Fotografía: Luz Natural",
      type: "video",
      subscribers: 89,
      revenue: 267,
      likes: 124,
      views: 892,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Set de Fotos Exclusivo - Sesión de Estudio",
      type: "photos",
      subscribers: 156,
      revenue: 468,
      likes: 203,
      views: 567,
      createdAt: "2024-01-12",
    },
    {
      id: 3,
      title: "Live Stream: Q&A con Seguidores",
      type: "live",
      subscribers: 45,
      revenue: 135,
      likes: 78,
      views: 234,
      createdAt: "2024-01-10",
    },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Header interno actualizado */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-20 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                P
              </div>
              <div>
                <h1 className="font-bold text-xl">Panel de Control</h1>
                <p className="text-sm text-muted-foreground">Bienvenido, Creator</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1">
                <Crown className="w-3 h-3" />
                Premium
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 pt-24 space-y-6">
        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suscriptores Totales</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubscribers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.growthRate}% desde el mes pasado
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +15.2% desde el mes pasado
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLikes.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8.1% desde el mes pasado
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Crecimiento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.growthRate}%</div>
              <p className="text-xs text-muted-foreground">
                Crecimiento mensual promedio
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Acciones Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Gestiona tu contenido y conecta con tu audiencia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col gap-2">
                <Plus className="w-6 h-6" />
                Subir Contenido
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <MessageCircle className="w-6 h-6" />
                Mensajes
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="w-6 h-6" />
                Analíticas
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contenido Reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Contenido Reciente</CardTitle>
            <CardDescription>
              Tu contenido más reciente y su rendimiento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContent.map((content) => (
                <div
                  key={content.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{content.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {content.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {content.subscribers} suscriptores
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {content.views} vistas
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {content.likes} likes
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      ${content.revenue}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {content.createdAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progreso del Mes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Meta de Ingresos Mensual</CardTitle>
              <CardDescription>
                Progreso hacia tu meta de $5,000
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Actual: ${stats.monthlyRevenue.toLocaleString()}</span>
                  <span>Meta: $5,000</span>
                </div>
                <Progress value={(stats.monthlyRevenue / 5000) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round((stats.monthlyRevenue / 5000) * 100)}% completado
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meta de Suscriptores</CardTitle>
              <CardDescription>
                Progreso hacia tu meta de 2,000 suscriptores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Actual: {stats.totalSubscribers.toLocaleString()}</span>
                  <span>Meta: 2,000</span>
                </div>
                <Progress value={(stats.totalSubscribers / 2000) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round((stats.totalSubscribers / 2000) * 100)}% completado
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;