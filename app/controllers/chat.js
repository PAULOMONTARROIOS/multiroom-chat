module.exports.iniciaChat = (application, req, res)=>{
    var dadosForm = req.body;

    req.assert('apelido','Deve conter um apelido').notEmpty();
    req.assert('apelido', 'Apelido deve conter no mínimo 3 e no máximo 15 caracteres.').len(3,15);

    var errors = req.validationErrors();

    if(errors){
        res.render('index', { validacao: errors });
        return;
    }

    application.get('io').emit(
        'msgParaCliente', 
        {apelido: dadosForm.apelido, mensagem: 'Entrou no chat'});

    res.render('chat', {dadosForm: dadosForm});
}