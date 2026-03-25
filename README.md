# LAB4 - 12 fatores

Serviço HTTP desenvolvido seguindo a metodologia Twelve-Factor App, com deploy utilizando Vercel.

---

## Overview

Este projeto demonstra uma API simples com endpoint `/api/health`, construída desde o início com base nos princípios dos 12 Fatores, incluindo:

- Configuração via variáveis de ambiente
- Processos stateless (sem estado)
- Dependências explícitas
- Logs em stdout
- Desligamento gracioso (ambiente local)

---

## Project Structure

```
lab4/
├── api/
│   └── health.js
├── scripts/
│   └── dev.js
├── .env.example
├── package.json
├── README.md
├── .gitignore
└── LICENSE
```

## Como Executar

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd lab4
```

---

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

---

### 3. Instalar dependências

```bash
npm install
```

---

### 4. Rodar localmente

```bash
npm run dev
```

---

### 5. Testar o endpoint

```bash
curl http://localhost:3000/api/health
```

### Resposta esperada

```json
{
  "status": "ok",
  "uptime": 12.34,
  "timestamp": "2026-03-25T12:00:00.000Z"
}
```

---

## Deploy

A aplicação é implantada utilizando a plataforma **Vercel**, que utiliza arquitetura serverless.

Após o deploy, o endpoint estará disponível em:

```
https://seu-projeto.vercel.app/api/health
```

---

## Mapeamento dos Doze-Fatores

| Fator             | Implementação                   | Referência       |
| ----------------- | ------------------------------- | ---------------- |
| Codebase          | Repositório único               | GitHub           |
| Dependencies      | Declaradas explicitamente       | `package.json`   |
| Config            | Variáveis de ambiente           | `.env.example`   |
| Backing Services  | Configuração via env            | `.env`           |
| Build/Release/Run | Gerenciado pela plataforma      | Vercel           |
| Processes         | Funções stateless               | `api/health.js`  |
| Port Binding      | Abstraído pela plataforma       | N/A              |
| Concurrency       | Escalabilidade automática       | Vercel           |
| Disposability     | Execução efêmera                | Vercel           |
| Dev/Prod Parity   | Mesmo código em ambos ambientes | `scripts/dev.js` |
| Logs              | stdout com `console.log`        | `health.js`      |
| Admin Processes   | Script local                    | `scripts/dev.js` |

---

## Observação sobre Port Binding

Em aplicações tradicionais, o serviço faz bind em uma porta definida por variável de ambiente. No entanto, em ambientes serverless isso é abstraído pela plataforma.

> Mesmo assim, a aplicação mantém aderência aos princípios de configuração via ambiente e processos stateless definidos pelos Doze-Fatores.

---

## Observabilidade e Descartabilidade

- Logs são enviados para **stdout**
- Endpoint `/api/health` fornece status da aplicação
- Ambiente local implementa **shutdown graceful (SIGTERM)**

---

## Colaboração com IA

### Prompts utilizados

- "Generate a minimal serverless API for Vercel with a /health endpoint"
- "Adapt a Node.js Express app to serverless architecture"
- "Apply Twelve-Factor App principles in a minimal project"
- "Add graceful shutdown handling in Node.js"

---

### Iterações e decisões

- Inicialmente foi criado um servidor Express tradicional
- Foi necessário adaptar para arquitetura serverless
- Separação entre ambiente local e produção
- Inclusão de logs e tratamento de ciclo de vida

---

## Reflexão

O uso de IA acelerou significativamente a criação do scaffold inicial e ajudou a seguir os princípios dos 12 Fatores. No entanto, tivemos que fazer ajustes manuais, especialmente na adaptação para o modelo serverless da Vercel.

Esse processo contribuiu para um melhor entendimento de:

- Arquitetura stateless
- Configuração baseada em ambiente
- Abstrações de infraestrutura

### Próximos passos

- Implementar logs estruturados (JSON)
- Adicionar monitoramento e observabilidade
- Criar pipeline de CI/CD

---

## Checklist Final

- [x] Endpoint `/api/health` funcionando
- [x] Variáveis de ambiente configuradas
- [x] Logs em stdout
- [x] Arquitetura stateless
- [x] Desligamento gracioso (local)
- [x] Mapeamento dos Doze-Fatores
- [x] Documentação de uso de IA
