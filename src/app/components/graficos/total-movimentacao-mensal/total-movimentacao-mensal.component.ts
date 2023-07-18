import { Component } from '@angular/core';
import { TotalMovimentacaoMensalService } from 'src/app/services/totalMovimentacaoMensal.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-total-movimentacao-mensal',
  templateUrl: './total-movimentacao-mensal.component.html',
  styleUrls: ['./total-movimentacao-mensal.component.css']
})
export class TotalMovimentacaoMensalComponent {
	dataInicial: Date;
	dataFinal: Date;
	dtInicialEnviar: string;
	dtFinalEnviar: string;
  multi:any[]
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Ano/mês';
  yAxisLabel: string = 'Valor';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  
  constructor(private service: TotalMovimentacaoMensalService,
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

  onSelect(data): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

	findAll(): void {
		this.defineDataInicio(this.dataInicial);
		this.defineDataFinal(this.dataFinal)
		this.service.findTotalMovimentacao(this.dtInicialEnviar, this.dtFinalEnviar).subscribe(resposta => {
		this.multi = resposta;
    console.log(this.multi);
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
