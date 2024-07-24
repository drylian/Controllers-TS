# Crons - Gerenciador de Tarefas Cron

## Visão Geral

A classe `Crons` é uma biblioteca para gerenciar tarefas cron em uma aplicação Node.js. Ela permite configurar tarefas cron recorrentes, tarefas cron únicas e gerenciar os agendamentos de execução.

## Recursos

- **Configuração de Tarefas Cron Recorrentes:** Defina e agende tarefas cron que são executadas em intervalos regulares.
- **Tarefas Cron Únicas:** Configure tarefas cron que devem ser executadas apenas uma vez.
- **Gerenciamento de Tarefas Cron:** Inicie, remova e atualize tarefas cron conforme necessário.
- **Gerenciamento de Eventos:** Use o `EventEmitter` para gerenciar eventos de tarefas cron.

## Uso

Importe e use a classe `Crons` para gerenciar suas tarefas cron.

```typescript
import { Crons } from './Crons';

// Definição de uma tarefa cron recorrente
const cronConfig = {
    name: 'ExemploCron',
    cron: '* * * * *', // Executa a cada minuto
    exec: (cron, interval) => {
        console.log(`Tarefa Cron "${cron.name}" executada.`);
    }
};

// Adiciona uma nova tarefa cron
const cronInstance = new Crons(cronConfig);

// Inicia a tarefa cron
Crons.start(cronConfig);

// Atualiza ou adiciona uma tarefa cron
Crons.post(cronConfig);

// Remove uma tarefa cron
Crons.remove('ExemploCron');

// Configura uma tarefa cron única
Crons.once({
    name: 'UnicoCron',
    cron: '*/5 * * * *', // Executa a cada 5 minutos
    exec: (cron) => {
        console.log(`Tarefa Única "${cron.name}" executada.`);
    },
    metadata: {}
});
```

## Métodos

### `constructor(data: CronsConfigurations<Metadata>)`

- **Descrição:** Constrói uma nova instância de `Crons` com a configuração fornecida.
- **Parâmetros:**
  - `data`: Configuração da tarefa cron.

### `static start(cron: CronsConfigurationsSystem<Metadata>)`

- **Descrição:** Inicia a tarefa cron configurada e agenda sua próxima execução.
- **Parâmetros:**
  - `cron`: Configuração da tarefa cron.

### `static remove(name: string)`

- **Descrição:** Remove uma tarefa cron existente e cancela seu intervalo.
- **Parâmetros:**
  - `name`: Nome da tarefa cron a ser removida.
- **Retorna:** `true` se a tarefa foi removida com sucesso, `false` caso contrário.

### `static once<MetaArgs>(cron: UniqueCron<MetaArgs>)`

- **Descrição:** Configura uma tarefa cron única que será executada apenas uma vez.
- **Parâmetros:**
  - `cron`: Configuração da tarefa cron única.
- **Retorna:** ID do `setTimeout`, que pode ser usado para cancelamento.

### `static post(cron: CronsConfigurationsSystem<Metadata>)`

- **Descrição:** Atualiza ou adiciona uma tarefa cron.
- **Parâmetros:**
  - `cron`: Configuração da tarefa cron.

### `static date(date: Date)`

- **Descrição:** Gera uma expressão cron para uma data específica.
- **Parâmetros:**
  - `date`: Data para a qual gerar a expressão cron.
- **Retorna:** Expressão cron gerada.

## Tipos

### `CronsConfigurations<Metadata>`

- **Descrição:** Configuração para tarefas cron recorrentes.
- **Propriedades:**
  - `name`: Identificador da tarefa cron.
  - `cron`: Argumento cron, por exemplo, "* * * * * *" para cada segundo.
  - `exec`: Função a ser executada quando a tarefa cron for acionada.
  - `metadata` (opcional): Metadados para a tarefa cron.
  - `once` (opcional): Indica se a tarefa cron deve ser executada apenas uma vez.

### `UniqueCron<MetaArgs>`

- **Descrição:** Configuração para tarefas cron únicas.
- **Propriedades:**
  - `name`: Identificador da tarefa cron.
  - `cron`: Argumento cron, por exemplo, "* * * * * *" para cada segundo.
  - `exec`: Função a ser executada quando a tarefa cron única for acionada.
  - `metadata`: Metadados para a tarefa cron.

### `CronsConfigurationsSystem<Metadata>`

- **Descrição:** Configuração estendida para tarefas cron, incluindo um UUID.
- **Propriedades:**
  - `uuid`: Identificador único da tarefa cron.
  - `started`: Indica se a tarefa cron foi iniciada.
  - `next_exec`: Tempo até a próxima execução.
