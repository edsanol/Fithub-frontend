export interface TickerResponseApi<T = any> {
  isSuccess: boolean;
  data: T;
  message: string;
  errors?: string[];
}
