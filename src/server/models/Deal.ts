import mongoose, { Schema, Document } from 'mongoose';

export interface IDeal extends Document {
  title: string;
  description: string;
  partnerName: string;
  category: 'Cloud' | 'Marketing' | 'Analytics' | 'Productivity' | 'Other';
  discountValue: string;
  isLocked: boolean;
  eligibilityConditions: string[];
  logoUrl: string;
  createdAt: Date;
}

const DealSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  partnerName: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Cloud', 'Marketing', 'Analytics', 'Productivity', 'Other'], 
    required: true 
  },
  discountValue: { type: String, required: true },
  isLocked: { type: Boolean, default: false },
  eligibilityConditions: [{ type: String }],
  logoUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Indexes for performance
DealSchema.index({ category: 1 });
DealSchema.index({ isLocked: 1 });
DealSchema.index({ createdAt: -1 });
DealSchema.index({ title: 'text', partnerName: 'text', description: 'text' }); // Text search index

export default mongoose.models.Deal || mongoose.model<IDeal>('Deal', DealSchema);
