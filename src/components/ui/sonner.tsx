"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, toast, ToasterProps } from "sonner"

// Action toast helper function
export function actionToast({
  actionData,
  ...props
}: Omit<ToasterProps, "title" | "description"> & {
  actionData: { error: boolean; message: string }
}) {
  return toast[actionData.error ? "error" : "success"](actionData.message, props)
}

type ToasterCustomProps = ToasterProps & {
  style?: React.CSSProperties
}

const Toaster = ({ ...props }: ToasterCustomProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive",
          success: "group-[.toaster]:bg-success group-[.toaster]:text-success-foreground group-[.toaster]:border-success",
          warning: "group-[.toaster]:bg-warning group-[.toaster]:text-warning-foreground group-[.toaster]:border-warning",
          info: "group-[.toaster]:bg-info group-[.toaster]:text-info-foreground group-[.toaster]:border-info",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }