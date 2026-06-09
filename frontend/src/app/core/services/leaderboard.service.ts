import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LeaderboardService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getLeaderboard(seasonId: string) { return this.http.get<any[]>(`${this.api}/leaderboard/${seasonId}`); }
  getTeamBreakdown(seasonId: string, teamId: string) {
    return this.http.get<any>(`${this.api}/leaderboard/${seasonId}/team/${teamId}`);
  }
  overridePoints(body: any) { return this.http.post<any>(`${this.api}/leaderboard/points/override`, body); }
}
