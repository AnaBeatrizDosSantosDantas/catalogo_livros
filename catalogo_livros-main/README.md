# Atividade de laboratório de Banco de dados

## Sobre a Atividade

Este projeto é uma aplicação web de página única que facilita a navegação por livros com suporte a paginação. A estrutura de backend é construída com Node.js e utiliza MongoDB para armazenar e gerenciar os dados dos livros. O frontend é desenvolvido em React, garantindo uma experiência de usuário fluida e paginada para a visualização dos livros.

## Lembretes

Certifique-se de ter o Node.js e o MongoDB instalados em seu dispositivo.

## Guia para instalação

1. **Clone o repositório do GitHub:**

    ```
    git clone <URL-do-repositório>
    ```

    **Você também pode optar por fazer o download do projeto compactato pela pagina do github. **

2. **Instale as dependências do back-end:**

    ```
    npm i
    ```

3. **Inicie a API:**

    ```
    node ./mongo_database.js
    ```

4. **Crie um novo terminal e instale as dependências do front-end:**

    ```
    cd ./catalogo_livros/
    npm i
    ```

5. **Inicie o servidor:**

    ```
    npm run dev
    ```

6. **Abra [http://localhost:8080/](http://localhost:8080/) em seu navegador para visualizar o resultado.**

## Rotas da API

-   `GET /books/:page`: Retorna os livros paginados.
-   `GET /len`: Retorna o número total de páginas.

## Autor

Este projeto foi desenvolvido por Ana Beatriz dos Santos Dantas.
