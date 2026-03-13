import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
  standalone: true,
})
export class Payment {
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: [''],
      expMonth: [''],
      expYear: [''],
      cvv: [''],
      clientName: [''],
      email: [''],
      amount: [''],
      installments: ['0'],
      description: ['']
    });
  }

  submit(): void {
    const form = this.paymentForm.value;

    const body = {
      card: {
        number: String(form.cardNumber || '').replace(/\s/g, ''),
        expirationMonth: String(form.expMonth || ''),
        expirationYear: String(form.expYear || ''),
        cvv: String(form.cvv || '')
      },
      buyer: {
        name: String(form.clientName || ''),
        email: String(form.email || '')
      },
      currency: 'USD',
      baseAmount0: 0,
      baseAmount12: Number(form.amount || 0),
      installments: Number(form.installments || 0),
      interests: false,
      description: String(form.description || ''),
      clientIp: '0.0.0.0',
      idEstablecimiento: 'ID_ESTABLECIMIENTO',
      urlRetorno3ds: 'https://urlServicioComercio.com/'
    };

    console.log(body);

    this.paymentService.createPayment(body).subscribe({
      next: (response: any) => {
        console.log( response);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
