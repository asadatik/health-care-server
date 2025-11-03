
import prisma from '../../shared/prisma';
import { CreatePatientRequest } from './user.interface';
import bcrypt from 'bcryptjs';


//
const createPatient = async (payload: CreatePatientRequest): Promise<void> => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  await prisma.$transaction(async (txn) => {
    await txn.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
      },
    });
  });
};

export const userService = {
  createPatient,
};