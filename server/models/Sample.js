const mongoose = require('mongoose');
const { Schema } = mongoose;

/* --------------------------------------------------
    Users Collection
--------------------------------------------------- */
const UserSchema = new Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  phoneNumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['member', 'trainer', 'admin', "employee"], 
    required: true 
  },
  profilePicture: { 
    type: String, 
    default: null 
  },
  // للمستخدمين ذوي دور 'member'، سيتم تخزين معرف العضوية (Membership)
  membershipId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Membership', 
    default: null 
  }
}, { timestamps: true });  // يضيف حقول createdAt و updatedAt تلقائيًا

const User = mongoose.model('User', UserSchema);

/* --------------------------------------------------
    Memberships Collection
--------------------------------------------------- */
const MembershipSchema = new Schema({
  planName: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  duration: { 
    type: String, 
    enum: ['monthly', 'annually'],
    required: true 
  },
  features: [{
    type: String
  }]
}, { timestamps: true });

const Membership = mongoose.model('Membership', MembershipSchema);

/* --------------------------------------------------
    Classes Collection
--------------------------------------------------- */
const ClassSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  // يشير إلى مدرب موجود في مجموعة Users بحيث يكون دوره trainer
  trainer: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // يمكننا استخدام حقل مدمج لتحديد أوقات البدء والانتهاء
  schedule: {
    start: { 
      type: Date, 
      required: true 
    },
    end: { 
      type: Date, 
      required: true 
    }
  },
  capacity: { 
    type: Number, 
    required: true 
  },
  location: { 
    type: String, 
    required: false 
  }
}, { timestamps: true });

const Class = mongoose.model('Class', ClassSchema);

/* --------------------------------------------------
    Bookings Collection
--------------------------------------------------- */
const BookingSchema = new Schema({
  // المستخدم الذي يقوم بالحجز
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // الصف/الكلاس الذي يتم حجزه
  classId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Class', 
    required: true 
  },
  bookingDate: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['booked', 'cancelled', 'attended'], 
    default: 'booked' 
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);

/* --------------------------------------------------
    Payments Collection
--------------------------------------------------- */
const PaymentSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // معرف العضوية الذي قد يكون له علاقة في حالة الدفع للعضوية
  membershipId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Membership', 
    default: null 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  paymentDate: { 
    type: Date, 
    default: Date.now 
  },
  transactionId: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['completed', 'pending', 'failed', "refunded"], 
    default: 'pending' 
  }
}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema);

/* --------------------------------------------------
    Equipment Collection
    - لإدارة أجهزة ومعدات الجيم
--------------------------------------------------- */
const EquipmentSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  equipmentType: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['operational', 'maintenance', 'out_of_order'], 
    default: 'operational' 
  },
  lastMaintenance: { 
    type: Date 
  },
  // يمكن ربط الجهاز بفرع محدد في حالة وجود أكثر من صالة
  branch: { 
    type: Schema.Types.ObjectId, 
    ref: 'Branch' 
  }
}, { timestamps: true });

const Equipment = mongoose.model('Equipment', EquipmentSchema);

/* --------------------------------------------------
    Branches Collection
    - لادارة الفروع أو الصالات المختلفة
--------------------------------------------------- */
const BranchSchema = new Schema({
  branchName: {
    type: String,
    required: true
  },
  address: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  // المدير الذي يشرف على الفرع
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // المرافق أو الخدمات المتوفرة في الفرع
  facilities: [{
    type: String
  }]
}, { timestamps: true });

const Branch = mongoose.model('Branch', BranchSchema);

/* --------------------------------------------------
    Attendance Collection
    - لتسجيل دخول وخروج الأعضاء من الصالة
--------------------------------------------------- */
const AttendanceSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  checkIn: { 
    type: Date, 
    default: Date.now 
  },
  checkOut: { 
    type: Date 
  }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', AttendanceSchema);

/* --------------------------------------------------
    Reviews Collection
    - لتقييم وتقديم ملاحظات حول المدربين، الصفوف أو الفروع
--------------------------------------------------- */
const ReviewSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  subjectId: { 
    type: Schema.Types.ObjectId, 
    required: true 
    // يمثل ID للكيان المراد تقييمه (مدرب، صف، أو فرع)
  },
  subjectType: { 
    type: String, 
    enum: ['trainer', 'class', 'branch'], 
    required: true 
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  },
  comment: { 
    type: String 
  }
}, { timestamps: true });

const Review = mongoose.model('Review', ReviewSchema);

/* --------------------------------------------------
    Notifications Collection
    - لإرسال الإشعارات والتحديثات للمستخدمين
--------------------------------------------------- */
const NotificationSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  title: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  read: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);

/* --------------------------------------------------
    WorkoutPlans Collection
    - لإدارة خطط التمرين الشخصية بين المدربين والأعضاء
--------------------------------------------------- */
const WorkoutPlanSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  trainerId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  memberId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // تفاصيل التمارين: اسم التمرين، عدد المجموعات (sets) والتكرارات (reps)
  exercises: [{
    exerciseName: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true }
  }]
}, { timestamps: true });

const WorkoutPlan = mongoose.model('WorkoutPlan', WorkoutPlanSchema);

/* --------------------------------------------------
    تصدير كل الموديلات لاستخدامها في أجزاء أخرى من التطبيق
--------------------------------------------------- */
module.exports = {
  User,
  Membership,
  Class,
  Booking,
  Payment,
  Equipment,
  Branch,
  Attendance,
  Review,
  Notification,
  WorkoutPlan
};