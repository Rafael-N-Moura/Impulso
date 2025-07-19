# **Plano de Execução Técnico do MVP \- Impulso**

Este guia é um passo a passo direto para a construção do MVP, assumindo que o protótipo visual (tela.html) e a base de dados (vagas.json) já existem.

### **Fase 1: Construção do Backend (O Cérebro da Aplicação)**

**Objetivo:** Criar um serviço robusto que receba os dados do usuário, orquestre a análise da IA e retorne um resultado estruturado.

* **Passo 1.1: Configurar o Servidor Node.js e o Endpoint Principal**  
  * **Ferramentas:** Node.js, Express, cors, multer (para upload de arquivos).  
  * **Ação:** Crie um servidor Express que exponha um único endpoint: POST /analyze. Configure o cors para permitir requisições do seu frontend e o multer para lidar com o upload do arquivo de currículo.  
* **Passo 1.2: Implementar o Processamento do Currículo**  
  * **Ferramenta:** pdf-parse.  
  * **Ação:** Dentro da rota /analyze, use o pdf-parse para ler o buffer do arquivo de currículo enviado via multer e extrair todo o seu conteúdo como uma única string de texto.  
* **Passo 1.3: Desenvolver o Orquestrador da IA (O Coração do MVP)**  
  * **Ferramentas:** axios ou node-fetch para fazer chamadas à API do Gemini.  
  * **Ação:** Crie uma função assíncrona realizarAnalise(textoDoCV, cargoAlmejado) que executará a lógica principal:  
    1. **Carregar Dados do Mercado:** Leia e faça o parse do arquivo vagas.json local para ter acesso a todas as descrições de vagas. Filtre as vagas mais relevantes para o cargoAlmejado.  
    2. **Primeira Chamada à IA (Extração):** Envie o textoDoCV para a API do Gemini usando o **Prompt \#1 (Extração de Competências)**. O resultado esperado é um JSON contendo as habilidades do usuário.  
    3. **Segunda Chamada à IA (Análise de Lacunas):** Envie as competências do usuário (obtidas no passo anterior) e as descrições das vagas relevantes para a API do Gemini, usando o **Prompt \#2 (Análise Principal)**. O resultado esperado é o JSON com os "pontos fortes" e "pontos a desenvolver".  
    4. **Enriquecer com Cursos:** Crie um pequeno arquivo cursos.json local. Após receber a análise, faça um loop nos "pontos a desenvolver" e adicione as sugestões de cursos correspondentes a cada competência.  
    5. **Retornar Resultado:** A função deve retornar o objeto JSON final e completo, contendo o diagnóstico e o plano de ação.  
* **Passo 1.4: Finalizar o Endpoint**  
  * **Ação:** Faça com que o endpoint /analyze chame a função realizarAnalise e retorne o resultado final para o cliente com o status 200 OK. Implemente um tratamento de erros básico (bloco try/catch) para retornar um status 500 caso algo falhe.

### **Fase 2: Construção do Frontend (A Experiência do Usuário)**

**Objetivo:** Transformar o protótipo tela.html em uma aplicação React dinâmica e funcional que se comunique com o nosso backend.

* **Passo 2.1: Estruturar o Projeto React**  
  * **Ferramentas:** Vite, React, Tailwind CSS.  
  * **Ação:** Crie um novo projeto React com Vite e configure o Tailwind CSS. Recrie a estrutura visual do tela.html usando componentes React.  
* **Passo 2.2: Componentizar a Interface**  
  * **Ação:** Divida a interface em componentes reutilizáveis:  
    * UploadForm.jsx: O formulário inicial para upload e inserção do cargo.  
    * LoadingScreen.jsx: A tela de animação de carregamento que mostra os passos da análise.  
    * ResultsDisplay.jsx: O componente principal que recebe o JSON da API e renderiza o relatório final.  
    * StrengthCard.jsx, OpportunityCard.jsx, ActionPlanCard.jsx: Componentes menores para organizar a exibição dos resultados.  
* **Passo 2.3: Implementar a Lógica de Estado e Fluxo**  
  * **Ferramenta:** useState hook do React.  
  * **Ação:** No componente principal (App.jsx), crie um estado para gerenciar o fluxo da aplicação (ex: const \[appState, setAppState\] \= useState('upload'); // 'upload', 'loading', 'results'). Crie também um estado para armazenar os dados do resultado da API (const \[analysisData, setAnalysisData\] \= useState(null);).  
* **Passo 2.4: Conectar com o Backend**  
  * **Ferramenta:** axios.  
  * **Ação:** Crie uma função handleAnalyze que será chamada ao submeter o formulário. Esta função deve:  
    1. Criar um objeto FormData com o arquivo do CV e o cargo.  
    2. Mudar o estado da aplicação para loading.  
    3. Fazer a requisição POST para o seu endpoint de backend (http://localhost:PORTA/analyze) usando axios.  
    4. Ao receber a resposta, armazenar os dados no estado analysisData e mudar o estado da aplicação para results.  
    5. Implementar tratamento de erro para mudar o estado para error caso a API falhe.

### **Fase 3: Integração Final e Deploy**

**Objetivo:** Garantir que todas as partes funcionem juntas perfeitamente e colocar o MVP no ar.

* **Passo 3.1: Teste de Ponta a Ponta**  
  * **Ação:** Execute o fluxo completo diversas vezes. Use diferentes arquivos de CV (com formatos variados) e diferentes cargos-alvo para garantir que a análise continua coesa. Valide se a interface responde corretamente a todos os cenários (sucesso e erro).  
* **Passo 3.2: Deploy da Aplicação**  
  * **Frontend (React):**  
    * **Ferramenta:** **Vercel**.  
    * **Ação:** Conecte o repositório do frontend ao Vercel. Configure a variável de ambiente VITE\_API\_URL para apontar para o endereço do seu backend em produção. O deploy será automático a cada git push.  
  * **Backend (Node.js):**  
    * **Ferramenta:** **Render** (alternativa moderna ao Heroku).  
    * **Ação:** Crie um "Web Service" no Render e conecte-o ao repositório do backend. Configure as variáveis de ambiente necessárias (como a GEMINI\_API\_KEY). O Render fará o deploy e fornecerá a URL pública para você usar no frontend.