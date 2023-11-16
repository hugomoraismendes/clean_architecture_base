import * as Api from './api';

export function formatErrorsResponse(errors: Api.ApiError[]) {
  return {
    errors: errors.map((e) => ({
      code: e.message,
      title: e.title,
      detail: e.detail
    }))
  };
}

export * as Api from './api';
