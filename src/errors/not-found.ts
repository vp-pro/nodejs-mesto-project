import { STATUS_CODES } from '../constants';

export default class NotFound extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}
