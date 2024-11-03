"use client"

import {
  Toast,
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

import {
  toast,
  useToast,
} from "@/components/ui/use-toast"

export type ToastActionProps = {
  altText: string
  action: ToastActionElement
}

export { type ToastProps, type ToastActionElement, toast, useToast }