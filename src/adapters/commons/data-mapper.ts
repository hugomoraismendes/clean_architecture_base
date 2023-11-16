export interface DataMapper {
  find(criteria: any, attributes?: any): Promise<any>;
}
