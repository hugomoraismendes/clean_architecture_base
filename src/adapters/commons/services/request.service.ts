type GConstructor<T = {}> = new (...args: any[]) => T;

export interface IRequestService {
  request(path: string, data?: any, method?: string): Promise<any>;
}

export function MixRequestService<TBase extends GConstructor>(Base: TBase) {
  return class RequestService extends Base {
    private _requestService: IRequestService;

    constructor(...args: any[]) {
      super(...args);
      this._requestService = args[0].requestService;
    }

    public async request(url: string): Promise<any> {
      return this._requestService.request(url);
    }
  };
}
