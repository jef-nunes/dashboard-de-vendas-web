// Mock
export default function getProdutos(){
    const dados = [
        {
            "nome":"Mouse Gamer",
            "codigoFornecedor": "ABC123",
            "precoVenda": 85.99,
            "quantDisponivel": 30,
            "quantVendas": 98
        },
        {
            "nome":"Teclado Gamer",
            "codigoFornecedor": "DEF456",
            "precoVenda": 120,
            "quantDisponivel": 15,
            "quantVendas": 70
        },
        {
            "nome":"Tablet",
            "codigoFornecedor": "ABC123",
            "precoVenda": 400,
            "quantDisponivel": 9,
            "quantVendas":3
        },
        {
            "nome":"Pendrive",
            "codigoFornecedor": "ABC123",
            "precoVenda": 32.99,
            "quantDisponivel": 40,
            "quantVendas":35
        },
        {
            "nome":"Smartphone",
            "codigoFornecedor": "GHI789",
            "precoVenda": 900,
            "quantDisponivel": 27,
            "quantVendas":14
        }
    ];
    return dados;
}