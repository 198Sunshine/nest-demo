import * as crypto from 'crypto';

// make salt
export const makeSalt = (): string => {
  return crypto.randomBytes(3).toString('base64');
};

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */

export const encryptPassword = (password: string, salt: string): string => {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  // 迭代10000次，取16长度
  return crypto
    .pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1')
    .toString('base64');
};
