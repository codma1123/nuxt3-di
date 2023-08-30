import { Nullable } from "src/core/nullable";

export default abstract class DomainError extends Error {
  private _code: number;
  private _message: string;
  private _info: Nullable<Record<string, any>>;

  public get code(): number {
    return this._code;
  }
  public get message(): string {
    return this._message;
  }
  public get info(): Nullable<Record<string, any>> {
    return this._info;
  }

  constructor(code: number, message: string, info: Nullable<Record<string, any>> = null) {
    super();
    this._code = code;
    this._message = message;
    this._info = info;
  }
}
