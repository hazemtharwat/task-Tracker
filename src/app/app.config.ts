import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideNativeDateAdapter(),
     provideFirebaseApp(() => initializeApp({ apiKey: "xxxxx",
      authDomain: "xxxxx",
      projectId: "xxxxx",
      storageBucket: "xxxxx",
      messagingSenderId: "xxxxx",
      appId: "xxxxx"})), provideFirestore(() => getFirestore()),
  ]
};
