export default class ResponseDataType<T> {
  private _statusCode: number;

  private _message: string;

  private _data: T | T[] | null;

  constructor(statusCode: number, data: T | T[] | null, message: string) {
    this._data = data;
    this._message = message;
    this._statusCode = statusCode;
  }

  public getStatusCode(): number {
    return this._statusCode;
  }
  public setStatusCode(value: number) {
    this._statusCode = value;
  }

  public getMessage(): string {
    return this._message;
  }
  public setMessage(value: string) {
    this._message = value;
  }

  public getData(): T | T[] | null {
    return this._data;
  }
  public setData(value: T | T[] | null) {
    this._data = value;
  }

  public toJSON() {
    return {
      data: this.getData(),
      message: this.getMessage(),
      statusCode: this.getStatusCode(),
    };
  }
}
