var chartLabels = [7];
var chartData = [7];

var badhourslist = getCookie('badhourslist');
badhourslist = JSON.parse(badhourslist);

var firstIndex = badhourslist.length - 6;
for (var i = firstIndex; i <= badhourslist.length; i++){
    if (i > 0){
	chartLabels[i - 1] = badhourslist[i - 1][0];
	chartData[i - 1] = badhourslist[i - 1][1];
    }
}

console.log("hello")

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: chartLabels,
        datasets: [{
            label: 'Time',
            data: chartData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      responsive : false,
    }
});
