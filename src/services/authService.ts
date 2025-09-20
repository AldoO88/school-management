// src/services/authService.ts
import Staff from '@/models/Staff';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Esta función contiene toda la lógica para validar y autenticar a un usuario
export const loginStaff = async (email: string, password: string): Promise<string> => {
  // 1. Buscar al usuario por su email
  // Usamos .select('+password') para que la contraseña, oculta por defecto, se incluya en la consulta
  const staffMember = await Staff.findOne({ email }).select('+password');
  
  // Si no se encuentra el usuario, lanzamos un error
  if (!staffMember) {
    throw new Error('Credenciales inválidas');
  }

  // 2. Comparar la contraseña enviada con la guardada
  const isPasswordMatch = await bcrypt.compare(password, staffMember.password);
  
  // Si las contraseñas no coinciden, lanzamos el mismo error para no dar pistas a atacantes
  if (!isPasswordMatch) {
    throw new Error('Credenciales inválidas');
  }

  // 3. Crear el payload para el token
  const payload = {
    id: staffMember._id,
    role: staffMember.role,
  };

  // 4. Firmar y crear el token JWT
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn: '8h' }
  );

  // 5. Devolver el token si todo es correcto
  return token;
}