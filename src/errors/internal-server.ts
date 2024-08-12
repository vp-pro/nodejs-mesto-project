import { STATUS_CODES } from '../constants';

export default class InternalServer extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
  }
}