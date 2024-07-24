# Path Configuration Module

## Overview

This module is designed to handle paths and directories based on the current mode of the application, which can be "Bundle", "Typescript", or "Javascript". It provides utility constants to work with different file structures and configurations.

## Features

- **Current Mode Detection:** Automatically determines if the current mode is "Bundle", "Typescript", or "Javascript".
- **Dynamic Paths:** Provides dynamic paths for root, resources, storage, and absolute locations based on the current mode.

## Usage

Import the module into your project and use the provided constants to manage paths and directories effectively.

```ts
import { CurrentMode, RootPATH, ResourcesPATH, StoragePATH, AbsolutePATH } from './pathConfig';

// Example usage
console.log(`Current Mode: ${CurrentMode}`);
console.log(`Root Path: ${RootPATH}`);
console.log(`Resources Path: ${ResourcesPATH}`);
console.log(`Storage Path: ${StoragePATH}`);
console.log(`Absolute Path: ${AbsolutePATH}`);
```
