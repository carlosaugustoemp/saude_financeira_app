import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { ToastrModule } from 'ngx-toastr';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ContaListComponent } from './components/contas/conta-list/conta-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { ContaCreateComponent } from './components/contas/conta-create/conta-create.component';
import { ContaUpdateComponent } from './components/contas/conta-update/conta-update.component';
import { ContaDeleteComponent } from './components/contas/conta-delete/conta-delete.component';
import { LancamentoListComponent } from './components/lancamento/lancamento-list/lancamento-list.component';
import { LancamentoCreateComponent } from './components/lancamento/lancamento-create/lancamento-create.component';
import { LancamentoUpdateComponent } from './components/lancamento/lancamento-update/lancamento-update.component';
import { LancamentoDeleteComponent } from './components/lancamento/lancamento-delete/lancamento-delete.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TotalDespesaContaComponent } from './components/graficos/total-despesa-conta/total-despesa-conta.component';
import { SaldoTotalComponent } from './components/graficos/saldo-total/saldo-total.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    ContaListComponent,
    LoginComponent,
    ContaCreateComponent,
    ContaUpdateComponent,
    ContaDeleteComponent,
    LancamentoListComponent,
    LancamentoCreateComponent,
    LancamentoUpdateComponent,
    LancamentoDeleteComponent,
    TotalDespesaContaComponent,
    SaldoTotalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatRadioModule,
        MatTableModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        ToastrModule.forRoot({
          timeOut: 4000,
          closeButton: true,
          progressBar: true
        }),
        NgxChartsModule
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
