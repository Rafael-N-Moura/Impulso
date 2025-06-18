# Contributing -  SmartCV AI

Obrigado por seu interesse em contribuir com o SmartCV AI! Este projeto depende de colaboradores como você para crescer, melhorar e impactar positivamente quem busca oportunidades de emprego com mais inteligência e personalização.

## Requisitos do ambiente de desenvolvimento

Antes de começar, certifique-se de ter os seguintes requisitos instalados:

- [Node.js](https://nodejs.org) (versão 18 ou superior)
- [Python](https://www.python.org/) (versão 3.10 ou superior)
- [PostgreSQL](https://www.postgresql.org/) ou SQLite
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (opcional, mas recomendado para ambientes padronizados)
- Gerenciador de pacotes: `npm` ou `yarn`

## Passo-a-passo para configuração local

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/smartcv-ai.git
cd smartcv-ai
```

2. **Configure o frontend**

```bash
cd frontend
npm install
npm run dev
```

3. **Configure o backend**

```bash
cd ../backend
npm install
npm run dev
```

4. **Configure o ambiente Python (para IA)**

```bash
cd ../ai-models
python -m venv venv
source venv/bin/activate  # ou .\venv\Scripts\activate no Windows
pip install -r requirements.txt
```

5. **Configure variáveis de ambiente**

Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais locais:

```bash
cp .env.example .env
```

6. **Migre o banco de dados**

```bash
npx prisma migrate dev
```

7. **Execute os testes**

```bash
npm run test
```

## Boas Práticas

- Faça commits pequenos e frequentes com mensagens descritivas.

- Escreva testes para novas funcionalidades sempre que possível.

- Mantenha o estilo do código com eslint/prettier.

- Sempre execute os testes antes de submeter seu código.

## Contribuindo

1. Faça um fork do projeto

2. Crie uma branc com sua funcionalidade/correção:
    `git checkout -b feature/nome-da-sua-branch`

3. Faça suas alterações

4. Commit suas mudanças:
    `git commit -m "feat: implementa nova funcionalidade"`

5. Push para sua branch:
    `git push origin feature/nome-da-sua-feature`

6. Abra um Pull Request e descreva sua contribuição claramente.