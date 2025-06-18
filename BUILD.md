# Building – IMPULS.AI

Este documento fornece instruções detalhadas para construir, rodar e testar o projeto SmartCV AI localmente.

---

##  Requisitos de Ambiente

### Pré-requisitos gerais
- Node.js >= 18.x
- npm >= 9.x ou yarn >= 1.22
- Python >= 3.10
- Docker e Docker Compose (opcional, para ambiente isolado)

### Dependências principais
- Front-end: React + Vite + TailwindCSS
- Back-end: FastAPI (Python)
- Banco de dados: PostgreSQL
- NLP/IA: OpenAI API ou Hugging Face Transformers

---

## Passos para rodar o projeto localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/smartcv-ai.git
cd smartcv-ai
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no exemplo:
```
OPENAI_API_KEY=your_key_here
DATABASE_URL=postgresql://user:pass@localhost:5432/smartcv
```

### 3. Instalar dependências do front-end

```bash
cd frontend
npm install
# ou: yarn
```

### 4. Instalar dependências do back-end

```bash
cd ../backend
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate no Windows
pip install -r requirements.txt
```

### 5. Subir banco de dados (via Docker)

```bash
docker-compose up -d db
```

### 6. Rodar back-end localmente

```bash
uvicorn main:app --reload
```

### 7. Rodar front-end localmente

```bash
cd ../frontend
npm run dev
```

---

## Rodar os testes

### Testes no back-end (FastAPI + pytest)

```bash
pytest
```

### Testes no front-end (React + Vitest)

```bash
npm run test
```

---

📌 Para dúvidas ou problemas, consulte o README.md ou abra uma issue no repositório.
