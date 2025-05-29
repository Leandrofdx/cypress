# Automação de Testes com Cypress

Este projeto contém testes automatizados usando **Cypress** para validação de funcionalidades web.

## 📌 Descrição

O objetivo deste projeto é demonstrar a implementação de testes automatizados usando Cypress, incluindo boas práticas de automação e geração de relatórios.

## 🚀 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) - Framework de automação de testes
- [Mochawesome](https://github.com/adamgruber/mochawesome) - Gerador de relatórios
- [Allure](https://docs.qameta.io/allure/) - Framework de relatórios
- **JavaScript** - Linguagem utilizada nos testes

## ⚙️ Pré-requisitos

Antes de executar os testes, certifique-se de que possui:

- [Node.js](https://nodejs.org/) instalado
- [npm](https://www.npmjs.com/) instalado

## 🛠 Como Configurar e Executar os Testes

1. **Clone este repositório**

2. **Navegue até o diretório do projeto**

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Execute os testes:**

   - Para abrir o **Cypress Test Runner** e rodar os testes manualmente:
     ```bash
     npx cypress open
     ```

   - Para executar os testes em **modo headless** e gerar um relatório:
     ```bash
     npm run generate-all-reports
     ```

## 📂 Estrutura do Projeto

```
.
├── cypress/
│   ├── e2e/           # Testes end-to-end
│   ├── fixtures/      # Dados de teste
│   └── support/       # Arquivos de suporte
├── results/           # Diretório para relatórios
├── cypress.config.js  # Configuração do Cypress
└── package.json       # Dependências e scripts
```

## 📊 Relatórios

O projeto utiliza dois tipos de relatórios:

1. **Mochawesome**: Relatório HTML interativo gerado após a execução dos testes
   - Localização: `results/report-final.html`

2. **Allure**: Framework de relatórios para visualização detalhada dos testes
   - Para gerar o relatório Allure:
     ```bash
     npm run test
     ```

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE).  