import { Injectable } from '@angular/core';
import { ToasterPosition } from '@app/constants/toaster/toaster';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  public error(
    message: string,
    positionClass: string = ToasterPosition.bottomRight,
    title: string = ''
  ) {
    this.toastr.error(message, title, { positionClass });
  }

  public info(
    message: string,
    positionClass: string = ToasterPosition.bottomRight,
    title: string = ''
  ) {
    this.toastr.info(message, title, { positionClass });
  }

  public success(
    message: string,
    positionClass: string = ToasterPosition.bottomRight,
    title: string = ''
  ) {
    this.toastr.success(message, title, { positionClass });
  }
}
