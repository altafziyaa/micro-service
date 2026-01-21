import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    images: {
      type: [
        {
          url: { type: String, required: true },
          alt: { type: String },
          isPrimary: { type: Boolean, default: false },
        },
      ],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

productSchema.index({ name: "text", description: "text" });
productSchema.index({ categoryId: 1 });
productSchema.index({ isActive: 1 });

export default mongoose.model("Product", productSchema);
