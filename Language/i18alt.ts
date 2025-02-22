import * as _ from "lodash";
import { Console, LoggingsMessage } from "loggings";
import { CurrentMode, ResourcesPATH, RootPATH } from "./Helpers";
export const LangsPATH = CurrentMode === "Typescript" ? (RootPATH + "/Languages") : ResourcesPATH;

const LANGUAGE = "pt-br";
const core = (...message: LoggingsMessage[]) => Console("Warn", "yellow", ...message);
/**
 * Languages of Core
 */
export default class I18alt {
	private current: string;
	public static core: Record<string, object> = {}
	public static get live() { return new I18alt() }
	constructor(lang?: string) { this.current = lang ?? LANGUAGE; }

	public get mt() { return this.meta }
	public get meta() {
		const langs: object[] = []
		for (const lang in I18alt.core) {
			const resources = I18alt.core[lang] as Record<string, object>
			if (resources['meta']) langs.push({ ...(resources['meta']), lang })
		}
		return langs
	}

	public lmt = (lang: string) => this.LangMeta(lang)
	public LangMeta(lang: string) {
		const resources = I18alt.core[lang] as { meta: object }
		if (resources?.meta) return resources.meta
		return {}
	}

	public lr = (lang?: string) => this.langResources(lang)
	public langResources(lang?: string): object {
		if (lang) return I18alt.core[lang];
		return I18alt.core;
	}

	public goc = (key: string, lang?: string) => this.GetofCore(key, lang);
	public GetofCore(key: string, llang?: string) {
		const keys = key.replaceAll(":", ".").split(".")
		const langs = [];
		if (!llang) langs.push(this.current);
		if (typeof llang === "string") langs.push(llang);
		let resources = {};
		for (const lang of langs) {
			let translations = _.get(I18alt.core[lang], keys.join("."));
			if (translations) resources = translations;
		}
		return resources;
	}

	public t = (key: string, params: Record<string, string | number> = {}, checker = true) => this.translate(key, params, checker);
	public translate(key: string, params: Record<string, string | number> = {}, checker = true): string {
		if (!params.lang) params.lang = this.current;
		const directory = `LangDIR:${key.replaceAll(":", "/").split(".")[0]}/${key.split(".")[1]}.json`;
		const keys = key.replaceAll(":", ".").split(".")
		if (I18alt.core[params.lang]) {
			let translation = _.get(I18alt.core[params.lang], keys.join("."));
			if (translation === keys.join(".")) {
				/**
				 * Not found translation in current lang
				 */
				translation = keys.pop();
				core(`KEY: [${keys.pop()}].purple-b | [${directory}].blue | not found in lang ["${params.lang}"].blue`);
			}
			if (typeof translation === "string") {
				for (const param in params) translation = translation.replaceAll(`{${param}}`, this.t(String(params[param]), {}, false)); // default
				for (const param in params) translation = translation.replaceAll(`{{${param}}}`, this.t(String(params[param]), {}, false)); // i18next
				return translation
			}
		} else if (!I18alt.core[params.lang]) {
			if(!checker) return key;
			core(`LANG: [${params.lang}].red not found , changing of default lang "${LANGUAGE}"].green.`);
			this.current = LANGUAGE;
			return this.t(key, params);
		}
		if(!checker) return key;
		core(`KEY: [${keys.pop()}].purple-b | [${directory}].blue | not found in lang ["${params.lang}"].blue`);
		return key;
	}

	public get lg() { return this.language }
	public get language() { return this.current };

	public get lgs() { return this.languages; }
	public get languages() {
		const langs = []
		for (const lang in I18alt.core) {
			langs.push(lang)
		}
		return langs;
	}

	public sl = (lang?: string) => this.setLanguage(lang);
	public setLanguage(lang?: string) {
		if (lang && I18alt.core[lang]) {
			this.current = lang
			return true
		}
		core(`LANG: ["${lang}"].blue not found, not changed current lang.`);
		return false;
	}

	public GNR = (namespace: string, lang?: string) => this.getNamespaceResource(namespace, lang);
	public getNamespaceResource(namespace: string, lang?: string): object {
		if (!lang) lang = this.current;
		const langs = lang.split(" ");
		const namespaces = namespace.split(" ");
		const response: { [locale: string]: object } = {};
		langs.forEach((lang) => {
			response[lang] = {};
			namespaces.forEach((namespace) => {
				let result;
				result = this.goc(namespace, lang);
				if (result !== undefined) {
					_.set(response[lang], namespace, result);
				} else {
					_.set(response[lang], namespace, []);
				}
			});
		});
		return response;
	}
}
