import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideNativeDateAdapter(), provideAnimations(),provideToastr(),
     provideFirebaseApp(() => initializeApp({ apiKey: "AIzaSyDy-MuXn3DJV6FyoSqgus_1kc2it92EY_Q",
      authDomain: "task-tracker-4b827.firebaseapp.com",
      projectId: "task-tracker-4b827",
      storageBucket:  "task-tracker-4b827.firebasestorage.app",
      messagingSenderId: "951407077086",
      appId: "1:951407077086:web:5a9135c0106325049b844f", 
      measurementId: "G-9G1YWQN4JW"})), provideFirestore(() => getFirestore()),
  ]
};
