export class User {
  constructor(
    private _name: string,
    private _isDocente: boolean,
  ) {}

  public get name(): string {
    return this._name;
  }

  public get isDocente(): boolean {
    return this._isDocente;
  }
}
