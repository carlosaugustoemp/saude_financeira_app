import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Conta } from 'src/app/models/conta';
import { Lancamento } from 'src/app/models/lancamento';
import { ContaService } from 'src/app/services/conta.service';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-lancamento-update',
  templateUrl: './lancamento-update.component.html',
  styleUrls: ['./lancamento-update.component.css']
})
export class LancamentoUpdateComponent {

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

  valor: FormControl = new FormControl(null, [Validators.required]);
  data:     FormControl = new FormControl(null, [Validators.required]);
  contaEntrada:    FormControl = new FormControl(null, [Validators.required]);
  contaSaida:    FormControl = new FormControl(null, [Validators.required]);
  observacao:FormControl = new FormControl(null, [Validators.required]);
  

  constructor(
    private lancamentoService: LancamentoService,
    private contaService: ContaService,
    private toastService:    ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.lancamento.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllContas();
  }

  findAllContas(): void {
    this.contaService.findAll().subscribe(resposta => {
      this.contas = resposta;
    })
  }

  findById(): void {
    this.lancamentoService.findById(this.lancamento.id).subscribe(resposta => {
      this.lancamento = resposta;
      this.tipoLancamentoSelecionado = this.lancamento.tipoConta.toString()
    this.lancamento.contaSaida.id =this.lancamento.contaSaida.id.toString()
    this.lancamento.contaEntrada.id = this.lancamento.contaEntrada.id.toString()

    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  update(): void {

    
    this.lancamento.tipoConta = this.tipoLancamentoSelecionado;

    this.lancamentoService.update(this.lancamento).subscribe(resposta => {
      this.toastService.success('Lançamento atualizado com sucesso', 'Atualizar lançamento');
      this.router.navigate(['lancamentos']);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  validaCampos(): boolean {
    return this.valor.valid && this.data.valid && this.contaEntrada.valid 
       && this.contaSaida.valid && this.observacao.valid 
  }
  
  
}
