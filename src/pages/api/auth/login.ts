// src/pages/api/auth/login.ts
import type { NextApiHandler } from 'next';
import connectToDatabase from '@/lib/db/mongodb';
import Staff from '@/models/Staff';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  await connectToDatabase();

  const { email, password } = req.body;

  try {
    const staffMember = await Staff.findOne({ email }).select('+password');
    if (!staffMember) {
      return res.status(401).json({ messageKey: 'invalid_credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, staffMember.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ messageKey: 'invalid_credentials' });
    }

    const payload = { id: staffMember._id, role: staffMember.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '8h' });

    // Devolvemos el token Y los datos del usuario (sin la contraseña)
    const userToReturn = staffMember.toObject();
    delete userToReturn.password;

    res.status(200).json({ token, user: userToReturn });
  } catch (error) {
    res.status(500).json({ messageKey: 'server_error' });
  }
};

export default handler;