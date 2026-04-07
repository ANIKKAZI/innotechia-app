import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../shared/header';
import { AppState } from '../services/app-state';
import { ApiService, ApiService as ApiServiceModel } from '../services/api.service';

@Component({
  selector: 'app-detail',
  imports: [Header, FormsModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail implements OnInit {
  private readonly route  = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api    = inject(ApiService);
  readonly state          = inject(AppState);

  readonly service        = signal<ApiServiceModel | null>(null);
  readonly loading        = signal(true);
  readonly submitting     = signal(false);
  readonly submitError    = signal<string | null>(null);
  readonly showSuccess    = signal(false);
  readonly guestEmail     = signal('');
  readonly emailError     = signal(false);
  readonly submittedEmail = signal('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/dashboard']); return; }

    const cached = this.state.selectedService();
    if (cached && cached._id === id) {
      this.service.set(cached);
      this.loading.set(false);
      return;
    }

    this.api.getServiceById(id).subscribe({
      next: (svc) => { this.service.set(svc); this.loading.set(false); },
      error: () => this.router.navigate(['/dashboard']),
    });
  }

  get benefitsList(): string[] {
    const svc = this.service();
    if (!svc?.benefits) return [];
    return svc.benefits.split(',').map((b) => b.trim()).filter(Boolean);
  }

  contactUs() {
    const svc   = this.service();
    const email = this.state.userEmail();
    if (!svc || !email) return;

    this.submitting.set(true);
    this.submitError.set(null);

    this.api.submitInquiry(svc._id, email, false).subscribe({
      next: () => {
        this.submittedEmail.set(email);
        this.submitting.set(false);
        this.showSuccess.set(true);
      },
      error: (err) => {
        this.submitting.set(false);
        this.submitError.set(err.error?.error ?? 'Something went wrong. Please try again.');
      },
    });
  }

  connectAsGuest() {
    const email = this.guestEmail().trim();
    if (!email || !this.isValidEmail(email)) {
      this.emailError.set(true);
      return;
    }

    const svc = this.service();
    if (!svc) return;

    this.submitting.set(true);
    this.submitError.set(null);

    this.api.submitInquiry(svc._id, email, true).subscribe({
      next: () => {
        this.submittedEmail.set(email);
        this.submitting.set(false);
        this.showSuccess.set(true);
      },
      error: (err) => {
        this.submitting.set(false);
        this.submitError.set(err.error?.error ?? 'Something went wrong. Please try again.');
      },
    });
  }

  clearError() {
    this.emailError.set(false);
    this.submitError.set(null);
  }

  returnToDashboard() {
    this.state.selectedService.set(null);
    this.router.navigate(['/dashboard']);
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
