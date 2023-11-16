export default class ParameterStoreController {
  private readonly interactor: any;

  constructor(params: any) {
    this.interactor = params.parameterStoreInteractor;
  }

  async run(req: any) {
    const input = req;
    await this.interactor.execute(input);
  }
}
