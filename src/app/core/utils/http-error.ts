import { HttpStatusCode } from '@angular/common/http';

export class NotFoundError extends Error {
  statusCode = HttpStatusCode.NotFound;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  getErrorMessage(): string {
    return `Not found: ${this.message}`;
  }
}

export class NetworkError extends Error {
  statusCode = 0;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, NetworkError.prototype);
  }

  getErrorMessage(): string {
    return `Network error: ${this.message}`;
  }
}

export class UnexpectedError extends Error {
  statusCode = HttpStatusCode.InternalServerError;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, UnexpectedError.prototype);
  }

  getErrorMessage(): string {
    return `Something went wrong: ${this.message}`;
  }
}
