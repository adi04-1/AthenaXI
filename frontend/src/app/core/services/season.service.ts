import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SeasonService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll()                    { return this.http.get<any[]>(`${this.api}/seasons`); }
  getActive()                 { return this.http.get<any>(`${this.api}/seasons/active`); }
  getById(id: string)         { return this.http.get<any>(`${this.api}/seasons/${id}`); }
  create(body: any)           { return this.http.post<any>(`${this.api}/seasons`, body); }
  updateConfig(id: string, body: any) { return this.http.put<any>(`${this.api}/seasons/${id}/config`, body); }
  updateStatus(id: string, status: string) { return this.http.put<any>(`${this.api}/seasons/${id}/status`, { status }); }
  delete(id: string)          { return this.http.delete<any>(`${this.api}/seasons/${id}`); }
}
