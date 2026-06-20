import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuctionService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getSession(seasonId: string) { return this.http.get<any>(`${this.api}/auction/session/${seasonId}`); }
  getSessionAny(seasonId: string) { return this.http.get<any>(`${this.api}/auction/session-any/${seasonId}`); }
  getStandings(seasonId: string) { return this.http.get<any[]>(`${this.api}/auction/standings/${seasonId}`); }
  getBids(slotId: string) { return this.http.get<any[]>(`${this.api}/auction/bids/${slotId}`); }
  getResults(sessionId: string) { return this.http.get<any[]>(`${this.api}/auction/results/${sessionId}`); }
  startAuction(sessionId: string) { return this.http.post<any>(`${this.api}/auction/${sessionId}/start`, {}); }
  placeBid(body: { auctionSessionId: string; auctionPlayerSlotId: string; amountCr: number; isRtm?: boolean; teamUserId?: string }) {
    return this.http.post<any>(`${this.api}/auction/bid`, body);
  }
  markSold(body: any) { return this.http.post<any>(`${this.api}/auction/sold`, body); }
  markUnsold(body: any) { return this.http.post<any>(`${this.api}/auction/unsold`, body); }
  recallUnsold(slotId: string) { return this.http.post<any>(`${this.api}/auction/recall-unsold/${slotId}`, {}); }
  adminCorrect(body: any) { return this.http.post<any>(`${this.api}/auction/admin-correct`, body); }
  completeAuction(sessionId: string) { return this.http.post<any>(`${this.api}/auction/${sessionId}/complete`, {}); }
  sendInvites(sessionId: string) { return this.http.post<any>(`${this.api}/auction/${sessionId}/send-invites`, {}); }
  getLobby(sessionId: string) { return this.http.get<any>(`${this.api}/auction/${sessionId}/lobby`); }
  getSets(sessionId: string) { return this.http.get<any[]>(`${this.api}/auction/${sessionId}/sets`); }
  shuffleSet(sessionId: string, auctionSet: string) {
    return this.http.post<any>(`${this.api}/auction/${sessionId}/shuffle-set`, { auctionSet });
  }
  respondToInvite(body: { inviteId: string; accept: boolean }) { return this.http.post<any>(`${this.api}/auction/invite/respond`, body); }
  getMyInvite(seasonId: string) { return this.http.get<any>(`${this.api}/auction/my-invite/${seasonId}`); }
}
