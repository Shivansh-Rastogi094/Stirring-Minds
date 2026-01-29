import mongoose, { Schema, Document } from 'mongoose';

export interface IClaim extends Document {
  user: mongoose.Types.ObjectId;
  deal: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  claimCode?: string;
  createdAt: Date;
}

const ClaimSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deal: { type: Schema.Types.ObjectId, ref: 'Deal', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  claimCode: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Indexes for performance
ClaimSchema.index({ user: 1, deal: 1 }, { unique: true }); // Prevent duplicate claims
ClaimSchema.index({ user: 1, createdAt: -1 });
ClaimSchema.index({ deal: 1 });
ClaimSchema.index({ status: 1 });

export default mongoose.models.Claim || mongoose.model<IClaim>('Claim', ClaimSchema);
