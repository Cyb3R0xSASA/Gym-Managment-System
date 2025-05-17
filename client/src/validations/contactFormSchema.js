import * as Yub from "yup";
const contactFormSchema = Yub.object({
  name: Yub.string()
    .required("الاسم مطلوب")
    .min(2, "الاسم يجب أن يكون على الأقل حرفين")
    .max(50, "الاسم يجب أن لا يتجاوز 50 حرف"),
  email: Yub.string().email("البريد الإلكتروني غير صالح"),
  phone: Yub.string()
    .matches(
      /^(01)[0-2,5]{1}[0-9]{8}$/,
      "رقم الهاتف غير صالح - يجب أن يكون رقم مصري"
    )
    .required("رقم الهاتف مطلوب"),
  message: Yub.string()
    .required("الرسالة مطلوبة")
    .min(10, "الرسالة يجب أن تكون على الأقل 10 أحرف")
    .max(500, "الرسالة يجب أن لا تتجاوز 500 حرف"),
});
export default contactFormSchema;
