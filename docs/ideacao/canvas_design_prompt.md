# Prompt Design Model Canvas – SmartCV AI

## 1. Contexto da Interação

- **Quem interage?**\
  Um usuário (candidato a emprego) que deseja melhorar seu currículo para uma vaga específica e se preparar melhor para entrevistas.

- **Onde ocorre a interação?**\
  Na interface web da aplicação SmartCV AI, por meio de um formulário onde o usuário envia a descrição da vaga e seu currículo.

- **Quando a interação ocorre?**\
  Após o envio dos dois inputs (vaga + currículo), a IA é acionada para processar os dados e gerar os dois outputs (currículo ajustado + roadmap).

---

## 2. Prompt Inicial

```text
Você é um especialista em recrutamento e inteligência artificial de carreira.

Receberá a seguir:

1. DESCRIÇÃO DA VAGA: <texto da vaga ou link>
2. CURRÍCULO DO USUÁRIO: <conteúdo do currículo extraído do PDF ou colado como texto>

Sua tarefa é:

1. Analisar os requisitos da vaga (skills técnicas, experiências, soft skills, certificações).
2. Analisar o currículo e identificar pontos fortes, fracos e lacunas em relação à vaga.
3. Gerar um CURRÍCULO AJUSTADO, otimizado para sistemas de recrutamento por IA (ATS) e recrutadores humanos.
4. Gerar um ROADMAP DE ESTUDOS personalizado com:
   - Tópicos técnicos e comportamentais a estudar
   - Nível de prioridade (alta, média, baixa)
   - Recursos recomendados (links, cursos, artigos)

Retorne no seguinte formato markdown:

## Currículo Ajustado

[Resumo Profissional]  
...  
[Experiência Profissional]  
...  
[Habilidades Técnicas]  
...  
[Certificações e Soft Skills]  
...

---

## Roadmap de Estudos

1. **Tópico 1 – Prioridade Alta**  
   - Descrição  
   - Link: <recurso recomendado>  
2. **Tópico 2 – Prioridade Média**  
   - Descrição  
   - Link: <recurso recomendado>  
...
```

---

## 3. Resposta Esperada

- **Formato de saída:** Markdown estruturado e legível por humanos.
- **Conteúdo esperado:**
  - Currículo formatado com ênfase em palavras-chave da vaga.
  - Roadmap com tópicos específicos, priorizados.
  - Links confiáveis (ex: Coursera, YouTube, Artigos técnicos).
- **Tons e estilo:** Profissional, direto, conciso e sem jargões desnecessários.

---

## 4. Ações Esperadas

- Gerar currículo adaptado e pronto para download ou edição.
- Gerar roadmap exibido em interface com opção de salvar, exportar ou integrar com calendário.
- Possibilitar nova iteração com refinamento (ex: “foco maior em soft skills”).

---

## 5. Critérios de Qualidade

- **Cobertura semântica:** O currículo ajustado reflete claramente os requisitos da vaga.
- **Clareza estrutural:** Texto com seções bem definidas e títulos consistentes.
- **Relevância dos recursos sugeridos:** Links confiáveis, atualizados e direcionados.
- **Formatação compatível com ATS:** Uso de bullet points, verbos de ação, clareza nas datas.

---

## 6. Pós-processamento e Feedback

- Feedback gerado automaticamente, como:
  - “Seu currículo não menciona a tecnologia X, que é essencial para essa vaga.”
- Adicionar botões de refinamento:
  - “Revisar novamente com foco em habilidades comportamentais”
  - “Refinar linguagem para inglês empresarial”
- Log e histórico de interações para comparações entre versões anteriores.

---

## 7. Iteração e Refinamento de Prompt

- **Prompt v1:** Teste com vagas genéricas para validar estrutura básica.
- **Prompt v2:** Ajustes para separar claramente seção de currículo e roadmap.
- **Prompt v3:** Inclusão de critérios de formatação ATS e linguagem neutra.
- **Prompt v4 (ideal):** Modular, adaptável com foco específico (técnico, soft skill, linguagem).

---

## 8. Medição e Validação

- **Métricas quantitativas:**

  - NPS do usuário após geração
  - Taxa de download/uso do currículo gerado
  - Número médio de iterações por usuário
  - Taxa de cliques nos links do roadmap

- **Métricas qualitativas:**

  - Feedback textual dos usuários sobre clareza, relevância e usabilidade
  - Comparações entre currículos antes e depois com especialistas de RH

---

