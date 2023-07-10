import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Conta } from 'src/app/models/conta';
import { Lancamento } from 'src/app/models/lancamento';
import { ContaService } from 'src/app/services/conta.service';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-lancamento-delete',
  templateUrl: './lancamento-delete.component.html',
  styleUrls: ['./lancamento-delete.component.css']
})
export class LancamentoDeleteComponent {

  tipoLancamentoSelecionado: string;

  lancamento: Lancamento = {
    tipoConta: '',
    valor: 0,
    data: '',
    contaEntrada: { id: 0 ,descricao:'', tipoConta: 0} ,
    contaSaida: { id: 0 ,descricao:'', tipoConta: 0} ,
    observacao: ''
  }

  contas: Conta[] = []

  constructor(
    private lancamentoService: LancamentoService,
    private contaService: ContaService,
    private toast:    ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  findAllContas(): void {
    this.contaService.findAll().subscribe(resposta => {
      this.contas = resposta;
    })
  }
  ngOnInit(): void {
    this.lancamento.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllContas();
   }
  
  findById(): void {
    this.lancamentoService.findById(this.lancamento.id).subscribe(resposta => {
      this.lancamento = resposta;
      this.tipoLancamentoSelecionado = this.lancamento.tipoConta.toString()
      this.lancamento.contaSaida.id =this.lancamento.contaSaida.id.toString()
      this.lancamento.contaEntrada.id = this.lancamento.contaEntrada.id.toString()
  
      })
  }
  
  delete(): void {
    this.lancamentoService.delete(this.lancamento.id).subscribe(() => {
      this.toast.success('Lançamento deletado com sucesso', 'Delete');
      this.router.navigate(['lancamentos'])
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

