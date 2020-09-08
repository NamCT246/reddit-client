import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ToasterPosition } from './constants/toaster';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  public error(
    message: string,
    positionClass: ToasterPosition = ToasterPosition.bottomRight,
    title: string = ''
  ) {
    this.toastr.error(message, title, { positionClass });
  }

  public info(
    message: string,
    positionClass: ToasterPosition = ToasterPosition.bottomRight,
    title: string = ''
  ) {
    this.toastr.info(message, title, { positionClass });
  }

  public success(
    message: string,
    positionClass: ToasterPosition = ToasterPosition.bottomRight,
    title: string = ''
  ) {
    this.toastr.success(message, title, { positionClass });
  }
}
