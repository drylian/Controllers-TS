import chokidar from "chokidar";
import { Global } from "./Configurations";
import { Loggings } from "loggings";
import _, { isEqual } from "lodash";
import Cfg, { ValueStringify } from ".Configuration/Cfg";
import { ConfigurationTypes } from "./Configuration/types";
const core = new Loggings("Env", "blue", { register: false });
const configWatcher = chokidar.watch("./.env");

configWatcher.on("change", async () => {
    const envAll = Cfg.env.envall();
    for (const key in Global) {
        const config = Global[key as keyof typeof Global];
        if (!config.options) continue; // skip if no options
        const env = envAll[config.options.env];
        try {
            const current = ValueStringify(config.get as any, config.options.type, config.options.checker as any);
            if (env !== undefined && current !== env) {
                if (config.options.type === ConfigurationTypes.Array) {
                    if (!isEqual(config.__value, JSON.parse(env))) {
                        config.update(env, true);
                        core.log(`[${config.options.env}].green-b changed `)
                    }
                } else if (config.options.type === ConfigurationTypes.Boolean) {
                    config.update(env, true);
                    core.log(`[${config.options.env}].green-b changed of ${current} to ${env}`)
                } else {
                    config.update(env, true);
                    core.log(`[${config.options.env}].green-b changed of ${current} to ${env}`)
                }
            }
        } catch (e) {
            core.warn(`Error when trying to set [${config.options.env}].red-b, check if the env is correct`)
        }
    }
})