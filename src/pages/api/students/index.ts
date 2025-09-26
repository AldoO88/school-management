// src/pages/api/students/index.ts
import type { NextApiHandler } from 'next';
import { withAuth } from '@/lib/middlewares/withAuth';
import connectToDatabase from '@/lib/db/mongodb';
import Student from '@/models/Student';
import Tutor from '@/models/Tutor';

// Usamos el tipo NextApiHandler para obtener tipado fuerte en req y res
const handler: NextApiHandler = async (req, res) => {
  // 1. Conexión a la base de datos en cada petición
  await connectToDatabase();

  // 2. Manejador de métodos HTTP
  switch (req.method) {
    // --- MANEJO DE PETICIONES GET (OBTENER TODOS LOS ALUMNOS) ---
    case 'GET':
      try {
        // Buscamos todos los documentos de alumnos.
        // `.populate('tutorId')` reemplaza el ID del tutor con su documento completo.
        const students = await Student.find({}).populate('tutorId');
        res.status(200).json({ success: true, data: students });
      } catch (error) {
        console.error("Error al obtener alumnos:", error);
        res.status(500).json({ success: false, message: 'Error del servidor al obtener la lista de alumnos.' });
      }
      break;

    // --- MANEJO DE PETICIONES POST (CREAR UN NUEVO ALUMNO) ---
    case 'POST':
      try {
        console.log('[API] Petición POST a /api/students recibida.');
        
        // Obtenemos los datos del cuerpo de la petición
        const { tutorData, studentData } = req.body;

        // Verificación de seguridad: nos aseguramos de que los datos mínimos existan
        if (!tutorData || !studentData || !tutorData.phone || !studentData.name) {
          console.error(tutorData, studentData);
          console.error('[API] Error: Datos incompletos en el payload.');
          return res.status(400).json({ success: false, message: 'Faltan datos requeridos del tutor o del alumno.' });
        }
        console.log('[API] Datos recibidos:', { tutorData, studentData });

        // Buscamos un tutor por su teléfono. Si no existe, lo creamos (upsert).
        const tutor = await Tutor.findOneAndUpdate(
          { phone: tutorData.phone },
          { ...tutorData },
          { new: true, upsert: true, runValidators: true }
        );
        console.log(`[API] Tutor procesado (encontrado o creado): ${tutor._id}`);

        // Creamos una nueva instancia del modelo Student en memoria
        const newStudent = new Student({
          ...studentData,
          tutorId: tutor._id, // Enlazamos el ID del tutor
        });
        console.log('[API] Instancia de Alumno creada en memoria.');

        // Guardamos el nuevo alumno en la base de datos
        await newStudent.save();
        console.log(`[API] Alumno guardado exitosamente en la BD: ${newStudent._id}`);
        
        // Respondemos con éxito
        res.status(201).json({ success: true, data: newStudent });

      } catch (error: any) {
        // Si algo falla en el bloque `try`, caemos aquí
        console.error('[API] ERROR CATASTRÓFICO EN EL BLOQUE CATCH:', error);
        
        // Enviamos una respuesta de error genérica pero informativa
        res.status(500).json({ 
          success: false, 
          message: 'Ocurrió un error en el servidor al intentar crear el alumno.',
          error: error.message 
        });
      }
      break;

    // --- MANEJO DE MÉTODOS NO PERMITIDOS ---
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${req.method} no permitido`);
      break;
  }
};

// 3. Exportamos el handler envuelto en nuestro middleware de autenticación
// Esto asegura que solo los usuarios logueados puedan acceder a esta ruta.
export default withAuth(handler);