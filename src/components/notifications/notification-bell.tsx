"use client";

import { Bell, Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useNotifications } from "@/hooks/use-notifications";
import { NotificationItem } from "./notification-item";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export function NotificationBell() {
  const { data: session, isPending } = authClient.useSession();

  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
  } = useNotifications(!isPending && !!session);

  if (isPending || !session) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative size-9 rounded-lg"
          aria-label={`Notifications, ${unreadCount} unread`}
        >
          <Bell className="size-4" />

          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-[360px] max-w-[calc(100vw-24px)] rounded-xl border-border bg-popover p-0 text-popover-foreground shadow-xl"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold">
              Notifications
            </h3>

            <p className="text-xs text-muted-foreground">
              {unreadCount} unread
            </p>
          </div>

          <Bell className="size-4 text-muted-foreground" />
        </div>

        <ScrollArea className="h-[320px]">
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center gap-2 text-muted-foreground">
              <Bell className="size-7 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => {
                    if (!notification.isRead) {
                      void markAsRead(notification.id);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="border-t px-4 py-3">
          <p className="text-center text-xs text-muted-foreground">
            You're all caught up when everything is read.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}