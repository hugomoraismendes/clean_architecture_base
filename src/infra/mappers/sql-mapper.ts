import { AppContainer } from 'infra/bootstrap/register';
import { Entity } from '@entities';
import { DataMapper } from '@adapters';

export abstract class SQLMapper implements DataMapper {
  protected readonly _db: any;

  constructor(params: AppContainer, dbName: string, modelName: string) {
    this._db = params.db.connections[dbName].models[modelName];
  }

  public abstract toEntity(row: any): Entity<any>;
  public abstract toModel(entity: Entity<any>): any;

  public async find(criteria: any, attributes?: string[]): Promise<Entity<any>> {
    const options: any = {
      where: {
        id: criteria
      }
    };

    if (attributes?.length > 0) {
      options.atrributes = attributes;
    }

    const row = this._db.findOne(options);

    if (!row) {
      return null;
    }

    return this.toEntity(row);
  }

  public async findAll(conditions: any): Promise<Array<Entity<any>>> {
    const options: any = {
      where: conditions,
      raw: true
    };

    const rows = this._db.findAll(options);

    return rows.map((row: any) => {
      return this.toEntity(row);
    });
  }
}
