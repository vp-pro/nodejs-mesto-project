import { STATUS_CODES } from '../constants';

class Conflict extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.CONFLICT;
  }
}

export default Conflict;
