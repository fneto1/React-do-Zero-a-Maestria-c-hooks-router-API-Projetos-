const { validationResult } = require('express-validator')

const validate = (req, res, next) => {

    //aqui ficarão os erros retornados na validação
    const errors = validationResult(req)

    //caso não haja erro, prosseguir para o controller
    if (errors.isEmpty()) {
        return next()
    }

    //console.log(errors)

    //array que irá armazenar os erros
    const extractedErrors = []

    //map para adicionar os as mensagens de erro encontrados no array anterior
    errors.array().map((error) => extractedErrors.push(error.msg))

    //retorna a mensagem de erro
    return res.status(422).json({
        errors: extractedErrors
    })
}

module.exports = validate