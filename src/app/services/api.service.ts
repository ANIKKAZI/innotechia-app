import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiBusiness {
  _id: string;
  name: string;
}

export interface ApiCategory {
  _id: string;
  name: string;
  businessId: string;
}

export interface ApiService {
  _id: string;
  serviceName: string;
  description: string;
  benefits: string;
  categoryId: { _id: string; name: string } | string;
  businessId: { _id: string; name: string } | string;
}

export interface ApiInquiry {
  _id: string;
  email: string;
  serviceName: string;
  businessName: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api';

  getBusinesses(): Observable<ApiBusiness[]> {
    return this.http.get<ApiBusiness[]>(`${this.base}/businesses`);
  }

  getCategoriesByBusiness(businessId: string): Observable<ApiCategory[]> {
    return this.http.get<ApiCategory[]>(`${this.base}/businesses/${businessId}/categories`);
  }

  getServicesByCategory(categoryId: string): Observable<ApiService[]> {
    return this.http.get<ApiService[]>(`${this.base}/categories/${categoryId}/services`);
  }

  getAllServices(): Observable<ApiService[]> {
    return this.http.get<ApiService[]>(`${this.base}/services`);
  }

  getServiceById(id: string): Observable<ApiService> {
    return this.http.get<ApiService>(`${this.base}/services/${id}`);
  }

  submitInquiry(serviceId: string, email: string, isGuest: boolean): Observable<ApiInquiry> {
    return this.http.post<ApiInquiry>(`${this.base}/inquiries`, { serviceId, email, isGuest });
  }
}
