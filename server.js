var nodeMedia = require('node-media-server');

// var express = require('express');
// var app = express();
// var spawn = require('child_process').spawn;
// var fs = require('fs');

// app.use(express.static('public'));

// var server = require('http').createServer(app);

// var io = require('socket.io')(server);
// spawn('ffmpeg', ['-h']).on('error', function (m) {
//     console.error("FFMpeg not found in system cli; please install ffmpeg properly or make a softlink to ./!");
//     process.exit(-1);
// });

// io.on('connection', function (socket) {
//     socket.emit('message', 'Hello from mediarecorder-to-rtmp server!');

//     socket.emit('message', 'Please set rtmp destination before start streaming.');

//     var ffmpeg_process, feedStream = false;
//     socket.on('config_rtmpDestination', function (m) {
//         socket._rtmpDestination = m;
//         socket.emit('message', 'rtmp destination set to:' + m);
//     });

//     socket.on('config_vcodec', function (m) {
//         socket._vcodec = m;
//     });


//     socket.on('start', function (m) {
//         if (ffmpeg_process || feedStream) {

//             socket.emit('fatal', 'stream already started.');
//             return;
//         }
//         if (!socket._rtmpDestination) {
//             socket.emit('fatal', 'no destination given.');
//             return;
//         }

//         var framerate = socket.handshake.query.framespersecond;
//         var audioBitrate = parseInt(socket.handshake.query.audioBitrate);
//         var audioEncoding = "64k";

//         console.log(audioEncoding, audioBitrate);

//         console.log('framerate on node side', framerate);

//         var ops = [
//             '-i', '-',
//             '-c:v', 'libx264', '-preset', 'veryfast', '-tune', 'zerolatency',
//             '-c:a', 'aac', '-ar', '44100', '-b:a', '64k',
//             '-y',
//             '-use_wallclock_as_timestamps', '1',
//             '-async', '1',
//             '-filter_complex', 'aresample=44100',
//             '-strict', 'experimental',
//             '-bufsize', '1000',
//             '-f', 'flv', socket._rtmpDestination
//         ];

//         ffmpeg_process = spawn('ffmpeg', ops);

//         ffmpeg_process.stderr.on('data', function (data) {
//             socket.emit('ffmpeg_stderr', '' + data);
//         });

//         ffmpeg_process.on('error', function (err) {
//             socket.emit('fatal', 'ffmpeg error!' + err);
//             feedStream = false;
//             socket.disconnect();
//         });

//         ffmpeg_process.on('exit', function (err) {
//             socket.emit('fatal', 'ffmpeg exit!' + err);
//             socket.disconnect();
//         });

//         socket.on('binarystream', function (data) {
//             ffmpeg_process.stdin.write(data);
//         });
//     });

//     socket.on('disconnect', function () {
//         feedStream = false;
//         ffmpeg_process.stdin.end();
//         ffmpeg_process.kill('SIGINT');
//     });
// });

// server.listen(1437, function () {
//     console.log('https and websocket listening on *:1437');
// });

// process.on('uncaughtException', function (err) {
//     console.log(err)
// })
