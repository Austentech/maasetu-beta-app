"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NoticeDialogProps {
  /** Interactive element that opens the dialog (button or link). */
  trigger: React.ReactElement;
  title: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * Accessible in-page notice dialog used for the login entry points and
 * legal placeholders. The sandbox/Phase-1 constraint is a single public
 * route, so these honest notices replace dedicated pages.
 */
export function NoticeDialog({
  trigger,
  title,
  description,
  children,
}: NoticeDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl border-line bg-popover p-6 sm:max-w-lg sm:p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl leading-snug font-medium tracking-tight text-ink">
            {title}
          </DialogTitle>
          {description ? (
            <DialogDescription className="text-base text-ink-soft">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>
        <div className="space-y-4 text-[15px] leading-relaxed text-ink-soft">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
