"use client";

import { ComponentPropsWithRef, ReactNode, useTransition } from "react";
import { Button } from "./ui/button";
import { actionToast } from "./ui/sonner";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";

export function ActionButton({
  action,
  requireAreYouSure = false,
  children,
  ...props
}: Omit<ComponentPropsWithRef<typeof Button>, "onClick"> & {
  action: () => Promise<{ error: boolean; message: string }>;
  requireAreYouSure?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function performAction() {
    startTransition(async () => {
      const data = await action();
      actionToast({ actionData: data });
    });
  }

  if (requireAreYouSure) {
    return (
      <AlertDialog open={isPending ? true : undefined}>
        <AlertDialogTrigger asChild>
          <Button {...props}>{children}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={performAction}>
              <LoadingTextSwap isLoading={isPending}>Yes</LoadingTextSwap>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Button {...props} disabled={isPending} onClick={performAction}>
      <LoadingTextSwap isLoading={isPending}>
        {children}
      </LoadingTextSwap>
    </Button>
  );
}

function LoadingTextSwap({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid items-center justify-items-center">
      <div
        className={cn(
          "col-start-1 row-start-1",
          isLoading ? "invisible" : "visible"
        )}
      >
        {children}
      </div>
      {isLoading && (
        <div className="col-start-1 row-start-1">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </div>
  );
}