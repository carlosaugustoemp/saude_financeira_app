import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Conta } from 'src/app/models/conta';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-conta-list',
  templateUrl: './conta-list.component.html',
  styleUrls: ['./conta-list.component.css']
})
export class ContaListComponent implements OnInit {

  ELEMENT_DATA: Conta[] = []
  //ELEMENT_DATA: Conta[] = [
  //  {id: 1, descricao:"Salário", tipoconta: "1", contasalario: false}
//
  //]

  displayedColumns: string[] = ['id', 'descricao', 'tipoConta', 'descricaoTipoConta','acoes'];
  dataSource = new MatTableDataSource<Conta>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ContaService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      console.log(resposta);
      this.dataSource = new MatTableDataSource<Conta>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaDescricaoTipoConta(tipoConta: any): string {
    if(tipoConta == '1') {
      return 'Receita'
    } else if(tipoConta == '2') {
      return 'Despesa'
    } else {
      return 'Transferência'
    }
  }

}
