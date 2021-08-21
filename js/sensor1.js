const graphOnelabelX = [];
const graphOneDataInY = [];
const graphOneDataOutY = [];

var timer;
var timer1;
var dateTime = new Date();

  const graphOneData = {
    labels: graphOnelabelX,
    datasets: [
      {
      label: 'Entrada',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: graphOneDataInY,
    },
    {
      label: 'Saida',
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)',
      data: graphOneDataOutY,
    }
    ]
  };

  const configOne = {
    type: 'line',
    data: graphOneData,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Data e Hora'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Quantidade de protocolos TCPs'
          }
        }
      }
    },
  };

  var myChart = new Chart(document.getElementById('graph1'), configOne);

  //botoes

  document.getElementById("botaoIniciar").addEventListener('click',function (){
    console.log("Iniciando Monitoramento!");
    timer = setInterval(tcpInGet,1000);
    timer1 = setInterval(tcpOutGet,1000);
  });

  document.getElementById("botaoParar").addEventListener('click',function (){
    console.log("Parando Monitoramento!");
    clearInterval(timer);
    clearInterval(timer1);
  });

  function tcpInGet(){
      $.ajax({
        url:"tcpinGet.php",
        data: "",
        method: "POST",
        success: function(res){
            console.log(res);
            graphOnelabelX.push(dateTime.toLocaleString());
            graphOneDataInY.push(res);
            myChart.update();

        }
      })
  }

  function tcpOutGet(){

      $.ajax({
        url:"tcpoutGet.php",
        data: "",
        method: "POST",
        success: function(res){
          console.log(res);
            graphOnelabelX.push(dateTime.toLocaleString());
            graphOneDataOutY.push(res);
            myChart.update();
        }
      })
  }