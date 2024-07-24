Aqui está o `README.md` traduzido para o português:

```markdown
# I18alt - Biblioteca de Internacionalização

## Visão Geral

A classe `I18alt` é uma biblioteca projetada para gerenciar e traduzir recursos de idiomas em uma aplicação TypeScript. Ela suporta o carregamento dinâmico de recursos de idiomas e fornece métodos para tradução e gerenciamento de idiomas.

## Nota do Autor

Criei isso para facilitar a vida de produção usando langs dinamicas, diferente do i18next que é necessario reiniciar o codigo, usando a função 

## Recursos

- **Recursos de Idiomas Dinâmicos:** Carregue e gerencie recursos de idiomas com base no modo atual e na configuração.
- **Gerenciamento de Tradução:** Traduza chaves e manipule substituições de parâmetros para conteúdo dinâmico.
- **Troca de Idiomas:** Troque entre diferentes idiomas e gerencie os idiomas disponíveis.
- **Suporte a Namespace:** Recupere recursos por namespace para tradução estruturada.

## Uso

Importe e use a classe `I18alt` para gerenciar recursos de idiomas e realizar traduções.

```typescript
import I18alt from './I18alt';

// Inicialize com o idioma padrão
const i18n = I18alt.live;

// Traduza uma chave com parâmetros
const translatedText = i18n.t('greeting.hello', { name: 'John' });

// Troque de idioma
i18n.setLanguage('en-us');

// Obtenha recursos de namespace
const namespaceResources = i18n.GNR('common.errors');
```

## Métodos

### `constructor(lang?: string)`

- **Descrição:** Inicializa a instância do `I18alt` com um idioma padrão opcional.
- **Parâmetros:**
  - `lang` (opcional): Idioma padrão a ser usado, se não fornecido.

### `get mt()`

- **Descrição:** Retorna informações meta para todos os idiomas.
- **Retorna:** Array de objetos contendo informações meta e código do idioma.

### `get meta()`

- **Descrição:** Recupera informações meta para todos os idiomas.
- **Retorna:** Array de objetos contendo informações meta e código do idioma.

### `lmt(lang: string)`

- **Descrição:** Recupera informações meta para um idioma específico.
- **Parâmetros:**
  - `lang`: Código do idioma para recuperar informações meta.
- **Retorna:** Informações meta para o idioma especificado.

### `lr(lang?: string)`

- **Descrição:** Recupera recursos de idioma para um idioma específico ou todos os idiomas.
- **Parâmetros:**
  - `lang` (opcional): Código do idioma para recuperar recursos.
- **Retorna:** Recursos de idioma para o idioma especificado ou todos os idiomas.

### `goc(key: string, lang?: string)`

- **Descrição:** Recupera um valor dos recursos principais com base em uma chave.
- **Parâmetros:**
  - `key`: Chave para recuperar o valor.
  - `lang` (opcional): Código do idioma para recuperar o valor.
- **Retorna:** Valor correspondente à chave.

### `t(key: string, params: Record<string, string | number> = {}, checker = true)`

- **Descrição:** Traduz uma chave com parâmetros opcionais.
- **Parâmetros:**
  - `key`: Chave a ser traduzida.
  - `params` (opcional): Parâmetros para substituir na tradução.
  - `checker` (opcional): Flag para verificar traduções ausentes.
- **Retorna:** String traduzida.

### `get lg()`

- **Descrição:** Recupera o idioma atual.
- **Retorna:** Código do idioma atual.

### `get language()`

- **Descrição:** Recupera o idioma atual.
- **Retorna:** Código do idioma atual.

### `get lgs()`

- **Descrição:** Recupera todos os idiomas disponíveis.
- **Retorna:** Array de códigos de idiomas disponíveis.

### `get languages()`

- **Descrição:** Recupera todos os idiomas disponíveis.
- **Retorna:** Array de códigos de idiomas disponíveis.

### `sl(lang?: string)`

- **Descrição:** Define o idioma atual.
- **Parâmetros:**
  - `lang` (opcional): Código do idioma a ser definido como atual.
- **Retorna:** `true` se o idioma foi definido com sucesso, `false` caso contrário.

### `GNR(namespace: string, lang?: string)`

- **Descrição:** Recupera recursos de namespace para um idioma específico.
- **Parâmetros:**
  - `namespace`: Namespace para recuperar recursos.
  - `lang` (opcional): Código do idioma para recuperar recursos.
- **Retorna:** Objeto contendo recursos para o namespace especificado.

## Constantes

### `LangsPATH`

- **Descrição:** Caminho para o diretório de recursos de idiomas com base no modo atual.
- **Tipo:** `string`

### `LANGUAGE`

- **Descrição:** Código do idioma padrão.
- **Tipo:** `string`

### `core(message: LoggingsMessage[])`

- **Descrição:** Registra uma mensagem de aviso.
- **Parâmetros:**
  - `message`: Mensagem(s) para registrar.