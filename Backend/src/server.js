// ESSE ARQUIVO EH O PONTO DE ENTRADA DA NOSSA APLICACAO
// QUANDO REQUISICAO CHEGA NO SERVER.JS, VAI PASSAR PELAS "ROTAS" PARA IDENTIFICAR QUAL CONTROLLER SERA EXECUTADO( O QUE USUARIO ESTA PEDIDNO)
// O CONTROLLER ENTAO DEVOLVE PARA A "ROTA" E ENTAO SERA DEVOLVIDA ATRAVES DO SERVER.JS

require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload")

const cors = require("cors");
const express = require('express'); //importou express
const routes = require("./routes")

migrationsRun(); //executar o banco de dados

const app = express(); // O () eh pq vamos inicializar o express(que foi importado com npm install express - Na pasta node_modules)
app.use(cors());
app.use(express.json()) // padrao JSON para receber atraves do corpo da requisicao

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes);

app.use((error, request, response, next) => {
  if(error instanceof AppError) {//erro gerado pelo cliente
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  } 

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal Server error"
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));