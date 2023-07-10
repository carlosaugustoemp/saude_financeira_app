import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Conta } from 'src/app/models/conta';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-conta-update',
  templateUrl: './conta-update.component.html',
  styleUrls: ['./conta-update.component.css']
})
export class ContaUpdateComponent {
  contaSelecionada: string;
  conta: Conta = {
    id:         '',
    descricao:       '',
    tipoConta:       0
  }

  descricao: FormControl =  new FormControl(null, Validators.minLength(3));
  

  constructor(
    private service: ContaService,
    private toast:    ToastrService,
    private router:          Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void { 
    this.conta.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }


  findById(){
    this.service.findById(this.conta.id).subscribe( resposta => {
      this.conta = resposta;
      this.contaSelecionada = this.conta.tipoConta.toString();
    });
  }

  update(): void {
    this.conta.tipoConta = +this.contaSelecionada
    this.service.update(this.conta).subscribe(() => {
      this.toast.success('Conta atualizada com sucesso', 'Update');
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
