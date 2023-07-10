import { Component } from '@angular/core';
import { DespesaPorContaService } from 'src/app/services/despesaPorConta.service';


@Component({
  selector: 'app-total-despesa-conta',
  templateUrl: './total-despesa-conta.component.html',
  styleUrls: ['./total-despesa-conta.component.css']
})
export class TotalDespesaContaComponent {

	single = [];
	single2 = [];
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
	constructor(private service: DespesaPorContaService) { }

	ngOnInit(): void {
	this.findAll();
		this.view = [1200, 200];
	}

	onResize(event) {
		this.view = [event.target.innerWidth / 1.35, 400];
	}

	findAll(): void {
		this.service.findTotalDespesaConta().subscribe(resposta => {
		this.single = resposta;
		this.single2 = resposta;
		})
	}

}
