import { Conta } from "./conta";

export interface Lancamento {
    id?: any;
    tipoConta: string;
    valor: number;
    data: string;
    contaEntrada: Conta;
    contaSaida: Conta;
    observacao: string;
}



