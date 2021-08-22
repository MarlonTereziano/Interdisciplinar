var graphFourlabelX = [];
var graphFourDataInY = [];
var graphFourDataOutY = [];
var timer;
var timer1;

const graphFourData = {
    labels: graphFourlabelX,
    datasets: [
      {
      label: 'Recebidas',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: graphFourDataInY,
    },
    {
      label: 'Mandadas',
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)',
      data: graphFourDataOutY,
    }
    ]
  };

  const configFour = {
    type: 'line',
    data: graphFourData,
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
            text: 'Quantidade de mensagens snmp'
          }
        }
      }
    },
  };

  var myChart = new Chart(document.getElementById('graph4'), configFour);

  //botoes

  document.getElementById("botaoIniciar").addEventListener('click',function (){
    console.log("Iniciando Monitoramento!");
    timer = setInterval(tcpInGet,200);
    timer1 = setInterval(tcpOutGet,200);
  });

  document.getElementById("botaoParar").addEventListener('click',function (){
    console.log("Parando Monitoramento!");
    clearInterval(timer);
    clearInterval(timer1);
    graphFourlabelX = [];
    graphFourDataInY = [];
    graphFourDataOutY = [];
  });

  function tcpInGet(){
      $.ajax({
        url:"snmpOutGet.php",
        data: "",
        method: "POST",
        success: function(res){
            var dateTime = new Date();
            graphFourlabelX.push(dateTime.toLocaleString());
            graphFourDataInY.push(res);
            myChart.update();
        }
      })
  }

  function tcpOutGet(){

      $.ajax({
        url:"snmpInGet.php",
        data: "",
        method: "POST",
        success: function(res){
          console.log(res);
            var dateTime = new Date();
            graphFourlabelX.push(dateTime.toLocaleString());
            graphFourDataOutY.push(res);
            myChart.update();
        }
      })
  }