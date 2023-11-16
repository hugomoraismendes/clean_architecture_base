import { ParameterStore, OutputPort } from '@useCases';
import { Errors } from '@shared';

type ParameterStoreView = {
  statusCode: number;
  body?: any;
};

export default class OutagesPresenter implements OutputPort<ParameterStore.ParameterStoreOutput> {
  private _view: ParameterStoreView;

  get view(): ParameterStoreView {
    return this._view;
  }

  public show(response: ParameterStore.ParameterStoreOutput) {
    if (response.success && !response.data) {
      this._view = {
        statusCode: 204
      };
      return;
    }

    if (response.success) {
      this._view = {
        statusCode: 200,
        body: {
          data: response.data
        }
      };
    }

    if (response.failure) {
      this._view = {
        statusCode: 400,
        body: { data: Errors.formatErrorsResponse(response.failure.data) }
      };
      return;
    }
  }
}
