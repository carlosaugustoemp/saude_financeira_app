import { Component } from '@angular/core';
import { DespesaPorContaService } from 'src/app/services/despesaPorConta.service';
import { SaldoTotalService } from 'src/app/services/saldoTotal.service';


@Component({
  selector: 'app-saldo-total',
  templateUrl: './saldo-total.component.html',
  styleUrls: ['./saldo-total.component.css']
})
export class SaldoTotalComponent {

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
	this.findAll();
		this.view = [1200, 200];
	}

	onResize(event) {
		this.view = [event.target.innerWidth / 1.35, 400];
	}

	findAll(): void {
		this.service.findSaldoTotal().subscribe(resposta => {
		this.single = resposta;
		})
	}

}
