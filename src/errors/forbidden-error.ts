import { STATUS_CODES } from '../constants';

class Forbidden extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.FORBIDDEN;
  }
}

export default Forbidden;