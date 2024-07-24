# Módulo de Configuração de Caminho

## Visão Geral

Este módulo é projetado para lidar com caminhos e diretórios com base no modo atual da aplicação, que pode ser "Bundle", "Typescript" ou "Javascript". Ele fornece constantes utilitárias para trabalhar com diferentes estruturas e configurações de arquivos.

## Recursos

- **Detecção do Modo Atual:** Determina automaticamente se o modo atual é "Bundle", "Typescript" ou "Javascript".
- **Caminhos Dinâmicos:** Fornece caminhos dinâmicos para raiz, recursos, armazenamento e locais absolutos com base no modo atual.

## Uso

Importe o módulo para o seu projeto e use as constantes fornecidas para gerenciar caminhos e diretórios de forma eficaz.

```ts
import { CurrentMode, RootPATH, ResourcesPATH, StoragePATH, AbsolutePATH } from './pathConfig';

// Exemplo de uso
console.log(`Modo Atual: ${CurrentMode}`);
console.log(`Caminho Raiz: ${RootPATH}`);
console.log(`Caminho dos Recursos: ${ResourcesPATH}`);
console.log(`Caminho de Armazenamento: ${StoragePATH}`);
console.log(`Caminho Absoluto: ${AbsolutePATH}`);
```
