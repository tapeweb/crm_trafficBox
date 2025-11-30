import { randomBytes } from "node:crypto";

export const generateTokenUtils = (
    size = 32,
    encoding: BufferEncoding = "hex"
): string => {
    const buffer = randomBytes(size);
    return buffer.toString(encoding);
}