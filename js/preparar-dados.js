// Obter lista de produtos mais vendidos
// dados: Dados recebidos do backend
// quantidade: Quantos dos mais vendidos
export function listarMaisVendidos(dados, quantidade){
    if(!("quantVendas" in dados[0])){
        console.log("Lista de objetos inválida.");
        return;
    }
    if(quantidade<2){
        console.log("Quantidade inválida, deve ser maior ou igual a 2.");
        return;
    }
    dados.sort((a, b) => b.quantVendas - a.quantVendas);
    if(dados.length>quantidade){
        dados.length=quantidade;
    }
    return dados;
}

// Obter lista de vendas de produtos por fornecedor
// cada elemento da lista é um objeto conforme o exemplo
// {
//  codigoFornecedor: "Fornecedor"
//  quantVendas: X
// }
export function listarVendasPorFornecedor(dados){
    let novaLista = []
    dados.forEach(a => {
        let existeNaNovaLista = false;
        novaLista.forEach(b => {
            if(b.codigoFornecedor==a.codigoFornecedor){
                b.quantVendas+=a.quantVendas;
                existeNaNovaLista=true;
            }
        });
        if(!existeNaNovaLista){
            novaLista.push({
                quantVendas:a.quantVendas,
                codigoFornecedor:a.codigoFornecedor
            });
        }
    });
    return novaLista;
}

// Obter a receita total dos produtos vendidos
export function calcularReceitaTotal(dados){
    let receita = 0;
    dados.forEach(produto=>{
        receita+=(produto.precoVenda*produto.quantVendas);
    });
    return receita;
}