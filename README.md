# Dreams SaaS Template

Template inicial para projetos SaaS construído com a stack Rails + Inertia + React + Tailwind.

## Visão Geral

Este template fornece uma base sólida para o desenvolvimento de aplicações SaaS, integrando tecnologias modernas e práticas estabelecidas de desenvolvimento.

## Stack Tecnológica

- **Backend**: Ruby on Rails
- **Frontend**: React com Inertia.js
- **Estilização**: Tailwind CSS
- **Administração**: AVO
- **Autenticação**: authentication-zero
- **Autorização** action-policy
- **Serialização**: Panko Serializer
- **Jobs**: GoodJob
- **Deploy**: Kamal

## Configuração Inicial

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Ruby
- Node.js e pnpm
- PostgreSQL (ou outro banco de dados compatível)

### Instalação

```bash
# Instale as dependências Ruby
bundle install

# Instale as dependências JavaScript
pnpm install
```

### Variáveis de Ambiente

Configure as variáveis de ambiente no arquivo `config/application.yml`:

```yaml
DB_USER:
DB_PASSWORD:

# Autenticação com Google (opcional)
GOOGLE_CLIENT_ID:
GOOGLE_CLIENT_SECRET:
```

### Execução

```bash
./bin/dev
```

## Personalização

### Renomeação do Projeto

Para renomear o projeto, utilize o comando:

```bash
bin/rename nome_do_projeto
```

Este comando atualizará todos os arquivos e referências necessárias.

### Identidade Visual

Os seguintes assets são utilizados no template e devem ser personalizados:

- **Logo principal**: `public/images/logo.svg`
- **Imagem de fundo**: `public/images/back-login.png`

## Deploy

O deploy é configurado através do Kamal. Para ajustar as configurações, consulte o arquivo:

- `config/deploy.yml`

## Arquitetura

### Serialização

O template utiliza a gem `panko_serializer` para serialização de dados. Recomenda-se utilizar o método `serializer` disponível no `ApplicationController` como interface abstrata, evitando o uso direto da gem.

### Sistema de Autenticação

A autenticação é gerenciada pela gem `authentication-zero`, proporcionando os seguintes recursos:

- Autenticação padrão
- Autenticação via OAuth (Google)
- Recuperação de senha

### Roles e Permissões

O template implementa duas roles básicas:

| Role | Descrição |
|------|-----------|
| `super_admin` | Acesso total ao painel administrativo AVO |
| `normal` | Usuário padrão sem permissões administrativas |

**Nota**: As roles atuais limitam o acesso ao AVO. Ajustes adicionais devem ser implementados no modelo `User` conforme as necessidades da aplicação.
