// src/pages/api/students/[id].ts
import connectToDatabase from '@/lib/db/mongodb';
import { withAuth } from '@/lib/middlewares/withAuth';
import Student from '@/models/Student';

const handler = async (req, res) => {
  const { id } = req.query; // Obtenemos el ID del alumno desde la URL
  await connectToDatabase();

  switch (req.method) {
    case 'PUT': // Actualizar un alumno
      try {
        const student = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!student) return res.status(404).json({ success: false, message: 'Alumno no encontrado' });
        res.status(200).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Error de validación', error });
      }
      break;

    case 'DELETE': // Eliminar un alumno
      try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) return res.status(404).json({ success: false, message: 'Alumno no encontrado' });
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Error del servidor' });
      }
      break;
    
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Método ${req.method} no permitido`);
      break;
  }
};

export default withAuth(handler);