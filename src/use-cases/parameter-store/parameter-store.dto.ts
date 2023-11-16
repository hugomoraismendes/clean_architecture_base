import { ParameterStore, OutputPort } from '@useCases';

export type ParameterStoreOutput = {
  success: boolean;
  data?: any;
  failure?: any;
};

export interface CreateParameterStoreInjections {
  parameterStoreGateway: ParameterStore.ParameterStoreGateway;
  parameterStorePresenter: OutputPort<ParameterStore.ParameterStoreOutput>;
}
