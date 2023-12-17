//Padronizar o tipo de msg que aparecera quando tiver uma excessao

//Arquivo para erros do lado do cliente

class AppError{
  message;
  statusCode;

  constructor (message, statusCode = 400) {// constructor: metodo carregado automaticamente quando a classe for instanciada. Queremos saber do message e statusCode
    this.message = message;
    this.statusCode = statusCode;
  }
};

module.exports = AppError;