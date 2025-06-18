# IMPULS.AI

## Descrição Geral

SmartCV AI é uma aplicação web baseada em inteligência artificial cujo objetivo é otimizar o currículo do usuário de acordo com uma vaga de emprego específica. A plataforma também gera um roadmap de estudos personalizado com base nas competências exigidas pela vaga, auxiliando na preparação para entrevistas técnicas e comportamentais.

## Objetivos e Funcionalidades Esperadas

- Upload/análise de uma vaga de emprego (link ou texto).
- Upload/análise de um currículo em PDF ou texto.
- Geração de currículo ajustado e otimizado para ATS (Applicant Tracking Systems) e recrutadores humanos.
- Geração de roadmap de estudos (técnico e soft skills) com links recomendados.
- Histórico de ajustes anteriores com versionamento.
- Integração com LinkedIn, GitHub e Google Drive (futuro).

## Estrutura Organizacional do Código

```text
smartcv-ai/
├── frontend/         # Interface do usuário (React)
├── backend/          # Lógica de negócio (Node.js + Python para IA)
├── ai-models/        # Scripts e modelos de IA (NLP, ajuste de currículo)
├── data/             # Dados de treinamento e testes
├── public/           # Arquivos públicos (favicon, assets)
├── docs/             # Documentação técnica
└── tests/            # Testes automatizados

