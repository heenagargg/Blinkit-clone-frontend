import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast"
import clsx from "clsx";
import styles from "./toast.module.css";
// import Icon from "../Icon";
import { RxCross2 } from "react-icons/rx";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={className}
    {...props} />
))

ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

// const toastVariants

const toastVariants = ({ variant }) => {
  switch (variant) {
    case 'success':
      return `${styles.toastBase} ${styles.success}`;
    case 'error':
      return `${styles.toastBase} ${styles.error}`;
    case 'info':
      return `${styles.toastBase} ${styles.info}`;
    case 'warning':
      return `${styles.toastBase} ${styles.warning}`;
    default:
      return `${styles.toastBase}`; // Default base class if no variant is passed
  }
};

const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    (<ToastPrimitives.Root
      ref={ref}
      // className={cn(toastVariants({ variant }), className)}
      // className={className}
      className={clsx(toastVariants({ variant }), className)}
      {...props} />)
  );
})

Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={className}
    {...props} />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={className}
    toast-close=""
    {...props}>
    {/* <X className="h-4 w-4" /> */}
    <span aria-hidden>
      {/* <Icon value="x-mark" size="tiny" /> */}
      <RxCross2 value="x-mark" size={14} color="white" />
    </span>
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName;


const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={className} {...props} />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={className} {...props} />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName


export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };