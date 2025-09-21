// src/pages/api/auth/verify.ts
import type { NextApiRequest } from 'next';
import { withAuth } from '@/lib/middlewares/withAuth';
import connectToDatabase from '@/lib/db/mongodb';
import Staff from '@/models/Staff';

// Definimos el tipo para la petición autenticada
type AuthenticatedRequest = NextApiRequest & { user: { id: string } };

const handler = async (req: AuthenticatedRequest, res) => {
  await connectToDatabase();
  
  try {
    const userId = req.user.id;
    const userProfile = await Staff.findById(userId).select('-password');
    
    if (!userProfile) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ user: userProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export default withAuth(handler);