// import external modules
import mongoose from 'mongoose';

// schema for api_key
const apiKeySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    activeSlot: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// export apiKey model
export const APIKey = mongoose.model('APIKey', apiKeySchema);
