import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuctionService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSession(seasonId: string) {
    return this.http.get<any>(`${this.api}/auction/session/${seasonId}`);
  }

  getStandings(seasonId: string) {
    return this.http.get<any[]>(`${this.api}/auction/standings/${seasonId}`);
  }

  getBids(slotId: string) {
    return this.http.get<any[]>(`${this.api}/auction/bids/${slotId}`);
  }

  startAuction(sessionId: string) {
    return this.http.post<any>(`${this.api}/auction/${sessionId}/start`, {});
  }

  placeBid(body: { auctionSessionId: string; auctionPlayerSlotId: string; amountCr: number; isRtm?: boolean }) {
    return this.http.post<any>(`${this.api}/auction/bid`, body);
  }

  markSold(body: any) {
    return this.http.post<any>(`${this.api}/auction/sold`, body);
  }

  markUnsold(body: any) {
    return this.http.post<any>(`${this.api}/auction/unsold`, body);
  }

  recallUnsold(slotId: string) {
    return this.http.post<any>(`${this.api}/auction/recall-unsold/${slotId}`, {});
  }

  completeAuction(sessionId: string) {
    return this.http.post<any>(`${this.api}/auction/${sessionId}/complete`, {});
  }

  getResults(sessionId: string) {
    return this.http.get<any[]>(`${this.api}/auction/results/${sessionId}`);
  }
}
