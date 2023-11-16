export class ApiError extends Error {
  public name: string;
  public title: string;
  public detail?: string;

  constructor(message: string) {
    super(message);
  }
}

export class InternalError extends ApiError {
  constructor(detail?: string) {
    super('ERRO_INTERNO');
    this.title = 'Erro interno do servidor';
    this.detail = detail;
  }
}

export class BadRequest extends ApiError {
  constructor(detail?: string) {
    super('REQUISICAO_MALFORMADA');
    this.title = 'Requisição malformada';
    this.detail = detail;
  }
}

export class Unauthorized extends ApiError {
  constructor(detail?: string) {
    super('NAO_AUTORIZADO');
    this.title = 'Não autorizado';
    this.detail = detail;
  }
}

export class Forbidden extends ApiError {
  constructor(detail?: string) {
    super('PROIBIDO');
    this.title = 'Recurso proibido';
    this.detail = detail;
  }
}

export class NotFound extends ApiError {
  constructor(detail?: string) {
    super('NAO_ENCONTRADO');
    this.title = 'Recurso nao encontrado';
    this.detail = detail;
  }
}
