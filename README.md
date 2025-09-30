# CodeLeap Network

## 📌 Visão Geral
Este é o **meu primeiro projeto utilizando React**, desenvolvido como parte de um teste técnico de bootcamp.  

O **CodeLeap Network** é uma plataforma social simples que permite que usuários se registrem com um nome de usuário e compartilhem posts curtos em um feed.  
Cada usuário pode **criar, editar e deletar** seus próprios posts, demonstrando funcionalidades básicas do React em uma interface limpa e profissional.  

O projeto te

---

## 📝 Conceito
O aplicativo simula uma rede social mínima com os seguintes fluxos:

- **Página de Signup**  
  Formulário simples onde o usuário insere um nome de usuário para “se registrar” e acessar a tela principal.  
  *(Não há backend: o estado é armazenado localmente para simulação).*

- **Tela Principal (Main Screen)**  
  Exibe um feed de posts ordenados pelo mais recente.  
  Usuários podem criar novos posts (com título e conteúdo).  
  Posts do próprio usuário exibem botões de **editar** e **deletar**.

- **Modal de Edição**  
  Popup que permite atualizar o título e conteúdo de um post existente.

- **Alerta de Deleção**  
  Modal de confirmação para evitar exclusões acidentais.

---

## 🎨 Design e Usabilidade
- Layout **profissional e limpo**, com modals para ações (UX clara, sem sobrecarga de tela).  
- Fluxo funcional com posts armazenados em **estado local** (ou `localStorage` para persistência).  
- Estrutura de código organizada em **componentes modulares**, facilitando reutilização e manutenção.  

Esse modelo mantém o projeto simples para iniciantes, mas já demonstra **boas práticas** como gerenciamento de estado e manipulação de eventos.

---

## 🛠️ Tecnologias Utilizadas
- **React**  
  - Componentes funcionais  
  - `props` para passagem de dados  
  - `useState` para gerenciamento de estado local (posts, inputs, modals)  
  - `useEffect` para carregar dados persistidos  
  - Eventos simples (`onSubmit`, `onClick`)  

- **React Router** *(opcional)*  
  Para navegação entre signup e feed principal.

- **CSS (Modules)**  
  - Layout com **Flexbox**  
  - Estilização limpa e moderna  
  - Modals com **sombras e bordas arredondadas**  
  *(Sem frameworks como Tailwind para manter a leveza.)*

- **LocalStorage**  
  Persistência de posts entre sessões, simulando um backend simples.

- **Sem APIs externas ou banco de dados**  
  Toda a lógica é client-side, para focar no aprendizado de frontend.

---

## 🚀 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/codeleap-network.git
