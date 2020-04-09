import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() foo: boolean;
  constructor(private modalCtrl: ModalController) {
    console.log('foo is: ', this.foo);
  }

  ngOnInit() {
  }

  toggleFoo(): void {
    this.modalCtrl.dismiss({
      foo: !this.foo
    })
  }

  dismissModal(): void {
    this.modalCtrl.dismiss();
  }

}
