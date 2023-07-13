import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Conta } from 'src/app/models/conta';
import { Lancamento } from 'src/app/models/lancamento';
import { ContaService } from 'src/app/services/conta.service';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-lancamento-create',
  templateUrl: './lancamento-create.component.html',
  styleUrls: ['./lancamento-create.component.css']
})
export class LancamentoCreateComponent {
  tipoLancamentoSelecionado: string;
  lancamentodata: Date ;

  lancamento: Lancamento = {
    tipoConta: '',
    valor: 0,
    data: ' ',
    contaEntrada: { id: 0 ,descricao:'', tipoConta: 0} ,
    contaSaida: { id: 0 ,descricao:'', tipoConta: 0} ,
    observacao: ''
  }

  contas: Conta[] = []

  valor: FormControl = new FormControl(null, [Validators.required]);
  contaEntrada:    FormControl = new FormControl(null, [Validators.required]);
  contaSaida:    FormControl = new FormControl(null, [Validators.required]);
  observacao:FormControl = new FormControl(null, [Validators.required]);
  
  constructor(
    private lancamentoService: LancamentoService,
    private contaService: ContaService,
    private toastService:    ToastrService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
   }

  ngOnInit(): void {
    this.findAllContas();
  }

  create(): void {
    this.lancamento.tipoConta = this.tipoLancamentoSelecionado;
    const dia = this.lancamentodata.getDate().toString().padStart(2,'0')
    const mes = String(this.lancamentodata.getMonth() + 1).padStart(2,'0')
    const ano = this.lancamentodata.getFullYear() 
    this.lancamento.data =dia+"/"+mes+"/"+ano
    this.lancamentoService.create(this.lancamento).subscribe(resposta => {
      this.toastService.success('Lancamento criado com sucesso', 'Novo lancamento');
      this.router.navigate(['lancamentos']);
    }, ex => {
      console.log(ex);
      
      this.toastService.error(ex.error.error);
    })
   
  }

  findAllContas(): void {
    this.contaService.findAll().subscribe(resposta => {
      this.contas = resposta;
    })
  }

  validaCampos(): boolean {
    return this.valor.valid && this.contaEntrada.valid 
       && this.contaSaida.valid && this.observacao.valid 
  }

}
