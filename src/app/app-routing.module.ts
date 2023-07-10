import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ContaListComponent } from './components/contas/conta-list/conta-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ContaCreateComponent } from './components/contas/conta-create/conta-create.component';
import { ContaUpdateComponent } from './components/contas/conta-update/conta-update.component';
import { ContaDeleteComponent } from './components/contas/conta-delete/conta-delete.component';
import { LancamentoListComponent } from './components/lancamento/lancamento-list/lancamento-list.component';
import { LancamentoCreateComponent } from './components/lancamento/lancamento-create/lancamento-create.component';
import { LancamentoUpdateComponent } from './components/lancamento/lancamento-update/lancamento-update.component';
import { LancamentoDeleteComponent } from './components/lancamento/lancamento-delete/lancamento-delete.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',component:NavComponent, canActivate:[AuthGuard], children: [
    {path:'home', component: HomeComponent},

    {path:'contas', component: ContaListComponent},
    {path:'contas/create', component: ContaCreateComponent},
    {path:'contas/update/:id', component: ContaUpdateComponent},
    {path:'contas/delete/:id', component: ContaDeleteComponent},

    {path:'lancamentos', component: LancamentoListComponent},
    {path:'lancamentos/create', component: LancamentoCreateComponent},
    {path:'lancamentos/update/:id', component: LancamentoUpdateComponent},
    {path:'lancamentos/delete/:id', component: LancamentoDeleteComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
