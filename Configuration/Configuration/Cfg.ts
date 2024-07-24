import Env from "./Env";
import { ConfigurationContructor, ConfigurationSchema, ConfigurationTypes, ConfigurationValue } from "./types";

function ValueParse<Schematic>(value: string, type: ConfigurationTypes, checker: ConfigurationContructor<Schematic>['checker']): ConfigurationValue<Schematic> | undefined {
    const chk = (str: any) => {
        if (checker) return checker(str as ConfigurationValue<Schematic>, undefined as unknown as ConfigurationValue<Schematic>, Env) as ConfigurationValue<Schematic>;
        return value as ConfigurationValue<Schematic>;
    }

    switch (type) {
        case ConfigurationTypes.String:
            if (value !== undefined) {
                return chk(value);
            } else return undefined;

        case ConfigurationTypes.Boolean:
            if (value !== undefined) {
                return chk(Boolean(value));
            } else return undefined;

        case ConfigurationTypes.Number:
            if (value !== undefined) {
                return chk(Number(value));
            } else return undefined;

        case ConfigurationTypes.Object:
            if (value !== undefined) {
                return chk(JSON.parse(value));
            } else return undefined;

        case ConfigurationTypes.Array:
            if (value !== undefined) {
                return chk(JSON.parse(value));
            } else return undefined;
    }
}

function ValueStringify<Schematic>(value: ConfigurationValue<Schematic> | undefined, type: ConfigurationTypes, checker: ConfigurationContructor<Schematic>['checker']): string | undefined {
    const chk = (str: any) => {
        if (checker) return checker(str as ConfigurationValue<Schematic>, undefined as unknown as ConfigurationValue<Schematic>, Env) as string;
        return value as ConfigurationValue<Schematic>;
    }

    switch (type) {
        case ConfigurationTypes.String:
            if (value !== undefined) {
                const valor = chk(value);
                if (valor === undefined) return undefined;
                return String(valor);
            } else return undefined;

        case ConfigurationTypes.Boolean:
            if (value !== undefined) {
                const valor = chk(value);
                if (valor === undefined) return undefined;
                return valor == true ? "true" : "false";
            } else return undefined;

        case ConfigurationTypes.Number:
            if (value !== undefined) {
                const valor = chk(value);
                if (valor === undefined) return undefined;
                return `"${valor}"`;
            } else return undefined;

        case ConfigurationTypes.Object:
            if (value !== undefined) {
                const valor = chk(value);
                if (valor === undefined) return undefined;
                return JSON.stringify(valor);
            } else return undefined;

        case ConfigurationTypes.Array:
            if (value !== undefined) {
                const valor = chk(value);
                if (valor === undefined) return undefined;
                return JSON.stringify(valor);
            } else return undefined;
    }
}
/**
 * Parses the environment variable based on the provided configuration schema.
 * @template Schematic - The type of the configuration value.
 * @param {ConfigurationSchema<Schematic>} options - The configuration schema options.
 * @returns {Schematic} The parsed configuration value.
 */
function Parse<Schematic>(options: ConfigurationContructor<Schematic>): ConfigurationValue<Schematic> {
    switch (options.type) {
        case ConfigurationTypes.String:
            let string = Env.read(options.env);
            if (string !== undefined) {
                if (options.checker) {
                    return options.checker(string as ConfigurationValue<Schematic>, options.def, Env)
                } else return string as ConfigurationValue<Schematic>;
            } else return options.def;

        case ConfigurationTypes.Boolean:
            let boolean = Env.read(options.env);
            if (!boolean) {
                console.log(boolean);
                if (options.checker) {
                    return options.checker((Boolean(boolean)) as ConfigurationValue<Schematic>, options.def, Env)
                } else return (Boolean(boolean)) as ConfigurationValue<Schematic>;
            } else return options.def;

        case ConfigurationTypes.Number:
            let number = Env.read(options.env);
            if (number !== undefined) {
                if (options.checker) {
                    return options.checker(Number(number) as ConfigurationValue<Schematic>, options.def, Env)
                } else return Number(number) as ConfigurationValue<Schematic>;
            } else return options.def;

        case ConfigurationTypes.Object:
            let object = Env.read(options.env);
            if (object !== undefined) {
                if (options.checker) {
                    return options.checker(JSON.parse(object) as ConfigurationValue<Schematic>, options.def, Env)
                } else return JSON.parse(object);
            } else return options.def;

        case ConfigurationTypes.Array:
            let array = Env.read(options.env);
            if (array !== undefined) {
                if (options.checker) {
                    return options.checker(JSON.parse(array) as ConfigurationValue<Schematic>, options.def, Env)
                } else return JSON.parse(array);
            } else return options.def;
    }
}

/**
 * Stringifies the configuration value based on the provided configuration schema.
 * @template Schematic - The type of the configuration value.
 * @param {ConfigurationSchema<Schematic> & { value: Schematic }} options - The configuration schema options including the value to stringify.
 * @returns {string} The stringified configuration value.
 */
function Stringify<Schematic>(options: ConfigurationSchema<Schematic> & { value: ConfigurationValue<Schematic> }): string {
    switch (options.type) {
        case ConfigurationTypes.String:
            let string = options.value;
            if (!string) string = options.def;
            if (options.checker) string = options.checker(string, options.def, Env);
            return JSON.stringify(string);

        case ConfigurationTypes.Boolean:
            let boolean = options.value;
            if (boolean == undefined) boolean = options.def;
            if (options.checker) boolean = options.checker(boolean, options.def, Env);
            return boolean == true ? "true" : "false";

        case ConfigurationTypes.Number:
            let number = options.value;
            if (!number) number = options.def;
            if (options.checker) number = options.checker(number, options.def, Env);
            return String(number);

        case ConfigurationTypes.Object:
            let object = options.value;
            if (!object) object = options.def;
            if (options.checker) object = options.checker(object, options.def, Env);
            return JSON.stringify(object);

        case ConfigurationTypes.Array:
            let array = options.value;
            if (!array) array = options.def;
            if (options.checker) array = options.checker(array, options.def, Env);
            return JSON.stringify(array);
    }
}

const env = Env;
export { Parse, Stringify, env, ValueParse, ValueStringify };
export default { Parse, Stringify, env, ValueParse, ValueStringify };