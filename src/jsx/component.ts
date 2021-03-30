export class Component<T = any> {
  constructor(public props: T) {}

  public start() {}
  protected _start() {}

  public onExit() {}
  protected _onExit() {}

  public async exit(data?: any) {
    await this._onExit()
    await this.onExit()
    this._exit(data)
  }

  public error() {
    this._error()
  }

  private _exit(data?: any) {}
  private _error() {}
}
