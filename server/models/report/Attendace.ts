import mongoose, { Schema, Document } from "mongoose";

export interface IAttendace extends Document {
    userId: string,
    checkIn: string,
    checkOut: string
}

const attendaceSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    checkIn: { type: Date, default: Date.now },
    checkOut: { type: Date }
    }, { timestamps: true }
);

export default mongoose.models.Attendace ||
    mongoose.model<IAttendace>("Attendace", attendaceSchema);