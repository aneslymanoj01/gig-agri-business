import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DistributorRequest, DistributorResponse, UsernameCheckResponse, GetAllDistributorsResponse } from '../models/distributor.models';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {
  private readonly MASTER_API_BASE = 'http://localhost:8182/pohoro-master-service';
  private readonly AUTH_API_BASE = 'http://localhost:8180/pohoro-auth-service/auth';

  constructor(private http: HttpClient) {}

  createDistributor(distributor: DistributorRequest): Observable<DistributorResponse> {
    return this.http.post<DistributorResponse>(`${this.MASTER_API_BASE}/distributor/create`, distributor);
  }

  checkUsername(userName: string): Observable<UsernameCheckResponse> {
    return this.http.get<UsernameCheckResponse>(`${this.AUTH_API_BASE}/check-user-name/${userName}`);
  }

  getAllDistributors(page: number = 0, size: number = 10): Observable<GetAllDistributorsResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<GetAllDistributorsResponse>(`${this.MASTER_API_BASE}/distributor/all`, { params });
  }
}
