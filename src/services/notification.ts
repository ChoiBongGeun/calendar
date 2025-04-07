'use client';

import { TodoItem } from '@/atoms/todo';

class NotificationService {
  private static instance: NotificationService;
  private notifications: Map<number, NodeJS.Timeout> = new Map();
  private permission: NotificationPermission = 'default';
  private lastNotificationTime: number = 0;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.requestPermission();
    }
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async requestPermission() {
    try {
      this.permission = await Notification.requestPermission();
    } catch (error) {
      console.error('알림 권한 요청 실패:', error);
    }
  }

  scheduleNotification(todo: TodoItem) {
    if (!todo.time || !todo.notification) return;

    // 이미 예약된 알림이 있다면 취소
    this.cancelNotification(todo.id);

    const [hours, minutes] = todo.time.split(':').map(Number);
    const now = new Date();
    const notificationTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    // 이미 지난 시간이라면 다음 날로 설정
    if (notificationTime < now) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    const delay = notificationTime.getTime() - now.getTime();
    
    const timeout = setTimeout(() => {
      this.showNotification(todo);
    }, delay);

    this.notifications.set(timeout);
  }

  cancelNotification(todoId: number) {
    const timeout = this.notifications.get(todoId);
    if (timeout) {
      clearTimeout(timeout);
      this.notifications.delete(todoId);
    }
  }

  public async showNotification(todo: TodoItem) {
    if (this.permission !== 'granted') {
      await this.requestPermission();
    }

    // 1초 이내에 같은 알림이 오는 것을 방지
    const now = Date.now();
    if (now - this.lastNotificationTime < 1000) {
      return;
    }
    this.lastNotificationTime = now;

    if (this.permission === 'granted') {
      const notification = new Notification(todo.title, {
        body: todo.content || `${todo.time}에 할 일이 있습니다.`,
        icon: '/favicon.ico',
        badge: '/notification-badge.png',
        requireInteraction: true,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }
}

export const notificationService = NotificationService.getInstance(); 