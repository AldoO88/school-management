// src/models/SchoolYear.ts
import { Schema, model, models } from 'mongoose';

const SchoolYearSchema = new Schema({
  // --- Información del Ciclo Escolar ---
  name: { // ej: "2025-2026"
    type: String,
    required: true,
    unique: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: { // Solo un ciclo puede ser el activo
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default models.SchoolYear || model('SchoolYear', SchoolYearSchema);