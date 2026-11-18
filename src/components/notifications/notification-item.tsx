"use client";

import { BellRing } from "lucide-react";
import type { Notification } from "@/types/notification";

type NotificationItemProps = {
  notification: Notification;
  onClick: () => void;
};

export function NotificationItem({
  notification,
  onClick,
}: NotificationItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-accent"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <BellRing className="size-4 text-primary" />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={`text-sm ${
              notification.isRead
                ? "font-medium text-muted-foreground"
                : "font-semibold text-foreground"
            }`}
          >
            {notification.title}
          </p>

          {!notification.isRead && (
            <span className="size-2 shrink-0 rounded-full bg-primary" />
          )}
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          {notification.message}
        </p>

        <p className="text-[11px] text-muted-foreground/70">
          {new Date(notification.createdAt).toLocaleString()}
        </p>
      </div>
    </button>
  );
}