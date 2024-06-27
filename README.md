# Dreams SaaS template

Template para projetos SaaS utilizando a stack Rails + Inertia + React + Tailwind.

## Quick Start

- `yarn install` e `bundle install`
- Configure as variáveis de ambientes necessárias
- Rode o projeto com o comando `./bin/dev`

## Configuração

### Biblioteca de componentes

### Configurando Logo

Alguns assets de arquivos são utilizados durante as telas do nosso template, recomendo trocá-los:

- Logo principal (public/images/logo.svg)
- Imagem de fundo do background (public/images/back-login.png)

### Serializer

Para os serializers nós utilizamos a gem "panko_serializer", porém tente não utilizá-la diretamente, temos um método
`serializer` na `application_controller` que serve como interface para o Panko;

### Sistema de Usuários

Utilizamos a gem "authentication-zero", temos os seguintes módulos:

- Autenticação
- Reset de Senhas

#### Roles

- No template temos duas roles:
    - super_admin: que tem acesso no AVO
    - normal: sem definição de acesso

Essas roles inicialmente só tem a função de limitar o acesso no AVO, com certeza sua aplicação vai necessitar de mais
roles e edite isso no arquivo `user.rb`

### Background Jobs

Para os background jobs utilizamos a gem "good_job"