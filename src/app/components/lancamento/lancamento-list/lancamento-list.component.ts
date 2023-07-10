import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Lancamento } from 'src/app/models/lancamento';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-lancamento-list',
  templateUrl: './lancamento-list.component.html',
  styleUrls: ['./lancamento-list.component.css']
})
export class LancamentoListComponent {

  ELEMENT_DATA: Lancamento[] = []
  FILTERED_DATA: Lancamento[] = []

  displayedColumns: string[] = ['id', 'tipoConta', 'descricaoTipoConta', 'valor', 'contaEntrada','contaEntradaDescricao', 'contaSaida','contaSaidaDescricao', 'data', 'observacao', 'acoes'];
  dataSource = new MatTableDataSource<Lancamento>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: LancamentoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Lancamento>(resposta);
      this.dataSource.paginator = this.paginator;

      console.log("Lancamentos recebidos");
      console.log(resposta);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaDescricaoTipoConta(tipoConta: any): string {
    if(tipoConta == '0') {
      return 'Remuneração'
    } else if(tipoConta == '1') {
      return 'Despesa'
    } else {
      return 'Transferência'
    }
  }

}
