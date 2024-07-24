# Configuration.ts

## Overview

`Configuration.ts` is designed to handle basic configuration settings for your application. It provides type safety and ensures default values are set if environment variables are not provided. This helps maintain consistency and reliability in your configuration management.

## Features

- **Type Safety:** Ensures that configuration values adhere to the specified types.
- **Default Values:** Automatically assigns default values if environment variables are missing.

## Usage

1. **Importing Configuration:**

To use the configuration in your project, import the `Configuration` class or object where needed:

```ts
import { Configuration } from './Configuration';

const Global = {
   port:new Configuration({
      env:"ENV_VALUE",
      def:3000,
      type:Configuration.Type.Number
   }),
   dialect:new Configuration<"mysql"|"sqlite">({
      env:"DIALECT",
      def:"",
      checker:(value,def) => {
         if(!value) return def
         if(value==="mysql"||value==="sqlite") return value
         else return def;
      }
      type:Configuration.Type.Number
   })
}

Global.port.get // 3000 or env port value in number
```
