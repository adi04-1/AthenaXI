import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll(filters?: { iplTeam?: string; role?: string; isOverseas?: boolean; search?: string }) {
    let params = new HttpParams();
    if (filters?.iplTeam)  params = params.set('iplTeam', filters.iplTeam);
    if (filters?.role)     params = params.set('role', filters.role);
    if (filters?.search)   params = params.set('search', filters.search);
    if (filters?.isOverseas !== undefined) params = params.set('isOverseas', String(filters.isOverseas));
    return this.http.get<any[]>(`${this.api}/players`, { params });
  }

  getById(id: string) { return this.http.get<any>(`${this.api}/players/${id}`); }
  uploadPlayers(rows: any[]) { return this.http.post<any>(`${this.api}/players/upload`, rows); }
  uploadAuctionOrder(seasonId: string, rows: any[]) {
    return this.http.post<any>(`${this.api}/players/auction-order/${seasonId}`, rows);
  }
  uploadDirectAllocation(seasonId: string, rows: any[]) {
    return this.http.post<any>(`${this.api}/players/direct-allocation/${seasonId}`, rows);
  }
}
