// src/lib/authMiddleware.ts
// Middleware para proteger rutas de la API con autenticación 
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

// Extendemos el tipo NextApiRequest para poder añadir la propiedad `user`
interface AuthenticatedRequest extends NextApiRequest {
  user: {
    id: string;
    role: string;
  };
}

export const withAuth = (handler: NextApiHandler) => { // <-- 2. Exportamos el handler con el middleware: qué es el handler? es la función que maneja la petición de la API (en este caso, la ruta /api/auth/verify)
  return async (req: AuthenticatedRequest, res: NextApiResponse) => { // <-- 3. Retornamos una nueva función que envuelve al handler original y que verifica el token antes de llamar al handler original
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