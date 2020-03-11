<h1 align="center">
  Cartões Ltda Backend
  <br/>
  <img src="https://raw.githubusercontent.com/b-oliveira/cartoes-ltda-backend/master/preview.png" />
</h1>

## Sobre
Este projeto tem como objetivo simular transações financeiras através de cartões de crédito e débito.

## Principais tecnologias
  - [Express.js](https://expressjs.com//)
  - [Sequelize ORM](https://sequelize.org/)
  - [Swagger](https://swagger.io/)
  - [bcryptjs](https://github.com/kelektiv/node.bcrypt.js/)
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  - [nodemon](https://nodemon.io/)
  - [Sucrase](https://sucrase.io/)
  - [Yup](https://github.com/jquense/yup/)
  - [date-fns](https://date-fns.org/)
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io)

## Como utilizar
Para executar este projeto será necessário ter instalado na sua máquina:
  - [PostgreSQL](https://www.postgresql.org/)
  - [Git](https://git-scm.com/)
  - [Node.js 10.16](https://nodejs.org/en/) ou superior
  - [Yarn 1.17.3](https://yarnpkg.com/) ou superior

Após isso, conforme abaixo, clone o projeto.

```bash
git clone https://github.com/b-oliveira/cartoes-ltda-backend.git
```

Em seguida, antes de executar os passos abaixo, renomeie o arquivo .env.example para .env e configure a porta de execução do servidor, informe o segredo do token sendo um hash criptografado em MD5, as credencias do banco de dados e as credenciais do administrador do sistema.

```bash
# Instale as dependências
yarn install

# Execute as migrations e seeders do banco de dados
yarn sequelize db:migrate
yarn sequelize db:seed:all

# Execute o servidor
yarn dev
```
Por fim, acesse http://localhost:3333/api-docs/ (porta 3333 está configurada como padrão) para utilizar o Swagger.

Obs.: Para realizar requisições em rotas protegidas será necessário se autenticar na rota /sessions e, em seguida, pegar o token obtido na resposta e colocar no campo Value, visível ao clicar no botão de Authorize, no seguinte formato:

```Bearer <token>```.

---

[See my LinkedIn!](https://www.linkedin.com/in/brenner-lo/)
