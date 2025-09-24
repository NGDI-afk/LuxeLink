import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Shield, 
  Lock, 
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentProcessorProps {
  plan: {
    id: number;
    name: string;
    price: number;
    description: string;
    features: string[];
  };
  onPaymentSuccess?: (paymentData: any) => void;
  onPaymentError?: (error: string) => void;
}

const PaymentProcessor = ({ plan, onPaymentSuccess, onPaymentError }: PaymentProcessorProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  });
  const [billingInfo, setBillingInfo] = useState({
    email: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'number') {
      setCardData({ ...cardData, [field]: formatCardNumber(value) });
    } else if (field === 'expiry') {
      setCardData({ ...cardData, [field]: formatExpiry(value) });
    } else if (field === 'cvc') {
      setCardData({ ...cardData, [field]: value.replace(/\D/g, '').slice(0, 4) });
    } else {
      setCardData({ ...cardData, [field]: value });
    }
  };

  const validateForm = () => {
    if (!cardData.number || cardData.number.replace(/\s/g, '').length < 13) {
      return "Número de tarjeta inválido";
    }
    if (!cardData.expiry || cardData.expiry.length < 5) {
      return "Fecha de vencimiento inválida";
    }
    if (!cardData.cvc || cardData.cvc.length < 3) {
      return "CVC inválido";
    }
    if (!cardData.name.trim()) {
      return "Nombre del titular requerido";
    }
    if (!billingInfo.email || !billingInfo.email.includes('@')) {
      return "Email inválido";
    }
    return null;
  };

  const processPayment = async () => {
    const validationError = validateForm();
    if (validationError) {
      toast({
        title: "Error de validación",
        description: validationError,
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulación de procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulación de éxito (90% de probabilidad)
      if (Math.random() > 0.1) {
        const paymentData = {
          transactionId: `txn_${Date.now()}`,
          amount: plan.price,
          plan: plan.name,
          paymentMethod: "****" + cardData.number.slice(-4),
          status: "completed",
          date: new Date().toISOString()
        };

        toast({
          title: "¡Pago exitoso!",
          description: `Te has suscrito al plan ${plan.name}`,
        });

        onPaymentSuccess?.(paymentData);
      } else {
        throw new Error("Payment declined");
      }
    } catch (error) {
      const errorMessage = "Error procesando el pago. Intenta nuevamente.";
      toast({
        title: "Error de pago",
        description: errorMessage,
        variant: "destructive"
      });
      onPaymentError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTax = (amount: number) => {
    return amount * 0.1; // 10% tax
  };

  const total = plan.price + calculateTax(plan.price);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Plan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Resumen de Suscripción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                ${plan.price}/mes
              </Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Incluye:</h4>
              <ul className="space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Información de Pago
          </CardTitle>
          <CardDescription>
            Tu información está protegida con encriptación de nivel bancario
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Card Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Número de Tarjeta</Label>
              <div className="relative">
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  maxLength={19}
                />
                <CreditCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Fecha de Vencimiento</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) => handleInputChange('expiry', e.target.value)}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <div className="relative">
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cardData.cvc}
                    onChange={(e) => handleInputChange('cvc', e.target.value)}
                    maxLength={4}
                  />
                  <Shield className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-name">Nombre del Titular</Label>
              <Input
                id="card-name"
                placeholder="Juan Pérez"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
              />
            </div>
          </div>

          <Separator />

          {/* Billing Information */}
          <div className="space-y-4">
            <h3 className="font-medium">Información de Facturación</h3>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="juan@email.com"
                value={billingInfo.email}
                onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                placeholder="Calle Principal 123"
                value={billingInfo.address}
                onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  placeholder="Madrid"
                  value={billingInfo.city}
                  onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Código Postal</Label>
                <Input
                  id="zip"
                  placeholder="28001"
                  value={billingInfo.zipCode}
                  onChange={(e) => setBillingInfo({ ...billingInfo, zipCode: e.target.value })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Pago</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Suscripción mensual</span>
              <span>${plan.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Impuestos</span>
              <span>${calculateTax(plan.price).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Se cobrará automáticamente cada mes</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Puedes cancelar en cualquier momento</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Payment Button */}
      <Button 
        onClick={processPayment}
        disabled={isProcessing}
        className="w-full h-12 text-lg"
        size="lg"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Procesando pago...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Suscribirse por ${total.toFixed(2)}/mes
          </>
        )}
      </Button>

      {/* Security Notice */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Shield className="w-3 h-3" />
        <span>Transacción segura y encriptada</span>
      </div>
    </div>
  );
};

export default PaymentProcessor;