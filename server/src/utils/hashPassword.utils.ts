import bcrypt from 'bcrypt';

export const hashingPassword = (password: string, saltOrRounds: number) => {
    return bcrypt.hash(password, saltOrRounds);
}