// src/pages/api/auth/login.ts
import type { NextApiHandler } from 'next'; // Importamos el tipo NextApiHandler
import connectToDatabase from '@/lib/db/mongodb';
import { loginStaff } from '@/services/authService';

// Declaramos el handler como una constante usando la sintaxis de arrow function
const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  // La conexión a la base de datos se mantiene igual
  await connectToDatabase();

  const { email, password } = req.body;

  try {
    // La llamada al servicio se mantiene igual
    const token = await loginStaff(email, password);
    res.status(200).json({ success: true, token });
    
  } catch (error: any) {
    if (error.message === 'Credenciales inválidas') {
      res.status(401).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Error del servidor' });
    }
  }
};

// Finalmente, exportamos la constante
export default handler;