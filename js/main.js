// Mock de backend de estoque
import getProdutos from "./api-estoque.js";
// Funções para preparar e transformar dados
import { listarMaisVendidos, listarVendasPorFornecedor, calcularReceitaTotal } from "./preparar-dados.js";
// Cores definidas no root
import colors from "./colors.js";

// Guardar dados recebidos de GET /produtos
let dadosProdutos = [];

// Carregar API do Google Charts
google.charts.load("current", {"packages":["corechart"]});

// Após carregar, chamar a função principal
google.charts.setOnLoadCallback(main);

// Criar gráfico dos produtos mais vendidos
// o parametro quant se refere aos X mais vendidos
function criarGraficoMaisVendidos(quant){
    if(quant<2){
        quant=2;
    }
    if(quant>5){
        quant=5;
    }
    let dadosFiltrados = listarMaisVendidos(dadosProdutos, quant);
    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn("string", "Produto");
    dataTable.addColumn("number", "Quantidade");
    dadosFiltrados.forEach(produto => {
        dataTable.addRow([produto.nome, produto.quantVendas]);
    });

    // Opções do gráfico
    var options = {title:"Vendas / produto",
                    titleTextStyle:{color: colors.primaryTextColor,fontSize:35, fontName:"Arial"},
                    backgroundColor: colors.cardBgColor,
                    chartArea:{left:20,top:100,width:700,height:500},
                    width:600,
                    height:430,
                    legend:{position: "right", "textStyle": {color: colors.primaryTextColor, fontSize: 20},alignment:"center"},
                    fontSize:20,
                    pieSliceBorderColor:"black",
                    pieSliceText:"value",
                    pieSliceTextStyle:{color: "#000000",fontName:"Arial", fontSize:30},
                    colors: [
                        colors.palette1.color1,
                        colors.palette1.color2,
                        colors.palette1.color3,
                        colors.palette1.color4,
                        colors.palette1.color5,
                    ]
                };

    // Instanciar o gráfico
    var chart = new google.visualization.PieChart(document.getElementById("chart1"));

    // Desenhar
    chart.draw(dataTable, options);
}

// Criar gráficos de vendas mensal
function criarGraficosVendasMensal(){
    let dataTableArray = [
        ["Mês","Vendas"]
    ];
    // Mock
    dataTableArray.push(["Janeiro",10]);
    dataTableArray.push(["Fevereiro",13]);
    dataTableArray.push(["Março",7]);
    dataTableArray.push(["Abril",10]);
    dataTableArray.push(["Maio",20]);
    dataTableArray.push(["Junho",44]);
    dataTableArray.push(["Julho",11]);
    dataTableArray.push(["Agosto",10]);
    dataTableArray.push(["Setembro",35]);
    dataTableArray.push(["Outubro",40]);
    dataTableArray.push(["Novembro",10]);
    dataTableArray.push(["Dezembro",10]);

    var dataTable = google.visualization.arrayToDataTable(dataTableArray);

      var view = new google.visualization.DataView(dataTable);
      view.setColumns([0, 1,{ calc: "stringify",sourceColumn: 1,type: "string",role: "annotation" }]);
      var options = {
        backgroundColor: colors.cardBgColor,
        colors:["#235189"],
        fontSize: 20,
        vAxis:{textStyle:{color:colors.primaryTextColor, fontSize:30}},
        hAxis:{textStyle:{color:colors.primaryTextColor, fontSize:30}},
        annotations:{style:"point"},
        annotations:{textStyle:{color:"#000000",bold:true}},
        title: "Vendas / mês",
        titleTextStyle: {color: colors.primaryTextColor,fontSize: 35},
        width: 1300,
        height: 450,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("chart3"));
      chart.draw(view, options);
}

// Criar gráfico de vendas por fornecedor
function criarGraficoVendasPorFornecedor(){
    let dataTableArray = [
        ["Fornecedor","Vendas"]
    ];
    let listaVendasPorFornecedor = listarVendasPorFornecedor(dadosProdutos);
    listaVendasPorFornecedor.forEach(a =>{
        dataTableArray.push([a.codigoFornecedor,a.quantVendas]);
    });
    var dataTable = google.visualization.arrayToDataTable(dataTableArray);

      var view = new google.visualization.DataView(dataTable);
      view.setColumns([0, 1,{ calc: "stringify",sourceColumn: 1,type: "string",role: "annotation" }]);
      var options = {
        backgroundColor: colors.cardBgColor,
        colors:["#235189"],
        fontSize: 20,
        vAxis:{textStyle:{color:colors.primaryTextColor, fontSize:30}},
        hAxis:{textStyle:{color:colors.primaryTextColor, fontSize:30}},
        annotations:{style:"point"},
        annotations:{textStyle:{color:"#000000",bold:true}},
        title: "Vendas / fornecedor",
        titleTextStyle: {color: colors.primaryTextColor,fontSize: 35},
        width: 700,
        height: 500,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("chart2"));
      chart.draw(view, options);
}

// Criar os gráficos do dashboard e renderizar na tela
function criarGraficos() {
    criarGraficoMaisVendidos(5);
    criarGraficosVendasMensal();
    criarGraficoVendasPorFornecedor();
}

// Entrada, chamada por google.charts.setOnLoadCallback(main)
function main(){
    dadosProdutos=getProdutos();
    if(dadosProdutos.length>0){
        console.log(dadosProdutos);
        criarGraficos();
        document.getElementById("receita-value").textContent=`R$ ${calcularReceitaTotal(dadosProdutos)}`;
    }
}