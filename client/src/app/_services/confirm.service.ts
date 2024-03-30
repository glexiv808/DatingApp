import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { config } from 'process';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModelRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  confirm(title = 'Confirmation', 
    message = 'Are u sure you want to do this ?', 
    btnOktext= 'Ok', 
    btnCancelText= 'Cancel'): Observable<boolean>{
      const config = {
        initialState: {
          title,
          message,
          btnOktext,
          btnCancelText
        }
      }
    this.bsModelRef = this.modalService.show(ConfirmDialogComponent, config);

    return new Observable<boolean>(this.getResult());
  }

  private getResult() {
    return (observable) => {
      const subscription = this.bsModelRef.onHidden.subscribe(() => {
        observable.next(this.bsModelRef.content.result);
        observable.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      }
    }
  }
}

