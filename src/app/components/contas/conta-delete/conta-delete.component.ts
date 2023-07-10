import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Conta } from 'src/app/models/conta';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-conta-delete',
  templateUrl: './conta-delete.component.html',
  styleUrls: ['./conta-delete.component.css']
})
export class ContaDeleteComponent implements OnInit {
  contaSelecionada: string;
  conta: Conta = {
    id:         '',
    descricao:       '',
    tipoConta:        0
  }


  constructor(
    private service: ContaService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.conta.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.conta.id).subscribe(resposta => {
      this.conta = resposta;
      this.contaSelecionada = this.conta.tipoConta.toString();
      })
  }

  delete(): void {
    this.service.delete(this.conta.id).subscribe(() => {
      this.toast.success('Conta deletada com sucesso', 'Delete');
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

}
