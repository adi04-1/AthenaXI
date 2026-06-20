import {
  HttpClient,
  environment
} from "./chunk-STS7VQLQ.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6BYAOC4F.js";

// src/app/core/services/auction.service.ts
var AuctionService = class _AuctionService {
  constructor(http) {
    this.http = http;
    this.api = environment.apiUrl;
  }
  getSession(seasonId) {
    return this.http.get(`${this.api}/auction/session/${seasonId}`);
  }
  getSessionAny(seasonId) {
    return this.http.get(`${this.api}/auction/session-any/${seasonId}`);
  }
  getStandings(seasonId) {
    return this.http.get(`${this.api}/auction/standings/${seasonId}`);
  }
  getBids(slotId) {
    return this.http.get(`${this.api}/auction/bids/${slotId}`);
  }
  getResults(sessionId) {
    return this.http.get(`${this.api}/auction/results/${sessionId}`);
  }
  startAuction(sessionId) {
    return this.http.post(`${this.api}/auction/${sessionId}/start`, {});
  }
  placeBid(body) {
    return this.http.post(`${this.api}/auction/bid`, body);
  }
  markSold(body) {
    return this.http.post(`${this.api}/auction/sold`, body);
  }
  markUnsold(body) {
    return this.http.post(`${this.api}/auction/unsold`, body);
  }
  recallUnsold(slotId) {
    return this.http.post(`${this.api}/auction/recall-unsold/${slotId}`, {});
  }
  adminCorrect(body) {
    return this.http.post(`${this.api}/auction/admin-correct`, body);
  }
  completeAuction(sessionId) {
    return this.http.post(`${this.api}/auction/${sessionId}/complete`, {});
  }
  sendInvites(sessionId) {
    return this.http.post(`${this.api}/auction/${sessionId}/send-invites`, {});
  }
  getLobby(sessionId) {
    return this.http.get(`${this.api}/auction/${sessionId}/lobby`);
  }
  getSets(sessionId) {
    return this.http.get(`${this.api}/auction/${sessionId}/sets`);
  }
  shuffleSet(sessionId, auctionSet) {
    return this.http.post(`${this.api}/auction/${sessionId}/shuffle-set`, { auctionSet });
  }
  respondToInvite(body) {
    return this.http.post(`${this.api}/auction/invite/respond`, body);
  }
  getMyInvite(seasonId) {
    return this.http.get(`${this.api}/auction/my-invite/${seasonId}`);
  }
  static {
    this.\u0275fac = function AuctionService_Factory(t) {
      return new (t || _AuctionService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuctionService, factory: _AuctionService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuctionService
};
//# sourceMappingURL=chunk-HGMYO4ZI.js.map
