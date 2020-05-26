import * as d3 from 'd3'
const dataSet = [{"StartDate":"2020-05-25T00:00:00","Status":"On"},{"StartDate":"2020-05-25T01:03:00","Status":"On"},{"StartDate":"2020-05-25T02:06:00","Status":"On"},{"StartDate":"2020-05-25T03:09:00","Status":"On"},{"StartDate":"2020-05-25T04:12:00","Status":"On"},{"StartDate":"2020-05-25T05:15:00","Status":"On"},{"StartDate":"2020-05-25T06:18:00","Status":"On"},{"StartDate":"2020-05-25T07:21:00","Status":"On"},{"StartDate":"2020-05-25T08:24:00","Status":"On"},{"StartDate":"2020-05-25T09:27:00","Status":"On"},{"StartDate":"2020-05-25T10:30:00","Status":"On"},{"StartDate":"2020-05-25T11:33:00","Status":"On"},{"StartDate":"2020-05-25T12:36:00","Status":"On"},{"StartDate":"2020-05-25T13:39:00","Status":"On"},{"StartDate":"2020-05-25T14:42:00","Status":"On"},{"StartDate":"2020-05-25T15:45:00","Status":"On"},{"StartDate":"2020-05-25T16:48:00","Status":"On"},{"StartDate":"2020-05-25T17:51:00","Status":"On"},{"StartDate":"2020-05-25T18:54:00","Status":"On"},{"StartDate":"2020-05-25T19:57:00","Status":"On"},{"StartDate":"2020-05-25T21:00:00","Status":"On"},{"StartDate":"2020-05-25T22:03:00","Status":"On"},{"StartDate":"2020-05-25T23:06:00","Status":"On"},{"StartDate":"2020-05-26T00:09:00","Status":"On"}]
;

export default function draw_chart(){
    const data =[ 0, 2, 3, 5, 7.5, 9, 10 ];

    var myScale = d3.select('svg').scaleLinear()
  .domain([0, 10])
  .range([0, 600]);

}

export default function time_chart(){
    var data = [{
        "time": "01:00:00",
        "total": 1
    }, {
        "time": "01:05:30",
        "total": 1
    }, {
        "time": "02:10:00",
        "total": 1
    }, {
        "time": "03:15:30",
        "total": 1
    }, {
        "time": "04:25:30",
        "total": 1
    }, {
        "time": "07:55:15",
        "total": 0
    }, {
        "time": "12:18:00",
        "total": 1
    }, {
        "time": "17:00:00",
        "total": 1
    }];
    
    var margin = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
    },
    width = 800,
        height = 500;
    
    
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    todayMillis = today.getTime();
    
    data.forEach(function(d) {
        var parts = d.time.split(/:/);
        var timePeriodMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
                               (parseInt(parts[1], 10) * 60 * 1000) + 
                               (parseInt(parts[2], 10) * 1000);
        
        d.time = new Date();
        d.time.setTime(todayMillis + timePeriodMillis);
    });
    
    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.time; }))
        //.nice(d3.time.day, 1)
        .rangeRound([0, width - margin.left - margin.right]);
    
    var y = d3.scaleLinear()
        .domain([0, 2])
        .range([height - margin.top - margin.bottom, 0]);
    
    var xAxis = d3.axisBottom(x)
        //.scale(x)
        //.orient('bottom')
        // .ticks(d3.time.hours, 2)
        .tickFormat(d3.timeFormat('%H:%M'))
        .tickSize(0)
        .tickPadding(8);
    
    var yAxis = d3.axisRight(y)
        //.scale(y)
        //.orient('left')
        .tickPadding(8)
        .tickFormat(function (d) {
        return '';
    });
    
    var svg = d3.select('body').append('svg')
        .attr('class', 'chart')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
    
    svg.selectAll('.chart')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function (d) {
            return x(d.time);
        })
        .attr('y', function (d) {
            return height - margin.top - margin.bottom - (height - margin.top - margin.bottom - y(d.total))
        })
        .attr('width', 10)
        .attr('height', function (d) {
            return height - margin.top - margin.bottom - y(d.total)
        });
    
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
        .call(xAxis);
    
    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
    
    svg.append("text")
        .attr("x", -25)
        .attr("y", 430)
        .style("text-anchor", "middle")
        .text("Off");
    
    svg.append("text")
        .attr("x", -25)
        .attr("y", 220)
        .style("text-anchor", "middle")
        .text("On");
}