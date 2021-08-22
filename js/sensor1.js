var graphOnelabelX = [];
var graphOneDataInY = [];
var graphOneDataOutY = [];

var timer;
var timer1;
var dateTime = new Date();
var rangeIn = 0;
var rangeOut = 0;

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
    graphOnelabelX.length = 0;
    graphOneDataInY.length = 0;
    graphOneDataOutY.length = 0;  
    timer = setInterval(tcpInGet,1000);
    timer1 = setInterval(tcpOutGet, 1000);
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
        success: function(response){

          if(rangeIn === 0) {
            rangeIn = response;
          } else {
            rangeIn = response - rangeIn;
            graphOneDataInY.push(rangeIn);
            myChart.update();
          }
          graphOnelabelX.push(dateTime.toLocaleString());
          rangeIn = response;
        }
        
      })
  }

  function tcpOutGet(){

      $.ajax({
        url:"tcpoutGet.php",
        data: "",
        method: "POST",
        success: function(response) {

          if(rangeOut === 0){
            rangeOut = response
          }else{
            rangeOut = response - rangeOut;
            graphOneDataOutY.push(rangeOut);
            myChart.update();
          }
          graphOnelabelX.push(dateTime.toLocaleString());

          rangeOut = response;

        }
      })
  }