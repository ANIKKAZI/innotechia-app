import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../shared/header';
import { AppState } from '../services/app-state';
import { ApiService as ApiServiceModel, ApiService } from '../services/api.service';

@Component({
  selector: 'app-services',
  imports: [Header],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements OnInit {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  readonly state = inject(AppState);

  // -- State
  readonly PAGE_SIZE = 12;
  readonly allServices = signal<ApiServiceModel[]>([]);
  readonly currentPage = signal(1);
  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.allServices().length / this.PAGE_SIZE))
  );

  readonly pagedServices = computed(() => {
    const start = (this.currentPage() - 1) * this.PAGE_SIZE;
    return this.allServices().slice(start, start + this.PAGE_SIZE);
  });

  readonly pageNumbers = computed(() => {
    const total = this.totalPages();
    const cur = this.currentPage();
    const pages: number[] = [];
    const delta = 2;
    for (let i = Math.max(1, cur - delta); i <= Math.min(total, cur + delta); i++) {
      pages.push(i);
    }
    return pages;
  });

  readonly pageStart = computed(() =>
    this.allServices().length === 0 ? 0 : (this.currentPage() - 1) * this.PAGE_SIZE + 1
  );

  readonly pageEnd = computed(() =>
    Math.min(this.currentPage() * this.PAGE_SIZE, this.allServices().length)
  );

  // -- Icons
  readonly iconPaths: string[] = [
    'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99',
    'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
    'M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z',
    'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z',
    'M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3',
    'M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10',
    'M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z',
    'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
    'M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z',
    'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
  ];

  getIcon(index: number): string {
    return this.iconPaths[index % this.iconPaths.length];
  }

  // -- Lifecycle
  ngOnInit() {
    this.api.getAllServices().subscribe({
      next: (data) => {
        this.allServices.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.loadError.set(err.message ?? 'Failed to load services');
        this.loading.set(false);
      },
    });
  }

  // -- Helpers
  getCategoryName(service: ApiServiceModel): string {
    const c = service.categoryId;
    return c && typeof c === 'object' ? (c as { _id: string; name: string }).name : '';
  }

  getBusinessName(service: ApiServiceModel): string {
    const b = service.businessId;
    return b && typeof b === 'object' ? (b as { _id: string; name: string }).name : '';
  }

  // -- Pagination
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // -- Actions
  openService(service: ApiServiceModel) {
    this.state.selectedService.set(service);
    this.router.navigate(['/detail', service._id]);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
