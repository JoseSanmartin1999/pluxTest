import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentRequest } from '../interfaces/payment.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly apiUrl = 'http://localhost:3000/api/payments/charge';

  constructor(private http: HttpClient) {}

  createPayment(body: PaymentRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, body);
  }
}
