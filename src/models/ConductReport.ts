// src/models/ConductReport.ts
import { Schema, model, models } from 'mongoose';

const ConductReportSchema = new Schema({
  // --- Relaciones Clave ---
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  staffId: { // Quién levantó el reporte
    type: Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  schoolYearId: {
    type: Schema.Types.ObjectId,
    ref: 'SchoolYear',
    required: true
  },

  // --- Detalles del Reporte ---
  date: { // Fecha y hora del suceso
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['INCIDENT', 'MERIT', 'NOTE'] // Incidente (negativo), Mérito (positivo), Nota (informativo)
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  actionsTaken: { // Opcional, qué se hizo al respecto
    type: String,
    trim: true
  }
}, { timestamps: true });

export default models.ConductReport || model('ConductReport', ConductReportSchema);