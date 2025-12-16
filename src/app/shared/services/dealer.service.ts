import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DealerRequest {
  name: string;
  userName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  contactPerson: string;
  businessType: string;
}

export interface DealerResponse {
  resultCode: number;
  resultDescription: string;
  data?: {
    dealerId: number;
    name: string;
    email: string;
    username: string;
    temporaryPassword: string | null;
    distributorId: number | null;
    status: string;
  };
}

export interface SearchDealersResponse {
  resultCode: number;
  resultDescription: string;
  data: {
    dealers: any[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
}

export interface UsernameCheckResponse {
  errorCode: number;
  errorDescription?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  private readonly API_BASE = 'http://localhost:8183/pohoro-distributor-service/dealers';
  private readonly AUTH_API_BASE = 'http://localhost:8180/pohoro-auth-service/auth';

  constructor(private http: HttpClient) {}

  createDealer(dealer: DealerRequest): Observable<DealerResponse> {
    return this.http.post<DealerResponse>(`${this.API_BASE}/create`, dealer);
  }

  searchDealers(params: any): Observable<SearchDealersResponse> {
    let httpParams = new HttpParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });

    return this.http.get<SearchDealersResponse>(`${this.API_BASE}/search`, { params: httpParams });
  }

  updateDealer(dealerId: number, dealer: any): Observable<DealerResponse> {
    return this.http.put<DealerResponse>(`${this.API_BASE}/update/${dealerId}`, dealer);
  }

  checkUsername(userName: string): Observable<UsernameCheckResponse> {
    return this.http.get<UsernameCheckResponse>(`${this.AUTH_API_BASE}/check-user-name/${userName}`);
  }
}
