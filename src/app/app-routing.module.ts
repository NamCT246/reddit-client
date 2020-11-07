import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '@components/auth/register/register.component';
import { LoginComponent } from '@components/auth/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from '@components/home/home.component';
import { PostViewer } from '@components/post/post-viewer.component';
import { AuthGuard } from '@components/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'posts/:id', component: PostViewer },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
