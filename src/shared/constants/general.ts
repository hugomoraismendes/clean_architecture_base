export enum Env {
  Development = 'development',
  Testing = 'testing',
  Production = 'production'
}

export enum StatusApiResponse {
  Ok = 'OK',
  PartialFailure = 'PARTIAL_FAILURE',
  Unavailable = 'UNAVAILABLE',
  ScheduledOutage = 'SCHEDULED_OUTAGE'
}

export enum EnvironmentMetrics {
  Gateway = 'gateway',
  Auth = 'auth',
  Commons = 'commons'
}

export const MonitoringTimeInSeconds = 1800;
export const DayInSeconds = 86400;

export enum Priority {
  High = 'high',
  Medium = 'medium',
  Unattended = 'unattended'
}

export enum ServerLinks {
  Testing = 'api.opb.testegerencianet.com.br',
  Production = 'api.opb.gerencianet.com.br'
}
