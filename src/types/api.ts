export type ApiResponse<T> = {
  code: string;
  data: T;
};

export type ApiError = {
  message: string;
};

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

export interface PaginatedApiResponse<T> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}
