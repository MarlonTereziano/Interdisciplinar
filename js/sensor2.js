const graphTwolabelX = [];
const graphTwoDataInY = [];
const graphTwoDataOutY = [];
var timer;
var timer1;

const graphTwoData = {
    labels: graphTwolabelX,
    datasets: [
      {
      label: 'Ativas',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: graphTwoDataInY,
    },
    {
      label: 'Passivas',
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)',
      data: graphTwoDataOutY,
    }
    ]
  };

  const configTwo = {
    type: 'line',
    data: graphTwoData,
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
            text: 'Aberturas TCP'
          }
        }
      }
    },
  };

  var myChart = new Chart(document.getElementById('graph2'), configTwo);

  //botoes

  document.getElementById("botaoIniciar").addEventListener('click',function (){
    console.log("Iniciando Monitoramento!");
    timer = setInterval(tcpInGet,2000);
    timer1 = setInterval(tcpOutGet,2000);
  });

  document.getElementById("botaoParar").addEventListener('click',function (){
    console.log("Parando Monitoramento!");
    clearInterval(timer);
    clearInterval(timer1);
  });

  function tcpInGet(){
      $.ajax({
        url:"tcpAGet.php",
        data: "",
        method: "POST",
        success: function(res){
            var dateTime = new Date();
            graphTwolabelX.push(dateTime.toLocaleString());
            graphTwoDataInY.push(res);
            myChart.update();
        }
      })
  }

  function tcpOutGet(){

      $.ajax({
        url:"tcpPGet.php",
        data: "",
        method: "POST",
        success: function(res){
          console.log(res);
            var dateTime = new Date();
            graphTwolabelX.push(dateTime.toLocaleString());
            graphTwoDataOutY.push(res);
            myChart.update();
        }
      })
  }