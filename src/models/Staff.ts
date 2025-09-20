import { Schema, model, models } from 'mongoose';

const StaffSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, select: false },
  
  // --- El Campo Clave ---
  role: {
    type: String,
    required: true,
    enum: [
      'TEACHER',
      'ADMIN',
      'PREFECT',
      'SOCIAL_WORK',
      'DIRECTOR',
      'SUPER_ADMIN' // El rol más poderoso
    ]
  },
  // Para el proceso de invitación y activación de cuenta
  invitationToken: String,
  invitationExpires: Date,
  
  isActive: { type: Boolean, default: true }, // Para poder desactivar cuentas sin borrarlas

}, { timestamps: true });

export default models.Staff || model('Staff', StaffSchema);