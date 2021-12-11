export interface PaginationClassDto<T> {
  elements: Array<T>;
  elementsPerPage: number;
  page: number;
}
