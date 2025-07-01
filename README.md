Sistema de Locadora de Carros – Back-end

Este projeto é uma API RESTful desenvolvida com Node.js, Express e MongoDB para 
gerenciar uma locadora de veículos. Ele permite o cadastro de clientes, carros e 
locações, com controle de disponibilidade e entrega dos veículos.

Estrutura do Projeto        
src/
├── config/           # Configuração do banco de dados
│   └── db.js
├── controllers/      # Lógica dos endpoints
│   ├── carController.js
│   ├── clientController.js
│   └── rentalController.js
├── repositories/     # Acesso ao banco de dados
│   ├── carReposity.js
│   ├── clientReposity.js
│   └── rentalReposity.js
├── routes/           # Definição das rotas
│   ├── car.js
│   ├── client.js
│   ├── rental.js
│   └── index.js
├── server.js         # Inicialização do servidor
└── .env              # Variáveis de ambiente


Tecnologias Utilizadas
- Node.js
- Express
- MongoDB (com driver nativo)
- Zod (validação de dados)
- Dotenv
- 
Funcionalidades
-  CRUD de clientes
-  CRUD de carros
-  Registro de locações
-  Verificação de disponibilidade de veículos
-  Entrega e finalização de locações
-  Validação de dados com Zod

Como Executar
- Clone o repositório:
git clone https://github.com/RaquelLisboa28/locadora
cd nome-do-repo
- Instale as dependências:
npm install
- Configure o arquivo .env:
NODE_PORT=7000
DB=rentalCompany
- Inicie o servidor:
node src/server.js
- Acesse a API em: http://localhost:7000

Principais Endpoints
| Método | Rota        | Descrição | 
| GET    | /car        | Lista todos os carros | 
| POST   | /car        | Cadastra um novo carro | 
| GET    | /client     | Lista todos os clientes | 
| POST   | /client     | Cadastra um novo cliente | 
| GET    | /rental     | Lista todas as locações | 
| POST   | /rental     | Cria uma nova locação | 
| PUT    | /rental/:id/deliver | Finaliza uma locação (entrega) | 
| DELETE | /rental/:id | Remove uma locação | 


🧑‍💻 Autor
Desenvolvido por Raquel Lisboa 

