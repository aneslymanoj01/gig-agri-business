import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DeliveryTeamRequest {
  name: string;
  userName: string;
  email: string;
  phone: string;
  vehicleType: string;
  licenseNumber: string;
  vehicleNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface DeliveryTeamUpdateRequest {
  name: string;
  userName: string;
  email: string;
  phone: string;
  vehicleType: string;
  licenseNumber: string;
  vehicleNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface DeliveryTeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  licenseNumber: string;
  vehicleNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  status: string;
}

export interface DeliveryTeamResponse {
  resultCode: number;
  resultDescription: string;
  data: {
    id: number;
    name: string;
    email: string;
    phone: string;
    vehicleType: string;
    licenseNumber: string;
    vehicleNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface DeliveryTeamSearchResponse {
  resultCode: number;
  resultDescription: string;
  data: {
    content: DeliveryTeamMember[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
}

export interface UsernameCheckResponse {
  resultCode: number;
  resultDescription: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryTeamService {
  private baseUrl = 'http://localhost:8182/pohoro-master-service/master/delivery-team';

  constructor(private http: HttpClient) {}

  createTeamMember(teamMember: DeliveryTeamRequest): Observable<DeliveryTeamResponse> {
    return this.http.post<DeliveryTeamResponse>(this.baseUrl, teamMember);
  }

  getTeamMemberById(id: number): Observable<DeliveryTeamResponse> {
    return this.http.get<DeliveryTeamResponse>(`${this.baseUrl}/${id}`);
  }

  updateTeamMember(id: number, teamMember: DeliveryTeamUpdateRequest): Observable<DeliveryTeamResponse> {
    return this.http.put<DeliveryTeamResponse>(`${this.baseUrl}/${id}`, teamMember);
  }

  searchDeliveryTeam(params: any): Observable<DeliveryTeamSearchResponse> {
    let httpParams = new HttpParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });

    return this.http.get<DeliveryTeamSearchResponse>(this.baseUrl, { params: httpParams });
  }

  checkUsername(username: string): Observable<UsernameCheckResponse> {
    return this.http.get<UsernameCheckResponse>(`http://localhost:8180/pohoro-auth-service/auth/check-user-name/${username}`);
  }
}
