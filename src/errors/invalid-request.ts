import { STATUS_CODES } from '../constants';

export default class InvalidRequest extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.INVALID_REQUEST;
  }
}