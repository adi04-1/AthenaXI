import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTeamsBySeason(seasonId: string) { return this.http.get<any[]>(`${this.api}/teams/season/${seasonId}`); }
  getMyTeam(seasonId: string) { return this.http.get<any>(`${this.api}/teams/my/${seasonId}`); }
  getTeamById(id: string) { return this.http.get<any>(`${this.api}/teams/${id}`); }
  createTeam(body: any) { return this.http.post<any>(`${this.api}/teams`, body); }
  updateTeam(id: string, body: any) { return this.http.put<any>(`${this.api}/teams/${id}`, body); }
  getCredentials(teamId: string) { return this.http.get<any>(`${this.api}/teams/${teamId}/credentials`); }
  uploadRetentions(body: any) { return this.http.post<any>(`${this.api}/teams/retentions`, body); }
  deleteRetention(id: string) { return this.http.delete<any>(`${this.api}/teams/retentions/${id}`); }
}
