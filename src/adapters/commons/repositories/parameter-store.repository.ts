import { ParameterStore } from '@entities';

type GConstructor<T = {}> = new (...args: any[]) => T;

export interface IParameterStoreMapper {
  find(criteria: any): Promise<ParameterStore>;
  create(criteria: any): Promise<ParameterStore>;
}

export function MixParameterStoreRepository<TBase extends GConstructor>(Base: TBase) {
  return class ParameterStoreRepository extends Base {
    private readonly _parameterStoreMapper: IParameterStoreMapper;

    constructor(...args: any[]) {
      super(...args);
      this._parameterStoreMapper = args[0].parameterStoreMapper;
    }

    public async findParameterStore(criteria?: any): Promise<ParameterStore> {
      return this._parameterStoreMapper.find(criteria);
    }
  };
}
