## Reactgram

-- Backend --

_user_

1 - Iniciar o projeto node: npm init -y

2 - Instalar os pacotes bcryptjs cors dotenv express express-validator jsonwebtoken multer

3 - Instalar o nodemon com a flag --save-dev

4 - Criar o app.js
4.1 - Importar o express, path e cors (require)
4.2 - Declarar a porta
4.3 - Inicializar a aplicação
4.4 - Configurar a aplicação para receber respostas em json e formData
4.5 - app.listen

5 - Configurar o package.json
5.1 - Criar script server

6 - Criar arquivo .env
6.1 - Importar no app.js (require)

7 - Criar pastas controller, models, router, uploads, config, middlewares

8 - Trabalhando com as rotas
8.1 - Criar arquivo Router.js na pasta routes
8.2 - Importar o express e iniciar o express router
8.3 - As rotas deverão ser declaradas nesse arquivo
8.4 - Exportar o router
8.5 - Importar o router no app.js
8.6 - Iniciar o router na aplicação

9 - Importando alguns middlewares fundamentais
9.1 - Iniciar o cors
9.2 - Iniciar o path
9.3 - Iniciar a conexão com o DB

10 - Conexão com o DB
10.1 - Criar banco no mongoDB atlas
10.2 - Criar arquivo db.js em config
10.3 - Importar o mongoose
10.4 - Salvar o login e senha do usuário no .env
10.5 - Criar função async para realizar a conexão com o banco (trycatch)
10.6 - retornar a conxexão
10.7 - Executar a função
10.8 - Importar a função

11 - Trabalhando com os models ## O model é dividido em duas partes: schema, em seguida esse schema será inserido em um model

    11.1 - Criar o userSchema com os atributos do objeto
    11.2 - Criar o model User com base no userSchema
    11.3 - Exportar o model User
    11.4 - Criar o photoSchema com os atributos do objeto
    11.5 - Criar o model Photo com base no userSchema
    11.6 - Exportar o model Photo

12 - Criando o Controller de Usuário
12.1 - Criar arquivo UserController.js na pasta controllers
12.2 - Importar o model User
12.3 - Importar o bcrypt e o jwt
12.4 - Criar um jwtSecret (dica: criar no .env)
12.5 - Criar função para gerar um token
12.6 - Criar função para registrar o usuário 12. - Exportar as funções

13 - Criar arquivo de rotas para o usuário
13.1 - Criar arquivo UserRoutes.js
13.2 - Importar o express e iniciar o express router
13.3 - Importar as funções do controllers
13.4 - Criar as rotas relacionadas ao user
13.5 - Exportar as rotas
13.6 - Importas as rotas de User no arquivo Router.js

14 - Criando middleware para realizar validações com o express-validator
14.1 - Criar arquivo handleValidation.js na pasta middlewares
14.2 - Importar o {validationResult} do express-validator
14.3 - Criar função para realizar as validações (req, res, next)
14.4 - Exportar a função
14.5 - Importar a função no user routes
14.6 - Inserir a função na rota entre a requisição e o controller

15 - Middleware para verificar os campos do User
15.1 - Criar arquivo userValidation.js na pasta middlewares
15.2 - Importar o {body} do express-validator
15.3 - Criar função para realizar as validações de campo
15.4 - Exportar a função
15.5 - Importar a função no user routes
15.6 - Inserir a função na rota entre a requisição e o validate
15.7 - Invocar a função na rota

**\*\*\*\*** Obs.: o validate resgata o erro criado no uservalidation **\*\*\*\***

16 - Registrando um usuário
16.1 - No UserController finalizar a função register
16.2 - Desestrutrar os valores necessários do body da requisição
16.3 - Verificar se o usuário existe, caso exista, retornar um erro. (Utilizar o return no final)
16.4 - Criar o salt e o passwordHash para ser enviado para o DB
16.5 - Instânciar um objeto de novo usuário
16.6 - Verificar se a criação foi realizada com sucesso. (Utilizar o return no final)
16.7 - Caso haja sucesso, retornar o id e o token do usuário

17 - Autenticação do usuário
17.1 - No userValidation, criar validação dos campos de email e senha (loginValidation)
17.2 - Em UserController criar a função async de login
17.3 - Desestrutrar os valores necessários do body da requisição
17.4 - Buscar e verificar se o usuário existe, caso NÃO exista, retornar um erro. (Utilizar o return no final)
17.5 - Verificar se a senha confere, utilizar o metodo await bcrypt.compare. Caso as senhas não conferirem, retornar um erro. (Utilizar o return no final)
17.6 - Caso haja sucesso no login, retornar o id e o token do usuário
17.8 - Importar no UserRoutes loginValidation e a função de login
17.9 - Criar rota post passando o loginValidation(), validation e a função login

18 - Criação de middleware para bloqueio de acessos que requerem login
18.1 - Criar arquivo authGuard.js na pasta middleware
18.2 - Importar o model User, jwt, jwtSecret
18.3 - Criar função authGuard
18.4 - Recuperar o token nos headers
18.5 - Separar o token
18.6 - Verificar a existência do token
18.7 - Validar o token (trycatch, jwt.verify)
18.8 - Salvar o usuário referente ao token (req.user) e next()
18.9 - Exportar middleware
18.10 - No Controller, criar função getCurrentUser que irá receber e armazenar o req.user e retorna o mesmo
18.11 - Exportar função
18.12 - Importar middleware e função na UserRoutes
18.13 - Criação de rota get para retornar o perfil do usuário logado
18.14 - Inserir authGuard, getCurrentUser na rota

19 - Criação de middleware para importar fotos
19.1 - Criar arquivo imageUpload.js na pasta middlewares
19.2 - Importar os pacotes multer e path
19.3 - Configurar o diretório de armazenamento das fotos (multer.diskStorage) através do destination e filename
19.4 - Configurar a função de upload (imageUpload)
19.5 - Exportar imageUpload

20 - Função de atualização do usuário
20.1 - Criar as regras de validação no userValidation e exportar
20.2 - Criar função de update no Controller e exportar
20.3 - Criar rota put para atualizar passando authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update

21 - Função de buscar usuário por Id
21.1 - Criar função no controller getUserById
21.2 - Obter o id pelo parametro da rota
21.3 - Buscar o usuário pelo id e retornar
21.4 - Utilizar um trycatch

_Photos_

24 - Criar arquivo de rotas para photos
24.1 - Idem para o user

23 - Middleware para verificar os campos de Photos
23.1 - Criar arquivo photoValidation.js na pasta middlewares
23.2 - Importar o {body} do express-validator
23.3 - Criar função para realizar as validações de campo
23.4 - Exportar a função
23.5 - Importar a função no user routes
23.6 - Inserir a função na rota entre a requisição e o validate
23.7 - Invocar a função na rota

24 - PhotoController
24.1 - Importar model User e Photos e mongoose

25 - Função de inserir photo
25.1 - Criar a função insertPhoto
25.2 - Extrair da requisição: titulo, imagem, e usuario (armazenar numa const)
25.3 - Encontrar o usuário no DB
25.4 - Instânciar um objeto Photo passando as informações necessárias
25.5 - Exportar função e importar no arquivo de rotas
25.6 - Criar rota post authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto

26 - Função de deletar photo
26.1 - Criar a função deletePhoto
26.2 - Extrair da requisição: id da photo, e usuario (armazenar numa const)
26.3 - Encontrar a photo no DB pelo id
26.4 - Verficar se o id do usuário logado é igual ao id do usuário que postou a photo
26.5 - Executar o metodo do mongoose para deletar por id e retornar status ok
26.6 - Exportar função e importar no arquivo de rotas
26.7 - Criar rota delete authGuard, deletePhoto

27 - Função de retornar all photo
27.1 - Criar a função getAllPhotos
27.2 - Executar o comando find no model Photo passando um objeto vazio para retornar todos os resultados, em seguida utilizar o método sort para ordenar as fotos, por fim inserir o exec(). Armazenar o resultado numa const
27.5 - Retornar status ok, passando o resultado do comando
27.6 - Exportar função e importar no arquivo de rotas
27.7 - Criar rota get authGuard, getAllPhotos

28 - Função de retornar user photos
28.1 - Criar a função getUserPhotos e resgatar o id dos parametros da rota
28.2 - Executar o comando find no model Photo passando como atributo userId: id, em seguida utilizar o método sort para ordenar as fotos, por fim inserir o exec(). Armazenar o resultado numa const
28.5 - Retornar status ok, passando o resultado do comando
28.6 - Exportar função e importar no arquivo de rotas
28.7 - Criar rota get authGuard, getUserPhotos

29 - Função de retornar photos by id
29.1 - Criar a função getPhotoById e resgatar o id dos parametros da rota
29.2 - Converter o id do params para o id do mongoDB
29.3 - Executar o comando findById. Armazenar o resultado numa const. Verificar se a foto existe
29.4 - Retornar status ok, passando o resultado do comando
29.5 - Exportar função e importar no arquivo de rotas
29.6 - Criar rota get authGuard, getPhotoById

30 - Função de atualizar photos
30.1 - Criar a função updatePhoto e resgatar o id dos parametros da rota, o titulo do body, e os dados do usuario na requisição
30.2 - Converter o id do params para o id do mongoDB
30.3 - Executar o comando findById. Armazenar o resultado numa const. Verificar se a foto existe
30.4 - Verficar se a foto encontrada pertence ao usuário da requisição
30.5 - Alterar o title
30.6 - Executar o comando save (await)
30.7 - Retornar status ok, com os dados da foto e uma mensagem
30.8 - Exportar função e importar no arquivo de rotas
30.9 - Criar uma função de validação do campo titulo e exportar
30.6 - Criar rota put authGuard, updatePhoto

31 - Função de curtir photos
31.1 - Criar a função likePhoto e resgatar o id da foto dos parametros da rota e os dados do usuario logado na requisição
31.2 - Converter o id do params para o id do mongoDB
31.3 - Executar o comando findById para encontrar a photo. Armazenar o resultado numa const. Verificar se a foto existe
31.4 - Verficar se a foto existe
31.5 - Verficar se o usuário já curtiu a foto
31.6 - Enviar o like para o array de likes da foto
31.7 - Executar o comando save (await)
31.8 - Retornar status ok, com os dados do like e uma mensagem
31.9 - Exportar função e importar no arquivo de rotas
31.10 - Criar rota put authGuard, updatePhoto

32 - Função de comentar photos
32.1 - Criar a função commentPhoto e resgatar o id da foto dos parametros da rota, o comentario do body, e os dados do usuario logado na requisição
32.2 - Converter o id do params para o id do mongoDB
32.3 - Executar o comando findById para encontrar a photo. Armazenar o resultado numa const. Verificar se a foto existe
32.4 - Executar o comando findById para encontrar o user. Armazenar o resultado numa const.
32.5 - Verficar se a foto existe
32.6 - Criar um objeto de userComment
32.7 - Enviar o comentário para o array de comentários da foto
32.8 - Executar o comando save (await)
32.8 - Retornar status ok, com os dados do comentario e uma mensagem
32.9 - Exportar função e importar no arquivo de rotas
32.10 - Criar uma função de validação do campo comentarios e exportar
32.11 - Criar rota put authGuard, updatePhoto

33 - Função de pesquisar foto pelo titulo
33.1 - Criar função searchPhoto
33.2 - Resgatar a query da req.query
33.3 - Buscar a photo pelo método find, passando a query (utilizar um RegExp para não diferenciar letar maiusculas e minusculas)
33.4 - Retornar a photo
33.5 - Exportar função e importar no arquivo de rotas
33.4 - Criar rota get authGuard, commentPhoto (Atenção: inserir esta rota acima das rotas com parametros dinamicos)

---

Exemplo de um retorno de photo by id

{
\_id: new ObjectId("64ade982a54471cb365db4c8"),
image: '1689119106732.png',
title: 'Meu dog swag',
likes: [],
comments: [],
userId: new ObjectId("64ac6015e50b1fa9edffbc6d"),
userName: 'Cobra',
createdAt: 2023-07-11T23:45:06.933Z,
updatedAt: 2023-07-11T23:45:06.933Z,
\_\_v: 0
}

Exemplo de um retorno de um req.user

{
\_id: new ObjectId("64ac6015e50b1fa9edffbc6d"),
name: 'Cobra',
email: 'cobra@teste.com',
createdAt: 2023-07-10T19:46:29.928Z,
updatedAt: 2023-07-11T15:49:46.476Z,
\_\_v: 0,
bio: 'My life, my rules. My style, my attitude.',
profileImage: '1689090586317.png'
}

---

## FRONTEND

1 - Criar projeto padrão react na pasta frontend

2 - Instalar os pacotes react-icons react-router-dom @reduxjs/toolkit react-redux

3 - Instalar font Roboto

4 - Fazer a limpeza dos arquivos

5 - Criar pastas: components, pages

6 - Na pasta pages, criar as pastas Auth e Home
6.1 - Em Home, criar arquivos Home.js e Home.css
6.2 - Em Auth, criar arquivos Login.js, Register.js e Auth.css

7 - Configurando o react-router-dom em app.js
7.1 - Importar BrowserRouter, Routes, Route, Navigate
7.2 - Fazer a estruturação padrão de rotas
7.3 - Criar Rotas para Home, Login e Register

8 - Configurando navbar e footer
8.1 - Criar os arquivos de navbar e footer em components
8.2 - Importar em App.js e posicionar entre o BrowserRoutes
8.3 - Configurar o footer
8.4 - Configurar o navbar
8.4.1 - Importar NavLink, Link do react-router-dom
8.4.2 - Importar os ícones BsSearch, BsHouseDoorFill, BsFilePersonFill, BsFillCameraFill do react-icons/bs
8.5 - Configurar o CSS

9 - Página de registro
9.1 - Importar o Link e os hooks useState e useEffect
9.2 - Declarar os states para armazenar os dados
9.3 - Criar função handleSubmit
9.3.1 - preventDefault
9.3.2 - Criar um objeto com os dados que serão armazenados do input
9.4 - Criar form passando a handleSubmit
9.5 - Nos input, inserir as funções set no onChange
9.6 - Passar os respectivos values ou ""
