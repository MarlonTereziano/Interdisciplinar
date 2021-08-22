var graphThreelabelX = [];
var graphThreeDataInY = [];
var graphThreeDataOutY = [];
var timer;
var timer1;
var dateTime = new Date();
var rangeIn = 0;
var rangeOut = 0;

  const data = {
    labels: graphThreelabelX,
    datasets: [
      {
      label: 'Entrada',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: graphThreeDataInY,
    },
    {
      label: 'Saida',
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)',
      data: graphThreeDataOutY,
    }
    ]
  };

  const configThree = {
    type: 'line',
    data: data,
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
            text: 'Quantidade de pacotes UDP'
          }
        }
      }
    },
  };

  var myChart = new Chart(document.getElementById('graph3'), configThree);

  //botoes

  document.getElementById("botaoIniciar").addEventListener('click',function (){
    console.log("Iniciando Monitoramento!");
    graphThreelabelX.length = 0;
    graphThreeDataInY.length = 0;
    graphThreeDataOutY.length = 0;
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
        url:"udpInGet.php",
        data: "",
        method: "POST",
        success: function(response){           

            if(rangeIn === 0) {
              rangeIn = response;
            } else {
              rangeIn = response - rangeIn;
              graphThreeDataInY.push(rangeIn);
              myChart.update();
            }
            graphThreelabelX.push(dateTime.toLocaleString());
            rangeIn = response;
        }
      })
  }

  function tcpOutGet(){

      $.ajax({
        url:"udpOutGet.php",
        data: "",
        method: "POST",
        success: function(response){

            if(rangeOut === 0){
              rangeOut = response
            }else{
              rangeOut = response - rangeOut;
              graphThreeDataOutY.push(rangeOut);
              myChart.update();
            }
            graphThreelabelX.push(dateTime.toLocaleString());
            rangeOut = response;
            
        }
      })
  }