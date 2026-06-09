import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private api = environment.apiUrl;
  unreadCount = signal(0);

  constructor(private http: HttpClient) {}

  getMyNotifications() {
    return this.http.get<any[]>(`${this.api}/notifications/my`);
  }

  markRead(id: string) {
    return this.http.put<any>(`${this.api}/notifications/${id}/read`, {});
  }

  markAllRead() {
    return this.http.put<any>(`${this.api}/notifications/read-all`, {});
  }

  sendNotification(body: any) {
    return this.http.post<any>(`${this.api}/notifications/send`, body);
  }

  refreshUnreadCount() {
    return this.http.get<{ count: number }>(`${this.api}/notifications/unread-count`)
      .pipe(tap(r => this.unreadCount.set(r.count)));
  }
}
