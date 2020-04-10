import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular'
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  foo = false;
  fooBeforeToggle = false;
  respondToChange = true;
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}
  ngOnInit(): void {
    this.fooBeforeToggle = this.foo;
  }
  handleChange(ev): void {
    // vvv THE WORKAROUND vvv
    if (this.respondToChange) {
      this.confirmToggle(this.fooBeforeToggle)
    }
    // ^^^ THE WORKAROUND ^^^
  }
  async confirmToggle(on: boolean): Promise<any> {
    const message = `Are you sure you want to turn foo ${(on) ? "off" : "on"}?`;
    const alert = await this.alertCtrl.create({
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.updateFoo(on);
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.presentModal()
          }
        }
      ]
    });
    await alert.present();
  }
  async presentModal(): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        foo: this.fooBeforeToggle
      }
    });
    await modal.present();
    modal.onDidDismiss().then((result) => {
      console.log('modal result: ', result);
      if (result.data && result.data.hasOwnProperty("foo")) {
        this.fooBeforeToggle = result.data.foo
        this.updateFoo(result.data.foo);
      } else {
        this.updateFoo(this.fooBeforeToggle);
      }
    })
  }
  private updateFoo(newFoo: boolean): void {
    this.respondToChange = false;
    this.foo = newFoo;
    setTimeout(() => (this.respondToChange = true), 0);
  }
}
