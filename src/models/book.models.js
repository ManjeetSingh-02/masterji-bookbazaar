// import external modules
import mongoose from 'mongoose';

// schema for book
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    authors: {
      type: [String],
      required: true,
    },
    publisher: {
      type: String,
      trim: true,
      required: true,
    },
    publishedYear: {
      type: Number,
      length: 4,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coverImg: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

// export book model
export const Book = mongoose.model('Book', bookSchema);
