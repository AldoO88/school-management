// /models/Alumno.ts

import { Schema, model, models } from 'mongoose';

const StudentSchema = new Schema({
  // --- Información Personal ---
  name: {
    type: String,
    required: true,
    trim: true, // Limpia espacios en blanco al inicio y al final
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  secondLastName: {
    type: String,
    trim: true, // Opcional en algunos casos
  },
  birthDate: {
    type: Date,
    required: true, 
  },
  CURP: {
    type: String,
    required: true,
    unique: true, // No puede haber dos alumnos con la misma CURP
    uppercase: true,
    trim: true,
  },
  // --- Información Escolar ---
  noControl: {
    type: String,
    required: true,
    unique: true, // La matrícula también debe ser única
    trim: true,
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
  },
  group: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['ACTIVE', 'INACTIVE', 'GRADUATED', 'WITHDRAWN'], // Solo permite estos valores
    default: 'ACTIVE', // Valor por defecto
  },
  
  // --- Información del Tutor (Objeto Anidado) ---
  tutorId: {
    type: Schema.Types.ObjectId, // Guardamos el ID del tutor
    ref: 'Tutor',                // Le decimos a Mongoose que este ID se refiere a un documento en la colección 'Tutor'
    required: true,
  },
}, {
  timestamps: true // Crea automáticamente los campos `createdAt` y `updatedAt`
});

// Evita recompilar el modelo si ya existe
export default models.Student || model('Student', StudentSchema);