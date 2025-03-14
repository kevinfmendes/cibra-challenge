# cibra-challenge

Desafio Frontend Cibra - Gerenciamento de Usuários
Projeto desenvolvido como parte do desafio técnico para a vaga de desenvolvedor front-end na Cibra.

💻 Sobre o projeto
Esta aplicação é um sistema de gerenciamento de usuários que consome dados da API JSONPlaceholder. Suas principais funcionalidades incluem:

Listagem de usuários
Busca de usuários por nome, username ou email
Adição de novos usuários com avatar personalizado
Edição de usuários cadastrados *
Visualização detalhada de cada usuário
Exclusão de usuários
Persistência de dados via localStorage
Modo Dark

🚀 Tecnologias utilizadas
O projeto foi desenvolvido utilizando as seguintes tecnologias:

Next.js
TypeScript
React Hook Form
Tailwind CSS
Radix UI
Axios
Yarn

🔧 Instalação e execução
Para executar o projeto localmente, siga os passos abaixo:
bashCopiar# Clone este repositório
git clone https://github.com/seu-usuario/cibra-challenge.git

# Acesse a pasta do projeto
cd cibra-challenge

# Instale as dependências
yarn install

# Execute a aplicação em modo de desenvolvimento
yarn dev

# A aplicação será aberta na porta 5173 - acesse http://localhost:5173
📝 Estrutura do projeto

src/app: Páginas da aplicação
src/components: Componentes reutilizáveis
src/hooks: Custom hooks
src/services: Serviços para chamadas de API
src/types: Definições de tipos
src/utils: Funções utilitárias

🌟 Recursos implementados

Listagem de usuários com cards

Exibição de nome, username e email
Foto de perfil/avatar
Link para detalhes


Página de detalhes do usuário

Informações completas
Navegação intuitiva


Formulário para adicionar usuários

Upload de imagem para avatar
Validação de campos obrigatórios


Gerenciamento de estado

Persistência via localStorage
Sincronização com a API


Interface responsiva

Adaptação para diferentes tamanhos de tela
Experiência otimizada em mobile


Busca de usuários

Filtro em tempo real
Busca por diferentes campos



📌 Observações

Os dados são inicialmente carregados da API JSONPlaceholder
Alterações (adições/exclusões) são mantidas no localStorage
O sistema mantém a consistência dos dados durante a navegação entre páginas