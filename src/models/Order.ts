import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  product: { type: String },
  customer: { type: String, required: true },
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  postcode: { type: String },
  whatsapp: { type: String },
  selectedImage: { type: String },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  unit: { type: String },
  selectedSize: { type: String },
  size: { type: String },
  color: { type: String },
  quantity: { type: String },
  price: { type: String },
  totalPrice: { type: String },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
