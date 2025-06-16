Chronos: Um Assistente Criativo para Mestres de RPG
Chronos é uma plataforma web open-source, desenvolvida com IA Generativa, projetada para ser a principal ferramenta de apoio para Mestres de Jogos de RPG de mesa (Game Masters). Nosso objetivo é reduzir drasticamente o tempo de preparação e o bloqueio criativo, permitindo que mestres criem e conduzam aventuras memoráveis com mais facilidade e confiança.

Este projeto está sendo desenvolvido no contexto da disciplina [IF1006] Transformação Digital com IA, do Centro de Informática da UFPE.

🎯 Objetivos Principais e Funcionalidades
Nosso objetivo estratégico é auxiliar Game Masters, reduzindo a barreira criativa e o tempo de preparação para criar sessões de RPG imersivas.

Funcionalidades Esperadas (MVP - "O Construtor")

O Produto Mínimo Viável foca nas ferramentas de preparação pré-jogo, que atacam o maior ponto de dor dos mestres:

🎲 Gerador de NPCs: Cria personagens não-jogáveis (NPCs) completos a partir de um simples conceito (ex: "taverneiro anão ex-aventureiro"), gerando nome, aparência, personalidade, motivação e um segredo para ser usado em jogo.

🗺️ Gerador de Locais: Gera descrições textuais ricas e atmosféricas para cenários como tavernas, cidades, florestas e masmorras, ajudando o mestre a criar o clima da cena instantaneamente.

📜 Gerador de Missões: Desenvolve "ganchos" de aventura e missões secundárias, detalhando um objetivo, um contratante, uma reviravolta e possíveis recompensas.

🏗️ Estrutura da Aplicação (Arquitetura)
Para documentar a arquitetura da nossa solução, adotamos o Modelo C4, que nos permite visualizar o sistema em diferentes níveis de abstração.

O diagrama abaixo representa o Nível 1: Contexto, mostrando como o Chronos se encaixa no seu ecossistema, interagindo com seus usuários (Game Masters) e com sistemas externos (a API do Gemini).

graph TD
    subgraph "Sistema Chronos"
        direction LR
        A[<div style='font-size: 1.2rem; font-weight: bold'>Chronos Web App</div><br>Aplicação web onde o mestre interage<br>para gerar conteúdo.]
    end

    B(Game Master) -- Usa --> A
    A -- Faz chamadas de API --> C{Gemini API}

    style A fill:#262626,stroke:#a855f7,stroke-width:4px,color:#fff
    style B fill:#555,stroke:#fff,stroke-width:2px,color:#fff
    style C fill:#444,stroke:#fff,stroke-width:2px,color:#fff

Para diagramas mais detalhados (Nível 2: Contêineres e Nível 3: Componentes), por favor, visite nosso diretório de diagramas.

🔗 Recursos Importantes
📝 Workspace do Projeto: [Link para o Google Docs, Notion, ou outra ferramenta da equipe]

🐛 Rastreador de Issues (GitHub): [Link para a aba "Issues" do seu repositório no GitHub]

** Kanban Board (GitHub Projects):** [Link para o seu quadro de projetos no GitHub]

🚀 Guia de Instalação e Execução (Build Local)
Instruções detalhadas sobre como configurar o ambiente de desenvolvimento e executar o projeto localmente estão disponíveis em nosso guia BUILD.md.

➡️ Acesse o Guia de Build

✨ Quer Contribuir?
Estamos sempre procurando por novos aventureiros para se juntar à nossa guilda! Se você é um desenvolvedor, designer, ou apenas um entusiasta de RPG com boas ideias, sua contribuição é muito bem-vinda.

Tarefas para Iniciantes

Para facilitar seus primeiros passos, separamos algumas tarefas que são ideais para novos contribuidores. Elas são um ótimo jeito de se familiarizar com o projeto.

➡️ Veja as tarefas com a label good first issue

Guia de Contribuição

Antes de começar, por favor, leia nosso guia de contribuição. Ele detalha nosso processo de submissão de código, padrões de commit, e outras informações importantes para garantir que tenhamos uma colaboração fluida e eficiente.

➡️ Leia nosso Guia de Contribuição

