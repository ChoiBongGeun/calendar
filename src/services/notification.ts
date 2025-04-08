'use client';

import { TodoItem } from '@/types/todo';

class NotificationService {
  private static instance: NotificationService;
  private notifications: Map<number, NodeJS.Timeout>;

  private constructor() {
    this.notifications = new Map();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private convertMarkdownToText(content: string): string {
    return content
      .replace(/^#+\s+/gm, '') // 제목 제거
      .replace(/`([^`]+)`/g, '$1') // 인라인 코드 제거
      .replace(/```[\s\S]*?```/g, '') // 코드 블록 제거
      .replace(/\*\*([^*]+)\*\*/g, '$1') // 굵은 글씨 제거
      .replace(/\*([^*]+)\*/g, '$1') // 기울임 제거
      .replace(/~~([^~]+)~~/g, '$1') // 취소선 제거
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 링크 제거
      .replace(/>\s*(.+)/g, '$1') // 인용문 제거
      .replace(/\n\s*[-*+]\s/g, '\n• ') // 목록 기호 통일
      .replace(/\n\s*\d+\.\s/g, '\n• ') // 번호 목록 기호 통일
      .trim();
  }

  private showNotification(todo: TodoItem): void {
    if (!('Notification' in window)) {
      console.log('이 브라우저는 알림을 지원하지 않습니다.');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(todo.title, {
        body: todo.content ? this.convertMarkdownToText(todo.content) : '할일이 있습니다.',
        icon: '/favicon.ico',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(todo.title, {
            body: todo.content ? this.convertMarkdownToText(todo.content) : '할일이 있습니다.',
            icon: '/favicon.ico',
          });
        }
      });
    }
  }

  public scheduleNotification(todo: TodoItem): void {
    if (!todo.time || !todo.notification) return;

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

    if (notificationTime < now) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    const delay = notificationTime.getTime() - now.getTime();
    
    const timeout = setTimeout(() => {
      this.showNotification(todo);
    }, delay);

    this.notifications.set(todo.id, timeout);
  }

  public cancelNotification(id: number): void {
    const timeout = this.notifications.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.notifications.delete(id);
    }
  }
}

export const notificationService = NotificationService.getInstance(); 