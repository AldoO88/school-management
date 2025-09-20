import type { NextApiHandler } from 'next'; // Importamos el tipo NextApiHandler
import { withAuth } from '@/lib/middlewares/withAuth';
import { createStudent, getAllStudents } from '@/services/studentService'; // <-- Importas tus funciones

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      try {
        const { tutorData, studentData } = req.body;
        const newStudent = await createStudent(studentData, tutorData); // <-- Llama al servicio
        res.status(201).json({ success: true, data: newStudent });
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          // Si lo es, respondemos con un error 400 (Petición incorrecta) y los detalles de la validación.
          res.status(400).json({ success: false, message: 'Error de validación', errors: error.errors });
        } else {
          // Para cualquier otro tipo de error (ej: fallo de conexión, error inesperado).
          // Respondemos con un error 500 (Error Interno del Servidor).
          res.status(500).json({ success: false, message: 'Error del servidor', error: error.message });
        }
      }
      break;
    
    case 'GET':
      try {
        const students = await getAllStudents(); // <-- Llama al otro servicio
        res.status(200).json({ success: true, data: students });
      } catch (error) {
          res.status(500).json({ success: false, message: 'Error del servidor', error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${req.method} no permitido`);
      break;
  }
}

export default withAuth(handler); // Proteges la ruta con tu middleware