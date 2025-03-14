# cibra-challenge

# Desafio Frontend Cibra - Gerenciamento de Usuários
Projeto desenvolvido como parte do desafio técnico para a vaga de desenvolvedor front-end na Cibra.

💻 Sobre o projeto
Esta aplicação é um sistema de gerenciamento de usuários que consome dados da API JSONPlaceholder para mockar inicialmente suas informações.
Sendo possível também a adição, exclusao e edição de usuários localmente.

Suas principais funcionalidades incluem:
Listagem de usuários
Busca de usuários por nome, username ou email
Adição de novos usuários com avatar personalizado
Edição de usuários cadastrados *
Visualização detalhada de cada usuário
Exclusão de usuários
Persistência de dados via localStorage
Integração viaCep para buscar informações de Endereço
Modo Dark

✏️Considerações:
- Além dos requisitos necessários informados na descrição do teste, tomei a liberdade de adicionar esquema de edição dos registros de usuários e adicionei integração com viaCep para busca de dados de endereço com confirmação visual da resposta da api consumida através do Toast configurado;
- Optei por utilizar as preferências previamente definidas no navegador/sistema usado para definir o uso do modo dark/light na aplicação;
- Como o gerenciamento dos registros deve ser realizado diretamente através do localStorage para evitar perca de dados, a perfomance pode ser comprometida por não ser a melhor forma de trafegar dados;
- Organizei os components para compor um Design System com components reutilizáveis, consistência visual e padrão de comportamento.
- Diante do escopo do teste e a necessidade de conciliar o tempo, priorizei pela entrega do projeto. Porém em outro cenário de dedicação exclusiva levaria em consideração a aplicação de testes automatizados, documentação com StoryBook, containerização do projeto, entre demais práticas.
  
🚀 Tecnologias utilizadas
O projeto foi desenvolvido utilizando as seguintes tecnologias:

- Next.js
- TypeScript
- React Hook Form
- Tailwind CSS
- Radix UI
- Axios
- Yarn

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
Edição
Informações completas
Navegação intuitiva

Dark/Light Mode

Formulário para adicionar / editar usuários

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
Alterações (adições/exclusões) são mantidas no localStorage.
