import { Injectable, inject, signal, computed } from '@angular/core';
import { ApiService, ApiBusiness, ApiCategory, ApiService as ApiServiceModel } from './api.service';

export type { ApiService as ApiServiceModel };

@Injectable({
  providedIn: 'root',
})
export class AppState {
  private readonly api = inject(ApiService);

  // ── Auth ────────────────────────────────────────────────────────────────────
  readonly isGuest    = signal(false);
  readonly userEmail  = signal('');
  readonly userName   = signal('');
  readonly userAvatar = signal('');
  readonly isLoggedIn = computed(() => this.userEmail() !== '');

  loginWithGoogle(email: string, name: string, avatar = '') {
    this.isGuest.set(false);
    this.userEmail.set(email);
    this.userName.set(name);
    this.userAvatar.set(avatar);
  }

  loginAsGuest() {
    this.isGuest.set(true);
    this.userEmail.set('');
  }

  logout() {
    this.isGuest.set(false);
    this.userEmail.set('');
    this.userName.set('');
    this.userAvatar.set('');
    this.businesses.set([]);
    this.categories.set([]);
    this.services.set([]);
    this.activeBusiness.set(null);
    this.activeCategory.set(null);
    this.selectedService.set(null);
  }

  // ── Data ────────────────────────────────────────────────────────────────────
  readonly businesses   = signal<ApiBusiness[]>([]);
  readonly categories   = signal<ApiCategory[]>([]);
  readonly services     = signal<ApiServiceModel[]>([]);
  readonly loading      = signal(false);
  readonly loadError    = signal<string | null>(null);

  readonly activeBusiness  = signal<ApiBusiness | null>(null);
  readonly activeCategory  = signal<ApiCategory | null>(null);
  readonly selectedService = signal<ApiServiceModel | null>(null);

  // ── Loaders ─────────────────────────────────────────────────────────────────

  loadBusinesses() {
    this.loading.set(true);
    this.loadError.set(null);
    this.api.getBusinesses().subscribe({
      next: (data) => {
        this.businesses.set(data);
        if (data.length > 0) this.loadCategoriesForBusiness(data[0]);
        this.loading.set(false);
      },
      error: (err) => {
        this.loadError.set(err.message ?? 'Failed to load businesses');
        this.loading.set(false);
      },
    });
  }

  loadCategoriesForBusiness(business: ApiBusiness) {
    this.activeBusiness.set(business);
    this.activeCategory.set(null);
    this.services.set([]);
    this.loading.set(true);
    this.api.getCategoriesByBusiness(business._id).subscribe({
      next: (data) => {
        this.categories.set(data);
        if (data.length > 0) this.loadServicesForCategory(data[0]);
        this.loading.set(false);
      },
      error: (err) => {
        this.loadError.set(err.message ?? 'Failed to load categories');
        this.loading.set(false);
      },
    });
  }

  loadServicesForCategory(category: ApiCategory) {
    this.activeCategory.set(category);
    this.loading.set(true);
    this.api.getServicesByCategory(category._id).subscribe({
      next: (data) => {
        this.services.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.loadError.set(err.message ?? 'Failed to load services');
        this.loading.set(false);
      },
    });
  }
}
