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
    publishedDate: {
      type: Date,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    coverImageURL: {
      type: String,
      trim: true,
      default: 'https://placehold.co/600x400?text=Default\nCover+Image',
    },
  },
  { timestamps: true }
);

// export book model
export const Book = mongoose.model('Book', bookSchema);
