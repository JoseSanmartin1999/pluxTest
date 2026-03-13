export interface PaymentRequest {
  card: {
    number: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
  };
  buyer: {
    name: string;
    email: string;
  };
  currency: string;
  baseAmount0: number;
  baseAmount12: number;
  installments: number;
  interests: boolean;
  description: string;
  clientIp: string;
  idEstablecimiento: string;
  urlRetorno3ds: string;
}
