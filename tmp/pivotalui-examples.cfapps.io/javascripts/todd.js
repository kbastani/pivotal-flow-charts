$( document ).ready(function() {

  var options = {
    //segmentShowStroke: false,
    percentageInnerCutout: 70,
    //animation: true,
    animationEasing: 'easeOutQuint',
    segmentShowStroke : false,
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    //animateRotate: false,
  };
  var data = {
    chart_1: [
      { value: 5, color: "#C3F4FF" },
      { value: 95, color: "#49A8D5" }
    ],
    chart_2: [
      { value: 90, color: "#FF434C" },
      { value: 10, color: "#FEBFC1" }
    ],
    chart_3: [
      { value: 90, color: "#49A8D5" },
      { value: 10, color: "#C3F4FF" }
    ],
    chart_4: [
      { value: 60, color: "#FF434C" },
      { value: 40, color: "#FEBFC1" }
    ],
    chart_5: [
      { value: 50, color: "#49A8D5" },
      { value: 50, color: "#C3F4FF" }
    ],
    chart_6: [
      { value: 75, color: "#FF434C" },
      { value: 25, color: "#FEBFC1" }
    ]
  };

  var offset = 0;
  $.each(data, function(key, data) {
    var canvas = document.querySelector('#' + key);
    if(canvas) {
      offset += 250;
      setTimeout(function() {
        var ctx = canvas.getContext('2d');
        var chart = new Chart(ctx);
        chart.Doughnut(data, options);
      }, offset);
    }
  });

});
