import { Component } from '@angular/core';
import { DespesaPorContaService } from 'src/app/services/despesaPorConta.service';
import { SaldoTotalService } from 'src/app/services/saldoTotal.service';


@Component({
  selector: 'app-saldo-total',
  templateUrl: './saldo-total.component.html',
  styleUrls: ['./saldo-total.component.css']
})
export class SaldoTotalComponent {
	dataInicial: Date;
	dataFinal: Date;
	dtInicialEnviar: string;
	dtFinalEnviar: string;

	single: any[];
	view: [number,number] = [1200, 200];
	gradient: boolean = true;
	showLegend: boolean = true;
	showLabels: boolean = true;
	isDoughnut: boolean = false;
	legendPosition: string = 'below';

	colorScheme = {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
	  };
  
	onSelect(data): void {
	  console.log('Item clicked', JSON.parse(JSON.stringify(data)));
	}
  
	onActivate(data): void {
	  console.log('Activate', JSON.parse(JSON.stringify(data)));
	}
  
	onDeactivate(data): void {
	  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
	}

	constructor(private service: SaldoTotalService) { }

	ngOnInit(): void {
		var date = new Date();
		this.dataInicial = new Date(date.getFullYear(), date.getMonth(), 1);
		this.dataFinal = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		this.findAll();
		this.view = [1200, 200];
	}

	onResize(event) {
		this.view = [event.target.innerWidth / 1.35, 400];
	}

	findAll(): void {
		this.defineDataInicio(this.dataInicial);
		this.defineDataFinal(this.dataFinal)
		this.service.findSaldoTotal(this.dtInicialEnviar, this.dtFinalEnviar).subscribe(resposta => {
		this.single = resposta;
		})
	}

	defineDataInicio(dtInicial: Date){
		const dia = dtInicial.getDate().toString().padStart(2,'0')
		const mes = String(this.dataInicial.getMonth() + 1).padStart(2,'0')
		const ano = this.dataInicial.getFullYear() 
		this.dtInicialEnviar = dia+"/"+mes+"/"+ano
	}

	defineDataFinal(dtFinal: Date){
		const dia2 = dtFinal.getDate().toString().padStart(2,'0')
		const mes2 = String(this.dataFinal.getMonth() + 1).padStart(2,'0')
		const ano2 = this.dataFinal.getFullYear() 
		this.dtFinalEnviar = dia2+"/"+mes2+"/"+ano2
	}

	Ok(){
		this.findAll();
	}


}
