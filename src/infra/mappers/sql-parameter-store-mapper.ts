import { ParameterStore, ParameterStoreProps, Result } from '@entities';
import { Bootstrap } from '@infra';
import { SQLMapper } from './sql-mapper';

export default class SqlOutageDataMapper extends SQLMapper {
  protected readonly _db: any;

  constructor(params: Bootstrap.AppContainer) {
    const dbName = 'main';
    const modelName = 'parameter_store';
    super(params, dbName, modelName);
  }

  public async find(criteria: any): Promise<ParameterStore> {
    const options: any = {
      where: {}
    };

    if (criteria.key) {
      options.where.key = criteria.key;
    }

    const row = await this._db.findOne(options);

    if (!row) {
      return null;
    }

    return this.toEntity(row);
  }

  public toModel(entity: ParameterStore): any {
    return {
      key: entity.key,
      value: entity.value
    };
  }

  public toEntity(row: any): ParameterStore {
    const props: ParameterStoreProps = {
      id: row.id,
      key: row.key,
      value: row.value
    };

    const outagesResult: Result<ParameterStore> = ParameterStore.build(props);

    if (!outagesResult.succeeded) {
      throw outagesResult.errors;
    }

    return outagesResult.value;
  }
}
