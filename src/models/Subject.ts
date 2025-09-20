// src/models/Subject.ts
import { Schema, model, models } from 'mongoose';

const SubjectSchema = new Schema({
  // --- Información de la Materia ---
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true // No debería haber dos materias con el mismo nombre
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 3 // 1ero, 2do o 3er grado
  },
  shortName: { // Opcional, para reportes o vistas compactas
    type: String,
    trim: true,
    uppercase: true
  },
  description: {
    type: String,
    trim: true
  },
  hourForWeek: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default models.Subject || model('Subject', SubjectSchema);