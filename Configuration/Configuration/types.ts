import Env from "./Env";
/**
 * Types of Configuration
 */
export enum ConfigurationTypes {
    String = "_string",
    Number = "_number",
    Boolean = "_boolean",
    Array = "_array",
    Object = "_object",
}

interface ConfigurationSchemaBase<Schematic> {
    /**
     * Type of Configuration, string, boolean and anothers;
     */
    type: ConfigurationTypes;
    /**
     * Env title, used for read source value
     */
    env: string;
    /**
     * Save Default value in env case value not found, this default is false
     */
    save?: boolean;
    /**
     * 
     * @param value Current Value (in env)
     * @param def Default Value
     * @returns Current Value or Default Value
     */
    checker?: (value: ConfigurationValue<Schematic>, def: ConfigurationValue<Schematic>, env:typeof Env) => ConfigurationValue<Schematic>;
}

export type ConfigurationValue<Schematic> = (Schematic extends string ? Schematic : string) | (Schematic extends number ? Schematic : number) | (Schematic extends boolean ? Schematic : boolean) | (Schematic extends object ? Schematic : object) | (Schematic extends any[] ? Schematic : any[]);
export type ConfigurationContructor<Schematic> = ConfigurationSchema<Schematic> & {
    /**
     * Save Default value in env case value not found, this default is false
     */
    save?:boolean
};

export type ConfigurationSchema<Schematic> = ConfigurationSchemaBase<Schematic> & (({
    /**
     * Defines this configuration in String type.
     * def and value ever return string
     */
    type: ConfigurationTypes.String,
    /**
     * Default Value, is callback case env value not found
     * or case checker not approved
     * Current default is string value
     */
    def: Schematic extends string ? Schematic : string;
}) | ({
    /**
     * Defines this configuration in Number type.
     * def and value ever return number
     */
    type: ConfigurationTypes.Number,
    /**
     * Default Value, is callback case env value not found
     * or case checker not approved
     * Current default is number value
     */
    def: Schematic extends number ? Schematic : number;
}) | ({
    /**
     * Defines this configuration in Boolean type.
     * def and value ever return boolean
     */
    type: ConfigurationTypes.Boolean,
    /**
     * Default Value, is callback case env value not found
     * or case checker not approved
     * Current default is boolean value
     */
    def: Schematic extends boolean ? Schematic : boolean;
}) | ({
    /**
     * Defines this configuration in Object type.
     * def and value ever return object
     */
    type: ConfigurationTypes.Object,
    /**
     * Default Value, is callback case env value not found
     * or case checker not approved
     * Current default is object value
     */
    def: Schematic extends object ? Schematic : object;
}) | ({
    /**
     * Defines this configuration in Array type.
     * def and value ever return array 
     */
    type: ConfigurationTypes.Array,
    /**
     * Default Value, is callback case env value not found
     * or case checker not approved
     * Current default is Array value
     */
    def: Schematic extends Array<any> ? Schematic : Array<Schematic>;
}))