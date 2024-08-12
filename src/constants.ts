export const PATTERN_LINK = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
export const PATTERN_JIO = /^(https?:\/\/)(w{3}.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?(#)?$/;

export const STATUS_CODES = {
    CONFLICT: 409,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    INVALID_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
  };