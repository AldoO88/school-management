// src/models/Tutor.ts
import { Schema, model, models } from 'mongoose';

const TutorSchema = new Schema({
  // --- Información del Tutor ---
  fullName: { 
    type: String, 
    required: true, 
    trim: true 
  }, // Antes: nombreCompleto
  phone: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  }, // Antes: telefono
  email: { 
    type: String, 
    unique: true, 
    trim: true, 
    lowercase: true 
  },
  address: {
    street: String,
    number: String,
    neighborhood: String,
    city: String,
    state: String,
    zipCode: String,
  },
  password: {
    type: String,
    select: false, // Para no enviar el hash de la contraseña en las consultas por defecto
  },
  invitationToken: String, // El token único para activar la cuenta
  invitationExpires: Date, // Fecha de expiración del token (ej. 24 horas)

}, { timestamps: true }); // Mantiene createdAt y updatedAt

export default models.Tutor || model('Tutor', TutorSchema);