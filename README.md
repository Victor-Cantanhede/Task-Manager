# 🚀 Task Manager Project !

Este documento contém as instruções para instalar e rodar o projeto **Task Manager**, que é composto por um **backend API** em NestJS/Prisma e um **frontend web** em React/Vite.

---

## 📋 Pré-requisitos

Certifique-se de ter o seguinte software instalado em sua máquina:

* **Node.js** (recomenda-se a versão mais recente LTS)
* **npm** (ou yarn/pnpm, mas os comandos usam `npm`)
* **Git**

---

## ⚙️ Configuração do Backend (API)

O backend é um serviço NestJS que utiliza **Prisma** como ORM, configurado para usar um banco de dados **SQLite** (`dev.db`).

1.  **Navegue até o diretório da API:**

    ```bash
    cd Task-Manager/_api
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure o ambiente:**

    O backend utiliza o arquivo `.env.example` para as variáveis de ambiente. Você deve criar um arquivo `.env` a partir dele.

    ```bash
    cp .env.example .env
    ```

    > **Nota:** O script `dev` e `start` já utiliza `dotenv -e .env.example` para carregar as variáveis do arquivo de exemplo, o que simplifica o processo inicial. Se você precisar de configurações personalizadas (como tokens JWT ou segredos), edite o arquivo `.env` ou o `.env.example`.

4.  **Inicialize o Banco de Dados (Prisma Migrate):**

    Como o projeto usa Prisma e já tem migrações criadas (vistas na estrutura `prisma/migrations`), precisamos aplicar essas migrações para criar o arquivo de banco de dados SQLite (`dev.db`) e a estrutura de tabelas.

    ```bash
    npx prisma migrate deploy
    ```

    > **Nota:** Este comando usa as migrações existentes e as aplica ao banco de dados especificado no `schema.prisma` (que aponta para `dev.db` via as configurações padrão).

5.  **Rode o Servidor da API:**

    Utilize o script `dev` para rodar a API em modo de observação (watch mode).

    ```bash
    npm run dev
    ```

    O servidor da API estará rodando em `http://localhost:5000` (ou a porta configurada no seu `.env`). Você pode verificar a documentação **Swagger UI** em um endpoint como `http://localhost:5000/swagger` (assumindo a configuração padrão do NestJS).

---

## 🖥️ Configuração do Frontend (Web)

O frontend é uma aplicação React desenvolvida com **Vite**.

1.  **Abra uma nova aba no terminal e navegue até o diretório do frontend:**

    ```bash
    cd Task-Manager/_web
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Rode a Aplicação Web:**

    Utilize o script `dev` para iniciar o servidor de desenvolvimento do Vite.

    ```bash
    npm run dev
    ```

    O frontend estará acessível no endereço fornecido pelo Vite (tipicamente `http://localhost:5173` ou `http://localhost:3000` ou similar).

---

## 🏁 Uso do Projeto

Com a API e o Frontend rodando:

1.  Acesse a aplicação no seu navegador (por exemplo, `http://localhost:3000`).
2.  Você provavelmente precisará **registrar** um novo usuário através do formulário de autenticação (`RegisterForm.tsx`).
3.  Após o registro, **faça login** (`LoginPage.tsx`) para acessar a área de gerenciamento de tarefas (`TaskPage.tsx`).

---

## 🛠️ Scripts Úteis (API)

Além de `npm run dev`, alguns scripts notáveis do `package.json` do backend são:

| Comando | Descrição |
| :--- | :--- |
| `npm run build` | Compila o projeto TypeScript para JavaScript na pasta `dist`. |
| `npm run start:prod` | Roda a aplicação compilada em modo de produção. |
| `npm run format` | Formata o código-fonte usando Prettier. |
| `npx prisma migrate dev --name <nome_da_migracao>` | Cria uma nova migração (útil se você alterar o `schema.prisma`). |
| `npx prisma studio` | Abre uma interface gráfica para visualizar e editar os dados no `dev.db`. |
