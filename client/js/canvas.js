$(function(){

	var drawCanvas = document.getElementById('drawCanvas');
	var ctx = drawCanvas.getContext('2d');

	drawCanvas.width = 500;
	drawCanvas.height = 500;

var radius = 10
var dragging = false;

$(drawCanvas).on('mousemove', function(e){
if(dragging){
	console.log(e);
	ctx.beginPath();
	ctx.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
	ctx.fill();
}
})

$(drawCanvas).on('mousedown', function(){
	dragging = true
})
$(drawCanvas).on('mouseup', function(){
	dragging = false
	
})


})

