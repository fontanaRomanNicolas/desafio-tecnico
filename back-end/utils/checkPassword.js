import bcrypt from 'bcrypt';

export const checkPassword = async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
};