import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  Calendar, 
  CreditCard, 
  Gift, 
  ArrowUpCircle,
  Star,
  Users,
  Heart,
  MessageCircle,
  Download,
  Pause,
  X
} from "lucide-react";

interface MembershipStatusProps {
  membership: {
    planName: string;
    status: "active" | "cancelled" | "expired" | "paused";
    nextBilling: string;
    amount: number;
    subscribedSince: string;
    benefits: string[];
  };
  availableUpgrades?: {
    id: number;
    name: string;
    price: number;
    additionalBenefits: string[];
  }[];
  onUpgrade?: (planId: number) => void;
  onCancel?: () => void;
  onPause?: () => void;
}

const MembershipStatus = ({ 
  membership, 
  availableUpgrades = [], 
  onUpgrade, 
  onCancel, 
  onPause 
}: MembershipStatusProps) => {
  const [showUpgrades, setShowUpgrades] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "paused":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      case "expired":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activa";
      case "paused":
        return "Pausada";
      case "cancelled":
        return "Cancelada";
      case "expired":
        return "Expirada";
      default:
        return "Desconocido";
    }
  };

  const getDaysUntilBilling = () => {
    const nextBilling = new Date(membership.nextBilling);
    const today = new Date();
    const diffTime = nextBilling.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getSubscriptionDuration = () => {
    const subscribedDate = new Date(membership.subscribedSince);
    const today = new Date();
    const diffTime = today.getTime() - subscribedDate.getTime();
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    return diffMonths;
  };

  const daysUntilBilling = getDaysUntilBilling();
  const subscriptionMonths = getSubscriptionDuration();
  const billingProgress = ((30 - daysUntilBilling) / 30) * 100;

  return (
    <div className="space-y-6">
      {/* Main Membership Card */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full -mr-16 -mt-16"></div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(membership.status)}`}></div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Plan {membership.planName}
                </CardTitle>
                <CardDescription>
                  Miembro desde {new Date(membership.subscribedSince).toLocaleDateString()}
                </CardDescription>
              </div>
            </div>
            <Badge variant={membership.status === "active" ? "default" : "secondary"}>
              {getStatusText(membership.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Billing Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                <span>Precio Mensual</span>
              </div>
              <div className="text-2xl font-bold">${membership.amount}</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Próximo Cobro</span>
              </div>
              <div className="text-lg font-semibold">
                {new Date(membership.nextBilling).toLocaleDateString()}
              </div>
              <div className="text-sm text-muted-foreground">
                En {daysUntilBilling} días
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4" />
                <span>Antigüedad</span>
              </div>
              <div className="text-lg font-semibold">
                {subscriptionMonths} {subscriptionMonths === 1 ? 'mes' : 'meses'}
              </div>
            </div>
          </div>

          {/* Billing Cycle Progress */}
          {membership.status === "active" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ciclo de facturación actual</span>
                <span>{Math.round(billingProgress)}% completado</span>
              </div>
              <Progress value={billingProgress} className="h-2" />
            </div>
          )}

          {/* Benefits */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Beneficios de tu plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {membership.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            {membership.status === "active" && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setShowUpgrades(!showUpgrades)}
                  className="flex-1 min-w-[120px]"
                >
                  <ArrowUpCircle className="w-4 h-4 mr-2" />
                  Mejorar Plan
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onPause}
                  className="flex-1 min-w-[120px]"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onCancel}
                  className="flex-1 min-w-[120px]"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </>
            )}
            
            {membership.status === "paused" && (
              <Button className="flex-1">
                Reactivar Suscripción
              </Button>
            )}
            
            {(membership.status === "cancelled" || membership.status === "expired") && (
              <Button className="flex-1">
                Renovar Suscripción
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Options */}
      {showUpgrades && availableUpgrades.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Opciones de Mejora</CardTitle>
            <CardDescription>
              Desbloquea más funciones mejorando tu plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableUpgrades.map((upgrade) => (
                <Card key={upgrade.id} className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{upgrade.name}</CardTitle>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        ${upgrade.price}/mes
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Beneficios adicionales:</h4>
                      <ul className="space-y-1">
                        {upgrade.additionalBenefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <Star className="w-3 h-3 text-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      onClick={() => onUpgrade?.(upgrade.id)}
                      className="w-full"
                    >
                      Mejorar a {upgrade.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de Uso</CardTitle>
          <CardDescription>
            Tu actividad en los últimos 30 días
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">247</div>
              <div className="text-sm text-muted-foreground">Likes dados</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">18</div>
              <div className="text-sm text-muted-foreground">Mensajes enviados</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Descargas</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-muted-foreground">Creadores seguidos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembershipStatus;