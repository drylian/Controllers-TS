# Configuration.ts

## Visão Geral

`Configuration.ts` foi projetado para lidar com configurações básicas para sua aplicação. Ele oferece segurança de tipo e garante que valores padrão sejam definidos caso variáveis de ambiente não sejam fornecidas. Isso ajuda a manter a consistência e a confiabilidade na gestão das configurações.

## Recursos

- **Segurança de Tipo:** Garante que os valores de configuração adiram aos tipos especificados.
- **Valores Padrão:** Atribui automaticamente valores padrão se variáveis de ambiente estiverem ausentes.

## Uso

1. **Importando a Configuração:**

Para usar a configuração em seu projeto, importe a classe ou objeto `Configuration` onde for necessário:

```ts
import { Configuration } from './Configuration';

const Global = {
   port: new Configuration({
      env: "ENV_VALUE",
      def: 3000,
      type: Configuration.Type.Number
   }),
   dialect: new Configuration<"mysql" | "sqlite">({
      env: "DIALECT",
      def: "",
      checker: (value, def) => {
      if (!value) return def;
      if (value === "mysql" || value === "sqlite") return value;
      else return def;
      },
      type: Configuration.Type.String
   })
}

Global.port.get // 3000 or valor do env port em numero
```