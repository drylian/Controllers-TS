import chokidar from "chokidar";
import * as path from "path";
import * as lodash from "lodash";
import { json } from "./Json";
import I18alt from "./i18alt";
import { Console, LoggingsMessage } from "loggings";

function Core(type: string, ...args: LoggingsMessage[]) {
	return Console(type, "magenta", ...args);
}

const directoryToWatch = "./langs";
const watcher = chokidar.watch(directoryToWatch, {
    persistent: true,
    // eslint-disable-next-line no-useless-escape
    ignored: /(^|[\/\\])\../,
});
watcher.on("add", (filePath) => {
    if (path.extname(filePath) === ".json") {
        const locale = path.relative(directoryToWatch, filePath).replace(".json", "").replace(/[/\\]/g, ".");
        const data = lodash.set({}, locale.split("."), json(filePath));
        I18alt.core = lodash.merge(I18alt.core, data);
    }
});
watcher.on("change", (filePath) => {
    if (path.extname(filePath) === ".json") {
        const locale = path.relative(directoryToWatch, filePath).replace(".json", "").replace(/[/\\]/g, ".");
        const data = lodash.set({}, locale.split("."), json(filePath));
        const location = path
            .relative(directoryToWatch, filePath)
            .replace(".json", "")
            .replace(/[/\\]/g, " -> ");
        I18alt.core = lodash.merge(I18alt.core, data);
        Core("Lang", `[${location}].red modded.`);
    }
});
watcher.on("unlink", (filePath) => {
    if (path.extname(filePath) === ".json") {
        const locale = path.relative(directoryToWatch, filePath).replace(".json", "").replace(/[/\\]/g, ".");
        const data = lodash.set({}, locale.split("."), json(filePath));
        const location = path
            .relative(directoryToWatch, filePath)
            .replace(".json", "")
            .replace(/[/\\]/g, " -> ");
        I18alt.core = lodash.merge(I18alt.core, data);
        Core("Lang", `[${location}].red deleted.`);
    }
});
