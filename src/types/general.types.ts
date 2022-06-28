export type AbsoluteUrl = string;
export type Timestamp = string;

export interface PaginatedResponse<T> {
  count: number;
  next: AbsoluteUrl | null;
  previous: AbsoluteUrl | null;
  results: Array<T>;
}
