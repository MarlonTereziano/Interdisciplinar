var graphTwolabelX = [];
var graphTwoDataInY = [];
var graphTwoDataOutY = [];
var timer;
var timer1;
var dateTime = new Date();
var rangeIn = 0;
var rangeOut = 0;

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
    graphTwolabelX.length = 0;
    graphTwoDataInY.length = 0;
    graphTwoDataOutY.length = 0;
    timer = setInterval(tcpInGet,1300);
    timer1 = setInterval(tcpOutGet,1300);
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
        success: function(response){
            // var dateTime = new Date();
            // graphTwolabelX.push(dateTime.toLocaleString());
            // graphTwoDataInY.push(res);
            // myChart.update();

            if(rangeIn === 0) {
              rangeIn = response;
            } else {
              rangeIn = response - rangeIn;
              graphTwoDataInY.push(rangeIn);
              myChart.update();
            }
            graphTwolabelX.push(dateTime.toLocaleString());
            rangeIn = response;
          }
        
      })
  }

  function tcpOutGet(){

      $.ajax({
        url:"tcpPGet.php",
        data: "",
        method: "POST",
        success: function(response){
          if(rangeOut === 0){
            rangeOut = response
          }else{
            rangeOut = response - rangeOut;
            graphTwoDataOutY.push(rangeOut);
            myChart.update();
          }
          graphTwolabelX.push(dateTime.toLocaleString());

          rangeOut = response;

        }
      })
  }