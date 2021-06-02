import { Component, ElementRef, OnInit, ViewChild, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent implements OnInit {

  isShowingModal: boolean = false;
  public shownModal!: ModalComponent;

  public get template(): TemplateRef<any> {
    return this.shownModal?.template;
  }

  @ViewChild("overlay")
  overlay!: ElementRef<HTMLDivElement>;

  @ViewChild("container")
  container!: ElementRef<HTMLDivElement>;

  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    modalService.registerModalContainer(this);
  }

  async show(modal: ModalComponent) {

    if (this.shownModal) {
      await this.hideContainer();
    }

    this.overlay.nativeElement.style.display = 'flex';
    this.showContainer();
    setTimeout(() => {
      this.overlay.nativeElement.style.opacity = '1';
      this.overlay.nativeElement.style.transition = 'all ease 0.12s';
    }, 0);
    //-
    this.shownModal = modal;
    this.isShowingModal = true;
  }

  hide(modal: ModalComponent) {
    this.overlay.nativeElement.style.transition = 'all ease 0.12s';
    this.overlay.nativeElement.style.opacity = '0';
    this.hideContainer();
    setTimeout(() => {
      this.overlay.nativeElement.style.display = 'none';
    }, 120);
    //-
    this.isShowingModal = false;
  }

  overlayClicked(e: any) {
    if (!e.path.includes(this.container.nativeElement)) {
      this.hide(this.shownModal);
    }
  }

  private showContainer(): Promise<null> {
    return new Promise((resolve, reject) => {
      this.container.nativeElement.style.opacity = '1';
      this.container.nativeElement.style.marginTop = '0';
      this.container.nativeElement.style.transition = 'all ease 0.12s';
      setTimeout(() => { return resolve(null) }, 120);
    })
  }

  private hideContainer(): Promise<null> {
    return new Promise((resolve, reject) => {
      this.container.nativeElement.style.opacity = '0';
      this.container.nativeElement.style.marginTop = '-24px';
      this.container.nativeElement.style.transition = 'all ease 0.12s';
      setTimeout(() => { return resolve(null) }, 120);
    })
  }


  ngOnInit(): void {

  }

}
