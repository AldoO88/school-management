// src/pages/api/auth/verify.ts
import type { NextApiRequest } from 'next';
import { withAuth } from '@/lib/middlewares/withAuth';
import connectToDatabase from '@/lib/db/mongodb';
import Staff from '@/models/Staff';

// Definimos el tipo para la petición autenticada
type AuthenticatedRequest = NextApiRequest & { user: { id: string } };

const handler = async (req: AuthenticatedRequest, res) => {
  console.log('---');
  console.log('A. API VERIFY: Petición recibida.');
  
  try {
    await connectToDatabase();
    console.log('B. API VERIFY: Conexión a la BD exitosa.');
    
    const userId = req.user.id;
    const userProfile = await Staff.findById(userId).select('-password');
    console.log('C. API VERIFY: Usuario encontrado:', userProfile ? userProfile.email : 'No encontrado');
    
    if (!userProfile) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.status(200).json({ user: userProfile });
    console.log('D. API VERIFY: Respuesta enviada exitosamente.');

  } catch (error) {
    console.error('E. API VERIFY: Error en el bloque catch.', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export default withAuth(handler);