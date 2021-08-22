var graphThreelabelX = [];
var graphThreeDataInY = [];
var graphThreeDataOutY = [];
var timer;
var timer1;

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
    timer = setInterval(tcpInGet,1000);
    timer1 = setInterval(tcpOutGet,1000);
  });

  document.getElementById("botaoParar").addEventListener('click',function (){
    console.log("Parando Monitoramento!");
    clearInterval(timer);
    clearInterval(timer1);
    graphThreelabelX = [];
    graphThreeDataInY = [];
    graphThreeDataOutY = [];
  });

  function tcpInGet(){
      $.ajax({
        url:"udpInGet.php",
        data: "",
        method: "POST",
        success: function(res){
            var dateTime = new Date();
            graphThreelabelX.push(dateTime.toLocaleString());
            graphThreeDataInY.push(res);
            myChart.update();
        }
      })
  }

  function tcpOutGet(){

      $.ajax({
        url:"udpOutGet.php",
        data: "",
        method: "POST",
        success: function(res){
          console.log(res);
            var dateTime = new Date();
            graphThreelabelX.push(dateTime.toLocaleString());
            graphThreeDataOutY.push(res);
            myChart.update();
        }
      })
  }