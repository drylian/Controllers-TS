Aqui está o `README.md` para o código fornecido, com a adição de comentários DocJS:

```markdown
# I18alt - Internationalization Library

## Overview

The `I18alt` class is a library designed for managing and translating language resources in a TypeScript application. It supports dynamic loading of language resources and provides methods for translation and language management.


## Author Note

I created this to make production life easier using dynamic langs, unlike i18next where it is necessary to restart the code, using the function

## Features

- **Dynamic Language Resources:** Load and manage language resources based on the current mode and configuration.
- **Translation Management:** Translate keys and handle parameter replacement for dynamic content.
- **Language Switching:** Switch between different languages and manage available languages.
- **Namespace Support:** Retrieve resources by namespace for structured translation.

## Usage

Import and use the `I18alt` class to manage language resources and perform translations.

```typescript
import I18alt from './I18alt';

// Initialize with default language
const i18n = I18alt.live;

// Translate a key with parameters
const translatedText = i18n.t('greeting.hello', { name: 'John' });

// Switch language
i18n.setLanguage('en-us');

// Get namespace resources
const namespaceResources = i18n.GNR('common.errors');
```

## Methods

### `constructor(lang?: string)`

- **Description:** Initializes the `I18alt` instance with an optional default language.
- **Parameters:**
  - `lang` (optional): Default language to use if not provided.

### `get mt()`

- **Description:** Returns meta information for all languages.
- **Returns:** Array of objects containing meta information and language code.

### `get meta()`

- **Description:** Retrieves meta information for all languages.
- **Returns:** Array of objects containing meta information and language code.

### `lmt(lang: string)`

- **Description:** Retrieves meta information for a specific language.
- **Parameters:**
  - `lang`: Language code to retrieve meta information for.
- **Returns:** Meta information for the specified language.

### `lr(lang?: string)`

- **Description:** Retrieves language resources for a specific language or all languages.
- **Parameters:**
  - `lang` (optional): Language code to retrieve resources for.
- **Returns:** Language resources for the specified language or all languages.

### `goc(key: string, lang?: string)`

- **Description:** Retrieves a value from the core resources based on a key.
- **Parameters:**
  - `key`: Key to retrieve value for.
  - `lang` (optional): Language code to retrieve value for.
- **Returns:** Value corresponding to the key.

### `t(key: string, params: Record<string, string | number> = {}, checker = true)`

- **Description:** Translates a key with optional parameters.
- **Parameters:**
  - `key`: Key to translate.
  - `params` (optional): Parameters to replace in the translation.
  - `checker` (optional): Flag to check for missing translations.
- **Returns:** Translated string.

### `get lg()`

- **Description:** Retrieves the current language.
- **Returns:** Current language code.

### `get language()`

- **Description:** Retrieves the current language.
- **Returns:** Current language code.

### `get lgs()`

- **Description:** Retrieves all available languages.
- **Returns:** Array of available language codes.

### `get languages()`

- **Description:** Retrieves all available languages.
- **Returns:** Array of available language codes.

### `sl(lang?: string)`

- **Description:** Sets the current language.
- **Parameters:**
  - `lang` (optional): Language code to set as current.
- **Returns:** `true` if the language was set successfully, `false` otherwise.

### `GNR(namespace: string, lang?: string)`

- **Description:** Retrieves namespace resources for a specific language.
- **Parameters:**
  - `namespace`: Namespace to retrieve resources for.
  - `lang` (optional): Language code to retrieve resources for.
- **Returns:** Object containing resources for the specified namespace.

## Constants

### `LangsPATH`

- **Description:** Path to the language resources directory based on the current mode.
- **Type:** `string`

### `LANGUAGE`

- **Description:** Default language code.
- **Type:** `string`

### `core(message: LoggingsMessage[])`

- **Description:** Logs a warning message.
- **Parameters:**
  - `message`: Message(s) to log.
