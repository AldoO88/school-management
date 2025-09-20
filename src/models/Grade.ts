// src/models/Grade.ts
import { Schema, model, models } from 'mongoose';

const GradeSchema = new Schema({
  // --- Relaciones Clave ---
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  staffId: { // El maestro que asignó la calificación
    type: Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  schoolYearId: { // A qué ciclo escolar pertenece esta calificación
    type: Schema.Types.ObjectId,
    ref: 'SchoolYear',
    required: true
  },
  
  // --- Datos de la Calificación ---
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  period: { // Bimestre, trimestre, etc.
    type: Number,
    required: true,
    min: 1
  }
}, { timestamps: true });

export default models.Grade || model('Grade', GradeSchema);