// scripts/seedAdmin.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Staff from '@/models/Staff'; // Ajusta la ruta a tu modelo Staff
import dotenv from 'dotenv';

// Carga las variables de entorno desde .env.local
dotenv.config({ path: './.env.local' });

const MONGO_URI = process.env.MONGODB_URI;

// --- DEFINE AQUÍ LOS DATOS DE TU SUPER ADMIN ---
const ADMIN_EMAIL = 'aldogonjuarez@gmail.com'; // Cámbiala por tu email
const ADMIN_PASSWORD = 'aldoogj198802042'; // Cámbiala por una contraseña fuerte
// ---------------------------------------------

const seedAdmin = async () => {
  if (!MONGO_URI) {
    console.error('No se encontró la variable MONGODB_URI. Asegúrate de que .env.local esté configurado.');
    process.exit(1);
  }

  try {
    console.log('Conectando a la base de datos...');
    await mongoose.connect(MONGO_URI);
    console.log('Conexión exitosa.');

    // 1. Verificar si el admin ya existe
    const existingAdmin = await Staff.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('El usuario Super Admin ya existe.');
      return;
    }

    // 2. Encriptar la contraseña
    console.log('Encriptando contraseña...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);
    console.log('Contraseña encriptada.');

    // 3. Crear el nuevo usuario
    const adminUser = new Staff({
      fullName: 'Aldo Omar Gonzalez Juarez',
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'SUPER_ADMIN', // Asegúrate de que este rol exista en tu enum del modelo
      isActive: true,
    });

    // 4. Guardar en la base de datos
    await adminUser.save();
    console.log('¡Usuario Super Admin creado exitosamente!');

  } catch (error) {
    console.error('Error creando el usuario Super Admin:', error);
  } finally {
    // 5. Desconectar de la base de datos
    await mongoose.disconnect();
    console.log('Desconectado de la base de datos.');
  }
};

// Ejecutar la función
seedAdmin();