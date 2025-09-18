// src/lib/mongodb.ts

// 1. IMPORTACIÓN DE LA LIBRERÍA
// Importa la librería Mongoose, que es la herramienta que nos permite modelar
// y comunicarnos con la base de datos de MongoDB de una manera estructurada.
import mongoose from 'mongoose';

// 2. OBTENCIÓN DE LA CADENA DE CONEXIÓN
// Lee la cadena de conexión desde las "variables de entorno" del sistema.
// Esto es una práctica de seguridad para no escribir contraseñas directamente en el código.
// El archivo `.env.local` es el que provee esta variable a `process.env`.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/school-management-db';

// 3. VERIFICACIÓN DE LA CADENA DE CONEXIÓN
// Si por alguna razón la cadena de conexión no está definida, el programa se detiene
// inmediatamente con un error claro. Esto previene fallos inesperados más adelante.
if (!MONGODB_URI) {
  throw new Error(
    'Por favor, define la variable de entorno MONGODB_URI dentro de .env.local'
  );
}

// 4. DEFINICIÓN DEL TIPO DE LA CACHÉ
// Creamos un tipo personalizado con TypeScript. Esto define la "forma" que tendrá
// nuestro objeto de caché, que guardará tanto la conexión activa (`conn`) como la
// promesa de conexión en proceso (`promise`).
type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

// 5. DECLARACIÓN GLOBAL PARA LA CACHÉ
// En el entorno de desarrollo de Next.js, los módulos de código se recargan en caliente,
// lo que podría hacer que perdamos nuestra variable de caché. Para evitarlo, le decimos a
// TypeScript que vamos a adjuntar nuestra caché al objeto `global` de Node.js,
// el cual persiste entre recargas de módulos.
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// 6. INICIALIZACIÓN DE LA CACHÉ
// Intenta obtener la caché desde la variable global. Si ya existe, la reutiliza.
// Si no existe (la primera vez que se ejecuta el código), la inicializa como un objeto
// vacío y la guarda en la variable global para futuras ejecuciones.
let cached: MongooseCache = global.mongoose as MongooseCache;
if (!cached) {
  cached = { conn: null, promise: null };
  global.mongoose = cached;
}

// 7. FUNCIÓN PRINCIPAL DE CONEXIÓN
// Esta es la función que exportaremos y usaremos en nuestras rutas de API para
// asegurarnos de que estamos conectados a la base de datos.
async function connectToDatabase() {
  // Verificación de seguridad por si la caché no se inicializó correctamente.
  if (!cached) {
    throw new Error('La caché de mongoose no está inicializada.');
  }

  // 8. REUTILIZACIÓN DE CONEXIÓN ACTIVA (LA OPTIMIZACIÓN CLAVE)
  // Si ya existe una conexión activa en la caché (`cached.conn`), la devuelve
  // inmediatamente. Esto evita crear una nueva conexión innecesariamente en cada
  // llamada a la API, lo cual es muy rápido y eficiente.
  if (cached.conn) {
    return cached.conn;
  }

  // 9. MANEJO DE CONEXIONES EN PROCESO
  // Si no hay una conexión activa, pero ya hay una "promesa" de conexión en
  // proceso (`cached.promise`), significa que otra llamada a la API ya inició la
  // conexión. En este caso, simplemente esperamos a que esa promesa termine.
  // Esto evita crear conexiones duplicadas al mismo tiempo.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Opción de Mongoose para un mejor rendimiento.
    };
    // Si no hay conexión activa ni en proceso, aquí es donde finalmente se
    // inicia la nueva conexión. Guardamos la "promesa" de la conexión en la caché.
    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    // 10. RESOLUCIÓN DE LA PROMESA
    // Espera a que la promesa de conexión (ya sea una nueva o una existente) se complete.
    // Una vez resuelta, guarda la conexión activa en `cached.conn`.
    cached.conn = await cached.promise;
  } catch (e) {
    // Si la conexión falla, se limpia la promesa de la caché para permitir
    // un nuevo intento en la siguiente llamada a la API.
    cached.promise = null;
    throw e; // Lanza el error para que se pueda manejar en la API.
  }

  // 11. RETORNO DE LA CONEXIÓN
  // Devuelve la conexión activa y lista para ser usada.
  return cached.conn;
}

// 12. EXPORTACIÓN
// Exporta la función para que pueda ser importada y utilizada en otras partes
// de la aplicación, como en las rutas de la API.
export default connectToDatabase;