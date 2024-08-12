import { STATUS_CODES } from '../constants';

class Unauthorized extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.UNAUTHORIZED;
  }
}

export default Unauthorized;