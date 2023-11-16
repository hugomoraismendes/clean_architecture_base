import { ParameterStore, OutputPort } from '@useCases';
import { Errors } from '@shared';

export default class ParameterStoreInteractor {
  private readonly _gateway: ParameterStore.ParameterStoreGateway;
  private readonly _presenter: OutputPort<ParameterStore.ParameterStoreOutput>;

  constructor(params: ParameterStore.CreateParameterStoreInjections) {
    this._gateway = params.parameterStoreGateway;
    this._presenter = params.parameterStorePresenter;
  }

  public async execute(input: any): Promise<void> {
    try {
      return this._presenter.show({
        success: true,
        data: input
      });
    } catch (err: any) {
      return this._presenter.show({
        success: false,
        failure: {
          data: [new Errors.Api.InternalError()]
        }
      });
    }
  }
}
