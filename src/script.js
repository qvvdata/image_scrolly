import { graphScroll } from './graph-scroll.js';
import * as d3 from 'd3';
require('./embedstyle.css');


var parents = d3.selectAll('.qvv_scrollsection');

import * as config from './steps.archieml';

var preload_i = 0;

parents.each(function(x)  {
  var parent = d3.select(this);
  var steps = config[parent.attr('data-steps')];

  var img_prefix = parent.attr('data-image-prefix');

  function img_url_transform(url) {
    return img_prefix+url.replace(/^img:/,'').trim().replace('.png', window.innerWidth<590?'_mobile.png':'.png');
  }

  parent.select('.container .sections')
    .selectAll('div')
    .data(steps)
    .enter()
    .append('div')
    .attr('class','row row--reducedWidth')
    .attr('data-step-info', (d) => d.graph)
    .html((d) => `<div class="col col--medium-1 marginalCol"></div><div class="qvvdata-main col col--medium-7 col--large-8">
      <div class="textwrapper">
		${d.text}
	  </div>
	  </div>`)

  steps.map(function(s) {
  	if(s.graph.indexOf('img:')==0) {
  	  preload_i++;
  	  setTimeout(function(x) {
  		var img = new Image();
  	   img.src = x }.bind(this, img_url_transform(s.graph)), 250*preload_i);
  	}
  })

  var last_i = -1;

  var gs = graphScroll()
    .graph(parent.select('.graphcontainer'))
    .container(parent.select('.container'))
    .sections(parent.selectAll('.container .sections > div'))
	.offset(-25)
    .on('active', (i) => {
      var graph = steps[i].graph;

      parent.selectAll('.graphcontainer div.imgcontainer').transition().duration(2000).style('opacity', i>last_i?1:0).remove();

      if(graph.indexOf('img:')==0) {
        parent.select('.graph').style('opacity', 0)
        var img = parent.select('.graphcontainer').append('div').attr('class','imgcontainer')
          .append('img').attr('class', 'step').style('opacity', 0);
        img.attr('src', img_url_transform(graph))
          .transition().duration(2000).style('opacity', 1);
      }
      last_i = i;
    });

  setInterval(gs.resize, 1500);
})

parents.selectAll('span[data-color]')
  .style('background', function(d) {
	return d3.select(this).attr('data-color'); })
  .style('color', function(d) {
	console.log(d3.select(this).attr('data-color'),
	  d3.lab(d3.select(this).attr('data-color')).l);
	return d3.lab(d3.select(this).attr('data-color')).l>60?'black':'white';
  })
  .style('display', 'inline-block')
  .style('line-height', '1em')
  .style('font-weight', 'strong')
  .style('padding', '1px 5px 3px 5px');
