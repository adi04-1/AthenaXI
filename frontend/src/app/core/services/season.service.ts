import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SeasonService {
  private api = environment.apiUrl;

  // Active season cached globally so components don't each fetch it
  activeSeason = signal<any>(null);

  constructor(private http: HttpClient) {}

  getAll()        { return this.http.get<any[]>(`${this.api}/seasons`); }
  getById(id: string) { return this.http.get<any>(`${this.api}/seasons/${id}`); }
  create(body: any)   { return this.http.post<any>(`${this.api}/seasons`, body); }
  updateConfig(id: string, body: any) { return this.http.put<any>(`${this.api}/seasons/${id}/config`, body); }
  updateStatus(id: string, status: string, dates?: { auctionDate?: string; seasonStartDate?: string; seasonEndDate?: string }) {
    return this.http.put<any>(`${this.api}/seasons/${id}/status`, { status, ...dates });
  }
  delete(id: string)  { return this.http.delete<any>(`${this.api}/seasons/${id}`); }

  getActive() {
    return this.http.get<any>(`${this.api}/seasons/active`)
      .pipe(tap(s => this.activeSeason.set(s)));
  }

  loadAndCacheActive() {
    this.getActive().subscribe({ next: () => {}, error: () => {} });
  }
}
