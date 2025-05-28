# 📝 Node.js Todos API

API RESTful para gerenciamento de tarefas (todos), desenvolvida em Node.js puro, sem frameworks, utilizando manipulação de arquivos para persistência dos dados.

## 🚀 Funcionalidades

- Criar uma nova tarefa
- Listar todas as tarefas (com busca por título/descrição)
- Atualizar título e descrição de uma tarefa
- Remover uma tarefa
- Marcar/desmarcar tarefa como concluída
- Importação de tarefas via arquivo CSV

## 📁 Estrutura do Projeto

```
.
├── db.json                # Banco de dados (persistência local)
├── package.json           # Dependências e scripts
├── src/
│   ├── database.js        # Classe de acesso ao banco de dados
│   ├── routes.js          # Definição das rotas da API
│   ├── server.js          # Servidor HTTP
│   ├── middleware/
│   │   └── json.js        # Middleware para tratar JSON
│   └── utils/
│       ├── build-route-path.js
│       └── extract-query-params.js
└── streams/
    ├── import-csv.js      # Script para importar tarefas de um CSV
    └── tasks.csv          # Exemplo de arquivo CSV
```

## 🛠️ Instalação

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Inicie o servidor:**
   ```sh
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:3333`.

## 📚 Rotas da API

### Criar tarefa

- **POST** `/todos`
- **Body:**  
  ```json
  {
    "title": "Título da tarefa",
    "description": "Descrição da tarefa"
  }
  ```

### Listar tarefas

- **GET** `/todos`
- **Query params:** `search` (opcional, busca por título/descrição)

### Atualizar tarefa

- **PUT** `/todos/:id`
- **Body:**  
  ```json
  {
    "title": "Novo título",
    "description": "Nova descrição"
  }
  ```

### Remover tarefa

- **DELETE** `/todos/:id`

### Marcar/desmarcar como concluída

- **PATCH** `/todos/:id`

## 📥 Importação via CSV

1. Adicione tarefas ao arquivo tasks.csv.
2. Execute o script:
   ```sh
   node streams/import-csv.js
   ```

## 🧑‍💻 Tecnologias

- Node.js (puro, sem frameworks)
- Manipulação de arquivos com `fs`
- [csv-parse](https://www.npmjs.com/package/csv-parse) para leitura de CSV

---

Feito com 💙 por [Erik Pablo](https://github.com/erikpablo)
```
