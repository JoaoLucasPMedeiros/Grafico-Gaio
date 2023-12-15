/*VARIAVIES   */
let mes             = [];
let orcado          = [];
let real            = [];
let fore            = [];
let ating           = [];
let tabela          = context.sum_EvolutivoMensal;
let totalizador     = [1];
let titulo          = "Contagem Evolutivo"
let                  chart;

/*PEGAR VALOR DA OPTION*/
function obterValorSelecionado() {
    const select = document.getElementById("lista");
    const valorSelecionado = select.value;

    if (valorSelecionado === 'sum') {
        
        tabela = context.sum_EvolutivoMensal;
        totalizador = [3];
        titulo      = "Suma Evolutivo"
        
    } else {
        
        tabela      = context.count_EvolutivoMensal;
        totalizador = [1];
        titulo      = "Contagem Evolutivo"

    }

    // Atualiza o gráfico após modificar a variável tabela
    atualizarGrafico();
}

function preencherArrays() {
    mes = [];
    orcado = [];
    real = [];
    fore = [];
    ating = [];

    for (let d = 0; d < tabela.length; d++) {
        mes.push(tabela[d].MES_REFERENCIA);
        orcado.push(tabela[d].ORCADO);
        real.push(tabela[d].REAL);
        fore.push(tabela[d].FORECAST);
        ating.push(tabela[d].ATINGIMENTO);
    }
}

function atualizarGrafico() {
    preencherArrays();

    var options = {
        series: [
            {
                name: 'Orcado',
                type: 'column',
                data: orcado,
            },
            {
                name: 'Real',
                type: 'column',
                data: real,
            },
            {
                name: 'Forecast',
                type: 'column',
                data: fore,
            },
            {
                name: 'Atingimento',
                type: 'line',
                data: ating,
                lineWidth: 8,
            },
        ],
        chart: {
            height: 350,
            type: 'line',
        },
        stroke: {
            width: [0, 4],
        },
        title: {
            text: titulo,
        },
        dataLabels: {
            enabled: true,
            // TOTALIZADOR
            enabledOnSeries: totalizador,
            formatter: function (val) {
                // Formate o totalizador aqui, por exemplo, substituindo ponto por vírgula
                return 'R$ ' + val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            },
        },
        labels: mes,
        xaxis: {
            grid: {},
        },
        yaxis: [
            {
                title: {
                    text: '',
                },
                labels: {
                  //VALOR FORMATADO
                    formatter: function (value) {
                        return 'R$ ' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    },
                },
            },
            {
                opposite: true,
                title: {},
                labels: {
                    formatter: function (value) {
                        return 'R$ ' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    },
                },
            },
        ],
    };

    // Remover e destruir o gráfico anterior
    if (chart) {
        chart.destroy();
    }

    // Criar e renderizar o novo gráfico
    chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

// Chame a função inicialmente para configurar o gráfico com os dados iniciais
atualizarGrafico();
