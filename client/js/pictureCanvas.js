// $(function(){
	var canvas= document.getElementById('picturePreviewCanvas')
	var ctx = canvas.getContext('2d');
	var img = document.getElementById('picturePreview')

	// var img = $('#picturePreview').attr('src')
	if(img.complete){
		console.log('img is complete');
			var radius = 5
				canvas.width = img.width
				canvas.height = img.height
					ctx.drawImage(img, 0, 0,img.width, img.height)
			
		

	}else{
		console.log('What image?');
		img.onload = function(){
			var radius = 5
				canvas.width = img.width
				canvas.height = img.height
				
					ctx.drawImage(img, 0, 0,img.width, img.height)
			
		}
			

	}





	$(canvas).on('mousemove', function(e){
	if(mousedown){
		ctx.lineWidth = radius*2

		console.log(e);
		ctx.lineTo(e.offsetX, e.offsetY)
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(e.offsetX, e.offsetY)
	}
	})

	$(canvas).on('mousedown', function(){
		mousedown = true
	})
	$(canvas).on('mouseup', function(){
		mousedown = false
		// ctx.beginPath()
		
	})


	// img.src='myPIC.jpg'
// })



var mousedown=false;
var dragged = false;


var selectionArray=[];

var divWidth;
var divHeight;
var initialClick={};
var XYPOS={}

function createSelectionDiv(idNumber){
	$('body').append('<div class="selectionDiv" id="selectionDiv'+idNumber+'"></div>')
}

var selectionDivBeingCreated = false


$('#picturePreview').on('mousedown', function(e){
	e.preventDefault()
	e.stopPropagation()
	selectionDivBeingCreated = true;
	console.log('EVENT ');$('#picturePreview').css('cursor', 'crosshair')
	console.log(e);
	console.log('target width = '+e.target.width);
	console.log('target height = '+e.target.height);
   mousedown = true
      initialClick = {
      	percentX:e.offsetX/ e.target.width,
      	percentY:e.offsetY/ e.target.height,
      	offSetX:e.offsetX,
      	offSetY:e.offsetY,
		xPOS: (e.pageX),
		yPOS: (e.pageY)
	}
	console.log(initialClick);



})


$('#picturePreview').on('mouseup', function(e){
	mousedown = false
	console.log(e);
	if(dragged){
		dragged=false
			var currentSelectionDiv = $('#selectionDiv'+selectionArray.length)
		console.log(currentSelectionDiv.css('width'));
		console.log('Mouse Up ');
		$('#picturePreview').css('cursor', 'default')

		selectionArray.push({
							width:currentSelectionDiv.css('width'),
							 height: currentSelectionDiv.css('height'),
							 top:currentSelectionDiv.css('top'),
							 left:currentSelectionDiv.css('left')
							})
	}
})

$('#picturePreview').on('mousemove', function(e){
	e.stopPropagation()
	e.preventDefault()

	// console.log('MOUSE MOVE click? '+mousedown);
	if(mousedown && selectionDivBeingCreated){


		e.preventDefault()

			// console.log('MOUSE DOWN! '+mousedown);
			if($('#selectionDiv'+selectionArray.length).length===0){
			var selectionDivNumber = selectionArray.length
			createSelectionDiv(selectionDivNumber)
}

				 dragged = true
				// console.log('Initial click location ');
				// console.log(initialClick);
			// console.log(e.offsetX);
	// console.log(e.offsetY);
	// console.log(e.clientY);
	// console.log(e.clientY);
	XYPOS ={
		xPage:(e.pageX),
		yPage:(e.pageY)
	}

	// console.log('current mouse position ');
	// console.log(XYPOS);
	// console.log(e);


	if(XYPOS.xPage > initialClick.xPOS){
		// console.log('going right');
		divWidth = XYPOS.xPage-initialClick.xPOS
		$('#selectionDiv'+selectionArray.length).css('left', initialClick.xPOS)

		$('#selectionDiv'+selectionArray.length).css('width', divWidth+'px')
	
		// console.log('divWidth '+divWidth);
		// console.log(' '+XYPOS.xPage.toString()-initialClick.xPOS.toString());				
	}else if(XYPOS.xPage == initialClick.xPOS){
				console.log('nowhere');

		divWidth = 0
		$('#selectionDiv'+selectionArray.length).css('left', initialClick.xPOS)

		$('#selectionDiv'+selectionArray.length).css('width', divWidth+'px')


	}else if(initialClick.xPOS > XYPOS.xPage){
		// console.log('going left');

		divWidth = initialClick.xPOS-XYPOS.xPage
		$('#selectionDiv'+selectionArray.length).css('width', divWidth+'px')

		$('#selectionDiv'+selectionArray.length).css('left', XYPOS.xPage)

		// console.log('width =  ')
		// console.log(initialClick.xPOS-XYPOS.xPage)	

	}else{
		// console.log('WHAT JUST" HAPPENED??');
	}
	if(XYPOS.yPage>initialClick.yPOS){
		// console.log('going down');
		$('#selectionDiv'+selectionArray.length).css('top', initialClick.yPOS)
		divHeight = XYPOS.yPage-initialClick.yPOS	
		$('#selectionDiv'+selectionArray.length).css('height', divHeight+'px')

				
	}else if(XYPOS.yPage==initialClick.yPOS){
		divHeight = 0
		$('#selectionDiv'+selectionArray.length).css('top', initialClick.yPOS)
		$('#selectionDiv'+selectionArray.length).css('height', divHeight+'px')
	}else if(initialClick.yPOS>XYPOS.yPage){
		// console.log('going up');
		divHeight = initialClick.yPOS-XYPOS.yPage
		$('#selectionDiv'+selectionArray.length).css('height', divHeight+'px')
		$('#selectionDiv'+selectionArray.length).css('top', XYPOS.yPage)

		
		

	}else{
		console.log('WHAT JUST" HAPPENED??');
	}
	

	 }


})