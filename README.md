# Iron Horse API

Este é o projeto final do curso Fullstack Developer maisPraTI 2024.<br/>
O projeto tem objetivo principal a locação de carros entre pessoas físicas e a realização de pagamentos através da Stripe.

## Integrantes
- André Santos
- Cristina Stemmer
- Emmanoel Linhares
- Evair Feldmann
- Gabriel Silva
- João Cardoso
- Rafaella Santos


## Tecnologias e ferramentas utilizadas
- Front-end:
    - React.js
    - Vite
    - npm
    - Bootstrap
    - Google Api
    - Via cep
    - QRCode Generator
- Back-end:
    - Java
    - Ecosistema Spring boot
    - MySQL
    - Google API
    - AWS
    - JWT
    - Stripe
    - Caffeine (Cacheamento para OTP - One Time Password)
    - Swagger
    - Envio de email


## Para rodar o projeto back-end
- Adicione as variáveis de ambientes necessárias
- Instale as dependências do maven
- Utilize versão Java 17 ou superior
- Gere chaves RSA dentro da pasta `resources` em `src -> main -> resources`
  - Os nomes dos arquivos das chaves deverão ser `app.key` para a chave privada e `app.pub` para chave pública
 
 ### Como gerar chaves RSA
 - Recomenda-se instalar o `chocolatey` para windows
   - Link para auxílio: https://chocolatey.org/install
 - Após chocolatey instalado, podes verificar a instalação com o comando `choco -v`
 - Instalar a biblioteca OpenSSL com o comando `choco install openssl`
 - Gere a chave privada com o comando `openssl genpkey -algorithm RSA -out app.key -pkeyopt rsa_keygen_bits:4096`
 - Ainda na mesma pasta gere a chave pública a partir da chave privada com o comando `openssl rsa -in app.key -pubout -out app.pub`
 - Pronto! Suas chaves RSA foram geradas. Basta incluí-las dentro da pasta mencionada no tópico acima.

## Prototipação
(André Santos)
https://www.figma.com/design/FSLxksz2OYmnqn7qsRTubW/Projeto-Final---Prototipagem?node-id=0-1&t=aQ6QohoaWV4MIZTJ-1

## Diagrama ER
![modelo-er](https://github.com/user-attachments/assets/01f074b3-3a82-4947-9e64-f0dd85526959)


## Git flow
### Branches

Utilizamos 3 branches principais e uma situacional. Abaixo uma breve explicação sobre tais.

### Master

Aqui fica o código final que estará disponível para o cliente consumir. Nenhum desenvolvimento pode ser realizado diretamente nesta branch.

### Release

Versão estável onde serão mergeadar através de pull requests (PR) as funcionalidades/correções desenvolvidas por cada um. Assim como na branch master, nenhum desenvolvimento deve ser realizado diretamente.

### Feature/Fix

Aqui desenvolveremos funcionalidades e/ou correções de forma isolada sem afetar o código principal. Todo o código desenvolvido deverá ser testado antes de abrir uma PR para branch `release`.

### Hotfix (situacional)

Essa branch só irá existir caso tenha algum erro muito grave em produção e que necessita de correção o mais rápido possível. Ela será um clone da master onde será feita a correção e aberta a PR direto para master. Uma vez corrigida e mergeada na master, terá que atualizar a branch release com esta correção para que não tenha problema futuro de branchs desincronizadas.

Deixo abaixo uma imagem para melhor visualização do fluxo adotado. <br/><br/>
![git-flow drawio](https://github.com/user-attachments/assets/653efe80-edd7-4db5-b79a-5a0ed03499d4)


### Convenções

Para mantermos as boas práticas, adotamos a padronização dos commits seguindo a documentação Conventional Commits.

- `feat:` novo recurso/funcionalidade;
- `fix:` solucionando um problema (bug fix);
- `refactor:` refatorização do código (mudar a o comportamento de algo que já existe);
- `docs:` mudança em documentação;
- `tests:` alteração em arquivos de testes;
- `build:` arquivos de builds e dependências;
- `perf:` qualquer ajuste relacionado a performance;
- `style:` formatação do código;
- `chore:` atualizar tarefas de build (ex. .gitignore…);
- `ci:` alteração em arquivos de integração contínua (CI/CD, caso tenhamos);
- `cleanup:` remoção de código não utilizado ou comentários;

### Links para consulta

https://www.conventionalcommits.org/en/v1.0.0/

https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13

### Exemplo de utilização

- Tipo do commit(nome_do_arquivo): uma breve descrição do que foi feito
    - feat(User): add model;
    - nome do arquivo não é obrigatório.
