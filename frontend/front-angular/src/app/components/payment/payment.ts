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
      firstName: [''],
      lastName: [''],
      documentNumber: [''],
      phone: [''],
      email: [''],
      amount: [''],
      installments: ['0'],
      description: [''],
      country: ['Ecuador'],
      city: [''],
      street: [''],
      addressNumber: ['']
    });
  }

  submit(): void {
    const form = this.paymentForm.value;

    const body = {
      card: {
        number: String(form.cardNumber || '').replace(/\s/g, ''),
        expirationYear: String(form.expYear || ''),
        expirationMonth: String(form.expMonth || ''),
        cvv: String(form.cvv || '')
      },
      buyer: {
        documentNumber: String(form.documentNumber || ''),
        firstName: String(form.firstName || ''),
        lastName: String(form.lastName || ''),
        phone: String(form.phone || ''),
        email: String(form.email || '')
      },
      currency: 'USD',
      baseAmount0: 0,
      baseAmount12: Number(form.amount || 0),
      installments: String(form.installments || '0'),
      interests: String(form.interests ?? '0'),
      gracePeriod: 0,
      description: String(form.description || ''),
      shippingAddress: {
        country: String(form.country || ''),
        city: String(form.city || ''),
        street: String(form.street || ''),
        number: String(form.addressNumber || '')
      },
      clientIp: '0.0.0.0',
      idEstablecimiento: 'MTAwOA=='
    };

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
