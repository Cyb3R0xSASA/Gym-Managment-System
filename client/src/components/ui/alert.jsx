import { toast } from "sonner";
export function showError(message = "حدث خطأ ما!") {
  toast.error(message);
}
export function showSuccess(message = "تم بنجاح!"){
  toast.success(message);
}
export function showInfo(message = "معلومات") {
  toast(message);
}
export function showWarning(message = "تنبيه!") {
  toast.warning(message);
}
