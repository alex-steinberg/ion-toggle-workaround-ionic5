# Workaround for the IonToggle Ionic 5 component

As explained by [this issue](https://github.com/ionic-team/ionic/issues/19651), it is not natively possible to determine whether a toggle event was executed by the user or programmatically.

This app shows a use-case where this distinction is necessary and how to get around this limitation.

The important bit of the workaround is in `src/app/home/home.page.ts` on line 22.

## Usage

    git clone `https://.../` ion-toggle

    cd ion-toggle

    npm i

    ionic serve
