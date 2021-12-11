export abstract class MyRequest<T> {
  abstract data: T | null;
  abstract errorMessage: string | null;

  isData: boolean = false;
  isError: boolean= false;
  isLoading: boolean= false;
}

export class MyRequestLoading<T> extends MyRequest<T> {
  data: T | null;
  errorMessage: string | null;

  constructor() {
    super();
    this.data = null;
    this.errorMessage = null
    this.isLoading = true;
  }
}

export class MyRequestError<T> extends MyRequest<T>{
  data: T | null;
  errorMessage: string;

  constructor(errorMessage: string) {
    super();
    this.data = null;
    this.errorMessage = errorMessage;
    this.isError = true;
  }
}

export class MyRequestData<T> extends MyRequest<T> {
  data: T;
  errorMessage: string | null;
  constructor(data: T) {
    super();
    this.data = data;
    this.errorMessage = null;
    this.isData = true;
  }
}
