import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

export class Bcrypt {
  private static bcrypt = bcrypt;

  static hash(password: string) {
    const saltOrRounds = process.env.SALT_OR_ROUNDS || '10';
    const saltRounds = parseInt(saltOrRounds);
    return this.bcrypt.hashSync(password, saltRounds);
  }

  static compare(password: string, hash: string) {
    return this.bcrypt.compareSync(password, hash);
  }

  static hashSync(password: string) {
    const saltOrRounds = process.env.SALT_OR_ROUNDS || '10';
    const saltRounds = parseInt(saltOrRounds);
    return this.bcrypt.hashSync(password, saltRounds);
  }

  static compareSync(password: string, hash: string) {
    return this.bcrypt.compareSync(password, hash);
  }

}
