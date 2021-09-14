var app = require('./config/server');

var server = app.listen(80, () => {
    console.log('Servidor rodando na porta 80.')
});

var io = require('socket.io').listen(server);
app.set('io',io);

io.on('connection', function (socket) {
    console.log('Usuário conectou')

    socket.on('disconnect', function () {
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', (data) =>{
        socket.emit(
            'msgParaCliente', 
            { apelido: data.apelido, mensagem: data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaCliente', 
            { apelido: data.apelido, mensagem: data.mensagem}
        );

        socket.emit(
            'participantesParaCliente', 
            { apelido: data.apelido}
        );

        socket.broadcast.emit(
            'participantesParaCliente', 
            { apelido: data.apelido}
        );
    });

    
});
