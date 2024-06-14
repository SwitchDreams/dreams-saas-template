# Dreams SaaS template

Template para projetos SaaS utilizando a stack Rails + Inertia + React + Tailwind.

## Configuração inicial

1. Nesse projeto, também utilizamos a biblioteca de componentes [switch-ui](https://github.com/SwitchDreams/switch-ui) para
    a configuração dos componentes, que é um pacote privado do Github Packages. Para a instalação, é necessário realizar o
    login no github packages através do comando:
    ```shell
    npm login --registry=https://npm.pkg.github.com --scope=@switchdreams
    ```
    Esse comando solicitará sua autenticação pelo github para realizar a instalação, em que será necessário preencher o seu
    nome de usuário (em minúsculo) e seu token de acesso. Para gerar o token de acesso, entre no github e pela UI siga o
    seguinte caminho: `Icone do perfil (campo superior direito)` > `Settings` >  `Developer Settings` >
    `Personal access tokens` > `Generate new token`. Ao gerar token, é possível customizar as suas permissões.
Lembre-se de selecionar a permissão de *read:packages*.

2. Executar os comandos `yarn install` e `bundle install` para instalar as dependências
3. Rode o projeto com o comando `./bin/dev`
