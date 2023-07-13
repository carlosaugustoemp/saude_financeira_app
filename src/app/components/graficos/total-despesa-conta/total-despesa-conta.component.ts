import { Component } from '@angular/core';
import { DespesaPorContaService } from 'src/app/services/despesaPorConta.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-total-despesa-conta',
  templateUrl: './total-despesa-conta.component.html',
  styleUrls: ['./total-despesa-conta.component.css']
})
export class TotalDespesaContaComponent {
	dataInicial: Date;
	dataFinal: Date;
	dtInicialEnviar: string;
	dtFinalEnviar: string;

	single = [];
	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = false;
	showXAxisLabel = true;
	xAxisLabel = 'Total por Conta';
	showYAxisLabel = true;
	yAxisLabel = 'Valor gasto';
	showGridLines = true;
	showDataLabel = true;
	roundDomains = true;

	colorScheme = {
	  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
	};

	view: [number,number] = [1200, 700];

	onSelect(event) {
	}
	constructor(private service: DespesaPorContaService,
		private dateAdapter: DateAdapter<Date>) {
		this.dateAdapter.setLocale('en-GB');
	 }

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
		this.service.findTotalDespesaConta(this.dtInicialEnviar, this.dtFinalEnviar).subscribe(resposta => {
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
