// src/lib/authMiddleware.ts
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

// Extendemos el tipo NextApiRequest para poder añadir la propiedad `user`
interface AuthenticatedRequest extends NextApiRequest {
  user: {
    id: string;
    role: string;
  };
}

export const withAuth = (handler: NextApiHandler) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      // 1. Extraer el token de la cabecera 'Authorization'
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. No se proveyó un token.' });
      }
      
      const token = authHeader.split(' ')[1];

      // 2. Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = decoded as AuthenticatedRequest['user']; // Adjuntamos los datos del usuario a la petición

      // 3. Si el token es válido, continuar al handler original
      return handler(req, res);
      
    } catch (error) {
      // Si el token es inválido o ha expirado
      return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
  };
};