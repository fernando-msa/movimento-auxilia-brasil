# Movimento Auxilia Brasil - SPA

Este é um projeto de Single Page Application (SPA) desenvolvido com **Vue.js 3** (via CDN), **Leaflet** e **Chart.js**, integrado com **Firebase Firestore**.

## 🚀 Como Executar Localmente

1.  Clone este repositório.
2.  Abra o arquivo `index.html` em seu navegador.
    *   *Nota*: Para funcionalidades completas (como roteamento sem hash ou evitar problemas de CORS com módulos), recomendo usar um servidor local simples como a extensão "Live Server" do VS Code ou `python -m http.server`.

## ⚙️ Configuração do Firebase

Para que o sistema puxe os dados reais, você precisa configurar o Firebase:

1.  Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
2.  Crie um banco de dados **Cloud Firestore** em modo de teste (ou configure regras de segurança apropriadas).
3.  Crie as seguintes coleções com documentos de exemplo:
    *   `activities`: `{ title, description, day, month, location }`
    *   `missions`: `{ name, lat, lng }`
    *   `donations`: `{ month, amount }`
    *   `pastorals`: `{ name, description, image }`
4.  Vá em **Configurações do Projeto** > **Geral** > **Seus aplicativos** > **Adicionar app da Web**.
5.  Copie as credenciais (apiKey, projectId, etc.).
6.  Abra o arquivo `firebase-config.js` neste projeto e substitua os valores de placeholder.

## � Como Fazer o Deploy (GitHub Pages)

Este projeto está pronto para ser hospedado gratuitamente no GitHub Pages.

1.  **Crie um Repositório no GitHub**
    - Vá em [github.com/new](https://github.com/new).
    - Nomeie como `movimento-auxilia-brasil` (ou outro nome de sua preferência).
    - Deixe como **Public**.
    - Clique em **Create repository**.

2.  **Envie os Arquivos**
    Abra o terminal na pasta do projeto e rode:
    ```bash
    git init
    git add .
    git commit -m "Primeiro deploy"
    git branch -M main
    git remote add origin https://github.com/fernando-msa/movimento-auxilia-brasil.git
    git push -u origin main
    ```
    *(Caso já tenha adicionado a origin antes, use `git remote set-url origin ...`)*

3.  **Ative o GitHub Pages**
    - No repositório, clique na aba **Settings**.
    - No menu lateral esquerdo, clique em **Pages**.
    - Em **Build and deployment** > **Source**, escolha `Deploy from a branch`.
    - Em **Branch**, selecione `main` e a pasta `/ (root)`.
    - Clique em **Save**.

4.  **Pronto!**
    Em alguns instantes, seu site estará online no link fornecido pelo GitHub (ex: `https://seu-usuario.github.io/movimento-auxilia-brasil/`).

---
**Observação**: O projeto inclui dados de "fallback" (simulados) que são exibidos caso a conexão com o banco de dados falhe ou ainda não tenha sido configurada.
