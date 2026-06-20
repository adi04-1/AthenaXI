import {
  HttpClient,
  environment
} from "./chunk-STS7VQLQ.js";
import {
  __spreadValues,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6BYAOC4F.js";

// src/app/core/services/season.service.ts
var SeasonService = class _SeasonService {
  constructor(http) {
    this.http = http;
    this.api = environment.apiUrl;
    this.activeSeason = signal(null);
  }
  getAll() {
    return this.http.get(`${this.api}/seasons`);
  }
  getById(id) {
    return this.http.get(`${this.api}/seasons/${id}`);
  }
  create(body) {
    return this.http.post(`${this.api}/seasons`, body);
  }
  updateConfig(id, body) {
    return this.http.put(`${this.api}/seasons/${id}/config`, body);
  }
  updateStatus(id, status, dates) {
    return this.http.put(`${this.api}/seasons/${id}/status`, __spreadValues({ status }, dates));
  }
  delete(id) {
    return this.http.delete(`${this.api}/seasons/${id}`);
  }
  getActive() {
    return this.http.get(`${this.api}/seasons/active`).pipe(tap((s) => this.activeSeason.set(s)));
  }
  loadAndCacheActive() {
    this.getActive().subscribe({ next: () => {
    }, error: () => {
    } });
  }
  static {
    this.\u0275fac = function SeasonService_Factory(t) {
      return new (t || _SeasonService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SeasonService, factory: _SeasonService.\u0275fac, providedIn: "root" });
  }
};

export {
  SeasonService
};
//# sourceMappingURL=chunk-V7UAWJAK.js.map
