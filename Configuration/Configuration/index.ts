import { ConfigurationContructor, ConfigurationSchema, ConfigurationTypes, ConfigurationValue } from "./types";
import Cfg, { ValueParse, ValueStringify } from "./Cfg";
/**
 * Configuration
 */
export class Configuration<Schematic> {
    public static Type = ConfigurationTypes;
    public static configs: ConfigurationSchema<any>[] = [];
    public static parse = Cfg.Parse;
    public static stringify = Cfg.Stringify;
    public options;
    public get v() { return this.value as Schematic };
    public get get() { return this.value as Schematic };
    public get value() {
        return this.options.value as Schematic;
    }
    public get __value() {
        return this.options.value;
    }
    public s(value: ConfigurationValue<Schematic>) { return this.set(value) };
    public set(value: ConfigurationValue<Schematic>, nosave = false) {
        if (!nosave && this.options.save) {
            const result = ValueStringify(value, this.options.type, this.options.checker);
            if (result) Cfg.env.save(this.options.env, result)
        }
        this.options.value = value;
        return this.options.value;
    }
    public update(value: string, nosave = false) {
        const result = ValueParse<Schematic>(value, this.options.type, this.options.checker);

        if (result !== undefined) {
            if (!nosave && this.options.save) {
                const results = ValueStringify(result, this.options.type, this.options.checker);
                if (results) Cfg.env.save(this.options.env, results)
            }
            this.options.value = result;
            console.log(this.options.value);
        }
    }
    constructor(options: ConfigurationContructor<Schematic>) {
        if (options.type === Configuration.Type.String) {
            this.options = {
                env: options.env,
                checker: options.checker,
                def: options.def as ConfigurationValue<Schematic>,
                type: Configuration.Type.String,
                save: options.save ? options.save : false,
                value: Cfg.Parse(options)
            };
        } else if (options.type === Configuration.Type.Boolean) {
            this.options = {
                env: options.env,
                checker: options.checker,
                def: options.def as ConfigurationValue<Schematic>,
                type: Configuration.Type.Boolean,
                save: options.save ? options.save : false,
                value: Cfg.Parse(options)
            };
        } else if (options.type === Configuration.Type.Array) {
            this.options = {
                env: options.env,
                checker: options.checker,
                def: options.def as ConfigurationValue<Schematic>,
                type: Configuration.Type.Array,
                save: options.save ? options.save : false,
                value: Cfg.Parse(options)
            };
        } else if (options.type === Configuration.Type.Number) {
            this.options = {
                env: options.env,
                checker: options.checker,
                def: options.def as ConfigurationValue<Schematic>,
                type: Configuration.Type.Number,
                save: options.save ? options.save : false,
                value: Cfg.Parse(options)
            };
        } else {
            this.options = {
                env: options.env,
                checker: options.checker,
                def: options.def as ConfigurationValue<Schematic>,
                type: Configuration.Type.Object,
                save: options.save ? options.save : false,
                value: Cfg.Parse(options)
            };
        }

        if (options.save) {
            if (Cfg.Stringify({ ...options, value: undefined } as any) === Cfg.Stringify({ ...options, value: Cfg.Parse(options) })) Cfg.env.save(options.env, Cfg.Stringify({ ...options, value: Cfg.Parse(options) }))
        }
        Configuration.configs.push(options as ConfigurationSchema<any>)
    }
}