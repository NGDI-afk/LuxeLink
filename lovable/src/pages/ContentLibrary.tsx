import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import photoTutorial from "@/assets/content-photo-tutorial.jpg";
import studioSession from "@/assets/content-studio-session.jpg";
import videoBts from "@/assets/content-video-bts.jpg";
import podcastContent from "@/assets/content-podcast.jpg";
import { 
  Search,
  Filter,
  Grid3X3,
  List,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  Eye,
  Heart,
  DollarSign,
  Edit,
  Trash2,
  Download,
  Share2,
  MoreHorizontal
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface ContentItem {
  id: number;
  title: string;
  type: "photo" | "video" | "audio" | "text";
  thumbnail: string;
  views: number;
  likes: number;
  revenue: number;
  price: number;
  status: "published" | "draft" | "private";
  createdAt: string;
  tags: string[];
}

const ContentLibrary = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState("recent");

  // Datos simulados
  const [content] = useState<ContentItem[]>([
    {
      id: 1,
      title: "Tutorial de Fotografía: Luz Natural",
      type: "photo",
      thumbnail: photoTutorial,
      views: 892,
      likes: 124,
      revenue: 267,
      price: 15,
      status: "published",
      createdAt: "2024-01-15",
      tags: ["fotografía", "tutorial", "luz"],
    },
    {
      id: 2,
      title: "Set de Fotos Exclusivo - Sesión de Estudio",
      type: "photo",
      thumbnail: studioSession,
      views: 567,
      likes: 203,
      revenue: 468,
      price: 25,
      status: "published",
      createdAt: "2024-01-12",
      tags: ["exclusivo", "estudio", "sesión"],
    },
    {
      id: 3,
      title: "Video Behind the Scenes",
      type: "video",
      thumbnail: videoBts,
      views: 234,
      likes: 78,
      revenue: 135,
      price: 20,
      status: "published",
      createdAt: "2024-01-10",
      tags: ["video", "behind", "scenes"],
    },
    {
      id: 4,
      title: "Podcast: Consejos de Creación",
      type: "audio",
      thumbnail: podcastContent,
      views: 156,
      likes: 45,
      revenue: 89,
      price: 10,
      status: "draft",
      createdAt: "2024-01-08",
      tags: ["podcast", "consejos", "creación"],
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "photo": return ImageIcon;
      case "video": return Video;
      case "audio": return Music;
      case "text": return FileText;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "draft": return "secondary";
      case "private": return "outline";
      default: return "secondary";
    }
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const ContentCard = ({ item }: { item: ContentItem }) => {
    const TypeIcon = getTypeIcon(item.type);
    
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-video bg-muted">
          <img 
            src={item.thumbnail} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge variant={getStatusColor(item.status) as any}>
              {item.status}
            </Badge>
          </div>
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TypeIcon className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium line-clamp-1">{item.title}</h3>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{item.tags.length - 2}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-muted-foreground" />
              <span>{item.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-muted-foreground" />
              <span>{item.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-muted-foreground" />
              <span>${item.revenue}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3 pt-3 border-t">
            <span className="text-xs text-muted-foreground">{item.createdAt}</span>
            <span className="font-bold text-primary">${item.price}</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ContentListItem = ({ item }: { item: ContentItem }) => {
    const TypeIcon = getTypeIcon(item.type);
    
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 h-16 rounded bg-muted flex items-center justify-center">
                <TypeIcon className="w-6 h-6 text-muted-foreground" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <Badge variant={getStatusColor(item.status) as any}>
                    {item.status}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.views} vistas
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {item.likes} likes
                  </span>
                  <span>{item.createdAt}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-bold">${item.price}</div>
                <div className="text-sm text-green-600">+${item.revenue}</div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mi Biblioteca</h1>
            <p className="text-muted-foreground">
              Gestiona todo tu contenido desde un solo lugar
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            
            <Button>
              Subir Contenido
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar contenido..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="photo">Fotografías</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="text">Texto</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Más reciente</SelectItem>
                  <SelectItem value="popular">Más popular</SelectItem>
                  <SelectItem value="revenue">Más rentable</SelectItem>
                  <SelectItem value="alphabetical">Alfabético</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs de Estado */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Todo ({content.length})</TabsTrigger>
            <TabsTrigger value="published">
              Publicado ({content.filter(c => c.status === "published").length})
            </TabsTrigger>
            <TabsTrigger value="draft">
              Borradores ({content.filter(c => c.status === "draft").length})
            </TabsTrigger>
            <TabsTrigger value="private">
              Privado ({content.filter(c => c.status === "private").length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredContent.map(item => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContent.map(item => (
                  <ContentListItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Otros tabs tendrían contenido filtrado similar */}
        </Tabs>
        
        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No se encontró contenido</h3>
            <p className="text-muted-foreground">
              Intenta con otros términos de búsqueda o filtros
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentLibrary;