import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentComponent } from './agent/agent.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from "./shared/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  //{ path: 'agent', component: AgentComponent, canActivate: [AuthGuard] },
  { path: 'member', component: MembersComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
