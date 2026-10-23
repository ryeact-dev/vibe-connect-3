import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const variant = props.variant as string | undefined;
        const Icon =
          variant === "success"
            ? CheckCircle2
            : variant === "destructive"
              ? AlertCircle
              : Info;
        const iconColor =
          variant === "success"
            ? "text-green-600"
            : variant === "destructive"
              ? "text-red-600"
              : "text-[#1B2A4A]";

        return (
          <Toast key={id} {...props}>
            <div className="flex items-start gap-3 flex-1">
              <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${iconColor}`} />
              <div className="grid gap-0.5 flex-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
