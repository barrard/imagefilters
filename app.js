var http = require('http');
var util = require('util')
var express = require('express');
var formidable = require('formidable')
var compression = require('compression')
var Jimp = require("jimp");
const os = require('os');



app =express(http);



app.use(express.static('client'))
app.use(compression())


app.post('/file', function(req, res){
	var form = new formidable.IncomingForm()
console.log(form.files);
	
console.log(req.method+' request to '+req.url);
console.log('FILE IS GOOD TO GO');
// console.log('uploadDir : '+form.uplaodDir);
// 	form.on('fileBegin', function(name, file) {
// 		console.log(name +'  '+file);
// });
// 	form.on('error', function(err) {
// 		console.log(err);
// 	});
// 	form.parse(req)
	form.parse(req, function(err, fields, files){
		if (err) {
			console.log(err)
		}else{
			console.log(fields);
			console.log(files);
			;
			res.write(JSON.stringify(fields)+'<br>'+JSON.stringify(files))
			res.end('.')
		}
	})

	form.uploadDir = __dirname+'uploads'
	form.on('fileBegin', function(name, file) {
		console.log('fileBegin');
});
	form.on('progress', function(R, E){
		console.log(R+' '+E);
	})
	form.on('field', function(name, value) {
		console.log('name '+name+' valeu '+value);
	});
	form.on('file', function(field, file){
		console.log('File event fired; field '+field+' file '+file);
	})
		form.on('end', function() {
			console.log('end');
	});
})

app.post('/index', function(req, res){
	// var form = new formidable.IncomingForm()
	// form.parse(req, function(err, fields, files){
		
	// 		console.log('Lets parse this form');
	// 		res.writeHead(200, {'content-type': 'text/plain'});
 //      res.write('received upload:\n\n');
	// 		res.end(util.inspect({fields: fields, files: files}));
	
	// })
	//   // once all the files have been uploaded, send a response to the client
 //  form.on('end', function() {
 //    res.end('success');
 //  });



	var form = new formidable.IncomingForm()
	console.log('we have a post');
	fields = []

	form.uploadDir = "./client/uploads";

	form.keepExtensions = false;

	console.log('Form type incomming = '+form.type);

	form.hash = 'sha1';


form.on('fileBegin', function(name, file){
	console.log('FileBegin');
	console.log('File name '+name);
	console.log('File ');
	console.log(util.inspect(file));

})



	form.on('progress', function(bR, bE){
		console.log('Progress '+bR/bE+'%');

		if(bR === bE){console.log('PROGRESS 100% DONE');}
	})

		form.on('file', function(name, file){
			console.log('file event');
	 		console.log('file size '+file.size);
	 		console.log('Fiel hash ='+file.hash);
			console.log(typeof name);
			console.log(typeof file);
			file.on('end', function(){
				console.log('file end');
			})
			fields[name]=file
			fields['dakine']='object stringify'
		})

		form.on('field', function(field, value){
			console.log('field event');
			console.log(field);
			console.log(value);
			fields[field]=value
		})

	form.on('error', function(err){
		console.log('ERROR EVENT '+err);
	})

	form.on('end', function(){
		console.log('Ending!@!');
		res.writeHead(200, {
			'content-type': 'text/plain'
		})
		res.write('recived Data:')
		res.end(util.inspect({
			fields:fields
		}))
	})
	form.parse(req)
	
})


app.get('/', function(req, res){
console.log( 'remote address of client '+req.connection.remoteAddress);
console.log('Client Headers : '+JSON.stringify(req.headers, null, 1));

	function makeClosure(){
			var x = 0
		this.increaseIt = function(){
		
			setInterval(function(){
				x++;
			console.log(x)}, 1000);
		
	}

	
	}
	// res.send('hello');
	res.send(new Buffer('req.headers') + '<pre>'+JSON.stringify(req.headers)+'</pre>')
	//var closure = new  makeClosure()
	//closure.increaseIt()
})






app.get('/index', function(req, res){
	var options = {
		headers:{
			'sendFromDBAR': true,
			'date': Date.now()
		}
	}
	res.append('this','append')
	res.set('Content-Type', 'text/html');
	res.sendFile(__dirname+'/views/index.html', options)
	console.log(req.url);
	
})

app.get('/shadow', function(req, res){
	res.sendFile(__dirname+'/views/shadow.html')
})


app.get('/user/:uid/', function(req, res){
		console.log(res.location('back'));
	res.set('Content-Type', 'text/html');
	res.send(new Buffer('<p>Hello</p>'+req.params.uid))
})








 var port = 3333
app.listen(port, function(){
	console.log('Running in port '+port);
	console.log(os.tmpDir());
})