import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import { 
  Camera,
  Edit3,
  MapPin,
  Calendar,
  Globe,
  Instagram,
  Twitter,
  Link,
  Bell,
  Shield,
  Wallet,
  Users,
  Heart,
  Eye,
  DollarSign,
  Crown
} from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Datos del perfil simulados
  const [profile, setProfile] = useState({
    name: "Ana Martínez",
    username: "anamartinez_photo",
    email: "ana.martinez@email.com",
    bio: "Fotógrafa profesional especializada en retratos y fotografía de moda. Creando contenido exclusivo para mis seguidores.",
    location: "Madrid, España",
    website: "www.anamartinez.com",
    instagram: "@anamartinez_photo",
    twitter: "@anamartinez",
    joinedDate: "Enero 2024",
    avatar: "/api/placeholder/150/150",
    coverImage: "/api/placeholder/800/300",
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    profilePublic: true,
    showEarnings: false,
  });

  const [stats] = useState({
    subscribers: 1247,
    totalLikes: 8932,
    totalViews: 15678,
    monthlyRevenue: 3420,
    contentCount: 89,
  });

  const handleSaveProfile = () => {
    toast({
      title: "Perfil actualizado",
      description: "Tus cambios han sido guardados exitosamente",
    });
    setIsEditing(false);
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    toast({
      title: "Configuración actualizada",
      description: "La configuración se ha guardado automáticamente",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
        {/* Header con Cover Image */}
        <Card className="mb-8 overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-primary to-purple-600">
            <img 
              src={profile.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover opacity-50"
            />
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute top-4 right-4"
            >
              <Camera className="w-4 h-4 mr-2" />
              Cambiar portada
            </Button>
          </div>
          
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row items-start gap-4 -mt-16 relative z-10">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-background">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-2xl font-bold">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1 md:mt-16">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <Badge variant="secondary" className="gap-1">
                    <Crown className="w-3 h-3" />
                    Premium
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-1">@{profile.username}</p>
                <p className="text-sm mb-4">{profile.bio}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Desde {profile.joinedDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <a href={`https://${profile.website}`} className="hover:text-primary">
                      {profile.website}
                    </a>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-bold">{stats.subscribers.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Suscriptores</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="font-bold">{stats.totalLikes.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <span className="font-bold">{stats.totalViews.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Vistas</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="font-bold">${stats.monthlyRevenue.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Este mes</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="font-bold">{stats.contentCount}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Contenidos</p>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? "Guardar cambios" : "Editar perfil"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs de Configuración */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="social">Redes Sociales</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="privacy">Privacidad</TabsTrigger>
          </TabsList>

          {/* Tab de Perfil */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Actualiza tu información básica y biografía
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({...prev, name: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Nombre de usuario</Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile(prev => ({...prev, username: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({...prev, email: e.target.value}))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({...prev, bio: e.target.value}))}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Cuéntanos sobre ti..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({...prev, location: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio web</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile(prev => ({...prev, website: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveProfile}>
                      Guardar cambios
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Redes Sociales */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Redes Sociales</CardTitle>
                <CardDescription>
                  Conecta tus perfiles de redes sociales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={profile.instagram}
                    onChange={(e) => setProfile(prev => ({...prev, instagram: e.target.value}))}
                    placeholder="@usuario"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    value={profile.twitter}
                    onChange={(e) => setProfile(prev => ({...prev, twitter: e.target.value}))}
                    placeholder="@usuario"
                  />
                </div>
                
                <Button className="w-full md:w-auto">
                  Guardar enlaces
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Notificaciones */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Notificaciones</CardTitle>
                <CardDescription>
                  Controla qué notificaciones quieres recibir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      <Label>Notificaciones por email</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Recibe actualizaciones importantes por email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Notificaciones push</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificaciones instantáneas en tu dispositivo
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Emails de marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Consejos, actualizaciones de producto y ofertas
                    </p>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Privacidad */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Privacidad</CardTitle>
                <CardDescription>
                  Controla quién puede ver tu contenido y datos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <Label>Perfil público</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Permite que otros usuarios vean tu perfil
                    </p>
                  </div>
                  <Switch
                    checked={settings.profilePublic}
                    onCheckedChange={(checked) => handleSettingChange('profilePublic', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      <Label>Mostrar ganancias</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Muestra tus estadísticas de ingresos públicamente
                    </p>
                  </div>
                  <Switch
                    checked={settings.showEarnings}
                    onCheckedChange={(checked) => handleSettingChange('showEarnings', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
                <CardDescription>
                  Acciones irreversibles para tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="destructive" className="w-full md:w-auto">
                  Eliminar cuenta
                </Button>
                <p className="text-sm text-muted-foreground">
                  Esta acción eliminará permanentemente tu cuenta y todo tu contenido.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;