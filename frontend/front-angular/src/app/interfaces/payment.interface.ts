export interface PaymentRequest {
  card: {
    number: string;
    expirationYear: string;
    expirationMonth: string;
    cvv: string;
  };
  buyer: {
    documentNumber: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  currency: string;
  baseAmount0: number;
  baseAmount12: number;
  installments: string;
  interests: string;
  gracePeriod: number;
  description: string;
  shippingAddress: {
    country: string;
    city: string;
    street: string;
    number: string;
  };
  clientIp: string;
  idEstablecimiento: string;
}
