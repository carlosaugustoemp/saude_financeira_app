import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Conta } from 'src/app/models/conta';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-conta-create',
  templateUrl: './conta-create.component.html',
  styleUrls: ['./conta-create.component.css']
})
export class ContaCreateComponent implements OnInit {
  contaSelecionada: string;

  conta: Conta = {
    id:         '',
    descricao:    '',
    tipoConta:  0
  }

  descricao: FormControl = new FormControl(null, Validators.required);

  constructor(
    private service: ContaService,
    private toast:    ToastrService,
    private router:          Router,
    ) { }

  ngOnInit(): void { }

  create(): void {
      this.conta.tipoConta = +this.contaSelecionada
      this.service.create(this.conta).subscribe(() => {
      this.toast.success('Conta cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['contas'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }
 
   validaCampos(): boolean {
     return this.descricao.valid
  
   }



}
