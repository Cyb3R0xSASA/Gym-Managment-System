import { toast } from "sonner";
export function showError(message = "حدث خطأ ما!", options) {
  toast.error(message, options);
}
export function showSuccess(message = "تم بنجاح!", options) {
  toast.success(message, options);
}
export function showInfo(message = "معلومات", options) {
  toast(message, options);
}
export function showWarning(message = "تنبيه!", options) {
  toast.warning(message, options);
}
