import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuardGuard } from './guards/login-guard.guard';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canLoad: [loginGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
