import {
  HttpClient,
  environment
} from "./chunk-STS7VQLQ.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6BYAOC4F.js";

// src/app/core/services/team.service.ts
var TeamService = class _TeamService {
  constructor(http) {
    this.http = http;
    this.api = environment.apiUrl;
  }
  getTeamsBySeason(seasonId) {
    return this.http.get(`${this.api}/teams/season/${seasonId}`);
  }
  getMyTeam(seasonId) {
    return this.http.get(`${this.api}/teams/my/${seasonId}`);
  }
  getTeamById(id) {
    return this.http.get(`${this.api}/teams/${id}`);
  }
  createTeam(body) {
    return this.http.post(`${this.api}/teams`, body);
  }
  updateTeam(id, body) {
    return this.http.put(`${this.api}/teams/${id}`, body);
  }
  getCredentials(teamId) {
    return this.http.get(`${this.api}/teams/${teamId}/credentials`);
  }
  uploadRetentions(body) {
    return this.http.post(`${this.api}/teams/retentions`, body);
  }
  deleteRetention(id) {
    return this.http.delete(`${this.api}/teams/retentions/${id}`);
  }
  static {
    this.\u0275fac = function TeamService_Factory(t) {
      return new (t || _TeamService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TeamService, factory: _TeamService.\u0275fac, providedIn: "root" });
  }
};

export {
  TeamService
};
//# sourceMappingURL=chunk-OLMNDMN6.js.map
