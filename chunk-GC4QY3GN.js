import {
  HttpClient,
  environment
} from "./chunk-STS7VQLQ.js";
import {
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6BYAOC4F.js";

// src/app/core/services/notification.service.ts
var NotificationService = class _NotificationService {
  constructor(http) {
    this.http = http;
    this.api = environment.apiUrl;
    this.unreadCount = signal(0);
  }
  getMyNotifications() {
    return this.http.get(`${this.api}/notifications/my`);
  }
  markRead(id) {
    return this.http.put(`${this.api}/notifications/${id}/read`, {});
  }
  markAllRead() {
    return this.http.put(`${this.api}/notifications/read-all`, {});
  }
  sendNotification(body) {
    return this.http.post(`${this.api}/notifications/send`, body);
  }
  refreshUnreadCount() {
    return this.http.get(`${this.api}/notifications/unread-count`).pipe(tap((r) => this.unreadCount.set(r.count)));
  }
  respondToAuctionInvite(inviteId, accept) {
    return this.http.post(`${this.api}/notifications/auction-invite/respond`, { inviteId, accept });
  }
  static {
    this.\u0275fac = function NotificationService_Factory(t) {
      return new (t || _NotificationService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
  }
};

export {
  NotificationService
};
//# sourceMappingURL=chunk-GC4QY3GN.js.map
