# Dreams SaaS template

Template para projetos SaaS utilizando a stack Rails + Inertia + React + Tailwind.

## Configuração

## Instalando a SwitchUI

1. Nesse projeto, também utilizamos a biblioteca de componentes [switch-ui](https://github.com/SwitchDreams/switch-ui)
   para
   a configuração dos componentes, que é um pacote privado do Github Packages. Para a instalação, é necessário realizar
   o
   login no github packages através do comando:
    ```shell
    npm login --registry=https://npm.pkg.github.com --scope=@switchdreams
    ```
   Esse comando solicitará sua autenticação pelo github para realizar a instalação, em que será necessário preencher o
   seu
   nome de usuário (em minúsculo) e seu token de acesso. Para gerar o token de acesso, entre no github e pela UI siga o
   seguinte caminho: `Icone do perfil (campo superior direito)` > `Settings` >  `Developer Settings` >
   `Personal access tokens` > `Generate new token`. Ao gerar token, é possível customizar as suas permissões.
   Lembre-se de selecionar a permissão de *read:packages*.

2. Executar os comandos `yarn install` e `bundle install` para instalar as dependências
3. Rode o projeto com o comando `./bin/dev`

## Configurando Logo

Alguns assets de arquivos são utilizados durante as telas do nosso template, recomendo trocá-los:
- Logo principal (public/images/logo.svg)
- Imagem de fundo do background (public/images/back-login.png)

## Serializer

Para os serializers nós utilizamos a gem "panko_serializer", porém tente não utilizá-la diretamente, temos um método
`serializer` na `application_controller` que serve como interface para o Panko;

## Sistema de Usuários

Utilizamos a gem "authentication-zero", temos os seguintes módulos:

- Autenticação
- Reset de Senhas

## Background Jobs

Para os background jobs utilizamos a gem "good_job"