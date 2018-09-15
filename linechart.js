/*
let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };
*/
function InitChart(w, h) {
  var data = [{
  }];
  var data2 = [{
  }];

  var vis = d3.select("#visualisation"),
  WIDTH = w,
  HEIGHT = h,
  MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  },
  xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 50]),
  yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 30]),
  xAxis = d3.svg.axis()
  .scale(xScale),
  yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");

  vis.append("svg:g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
  .call(xAxis);
  vis.append("svg:g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + (MARGINS.left) + ",0)")
  .call(yAxis);
  var lineGen = d3.svg.line()
  .x(function(d) {
    return xScale(d.year);
  })
  .y(function(d) {
    return yScale(d.sale);
  })
  .interpolate("basis");
  vis.append('svg:path')
  .attr('d', lineGen(data))
  .attr('stroke', 'green')
  .attr('stroke-width', 2)
  .attr('fill', 'none');
  vis.append('svg:path')
  .attr('d', lineGen(data2))
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('fill', 'none');
}
