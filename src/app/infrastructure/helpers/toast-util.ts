import {ToastrService} from "ngx-toastr";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ToastUtil {

  constructor(
    private toastr: ToastrService,
  ) { }

  showSuccess(message: string, titleMessage: string = "Success") {
    this.toastr.success("gsdgsdg", titleMessage, {
      timeOut: 3000
    });
  }

  showError(message: string, titleMessage: string = "Error") {
    this.toastr.error(message, titleMessage, {
      timeOut: 3000
    });
  }

  showWarning(message: string, titleMessage: string = "Warning") {
    this.toastr.warning(message, titleMessage, {
      timeOut: 3000
    });
  }

  showInfo(message: string, titleMessage: string = "Info") {
    this.toastr.info(message, titleMessage, {
      timeOut: 3000,
    });
  }

}
