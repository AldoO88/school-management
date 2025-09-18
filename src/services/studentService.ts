import Student from '@/models/Student';
import Tutor from '@/models/Tutor';

// Función para crear un alumno
export const createStudent = async (studentData: any, tutorData: any): Promise<typeof Student> => {
  // Lógica de buscar o crear tutor
  const tutor = await Tutor.findOneAndUpdate(
    { phone: tutorData.phone },
    { ...tutorData },
    { new: true, upsert: true }
  );
  
  // Lógica de crear el alumno
  const newStudent = new Student({
    ...studentData,
    tutorId: tutor._id,
  });
  
  await newStudent.save();
  return newStudent;
}

// Función para obtener todos los alumnos
export const getAllStudents = async (): Promise<typeof Student[]> => {  
  const students = await Student.find({}).populate('tutorId'); // .populate() trae los datos del tutor
  return students;
}