import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastAction
} from './toast';

import { useToast } from '../hooks/useToast';
import styles from "../toast/toast.module.css";

function Toaster() {

  const { toasts } = useToast();

  return (
    <ToastProvider
    duration={5000} // Optional: set default duration for toast visibility
      delayDuration={100}
    >
      {
        toasts.map(function ({ id, title, description, children, ...props }) {
          return (
            (<Toast className={styles.Root} key={id} {...props}>
              {/* <div className="grid gap-1"> */}
              <div className="">
                {title && <ToastTitle className={styles.Title} >{title}</ToastTitle>}
                {description && (
                  <ToastDescription className={styles.Description}>{description}</ToastDescription>
                )}
              </div>
              {children && (
                <ToastAction className={styles.Action} asChild>{children}</ToastAction>
              )}
              <ToastClose aria-label="Close" className={styles.Close} />
            </Toast>)
          );
        })
      }
      <ToastViewport className={styles.Viewport} />
    </ToastProvider>
  )
}

export default Toaster;