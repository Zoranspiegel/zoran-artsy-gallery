import mongoose from 'mongoose';
import { z } from 'zod';

export const XAppTokenZodSchema = z.object({
  type: z.string().min(1),
  token: z.string().min(1),
  expires_at: z.string().min(1)
});

export type XAppTokenType = z.infer<typeof XAppTokenZodSchema>;

const XAppTokenMongoDBSchema: mongoose.Schema =
  new mongoose.Schema<XAppTokenType>(
    {
      type: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      },
      expires_at: {
        type: String,
        required: true
      }
    },
    { versionKey: false, timestamps: false }
  );

export const XAppToken =
  mongoose.models.XAppToken ||
  mongoose.model<XAppTokenType>('XAppToken', XAppTokenMongoDBSchema);
