import fs from "fs";
import lodash from "lodash";

/**
 * Reads Json file
 * @param local path of Json
 * @returns 
 */
function json<T>(local: string): T {
	let existingData: string;
	try {
		if (fs.existsSync(local) && local.endsWith(".json")) {
			existingData = fs.readFileSync(local, "utf-8");
		} else if (!local.endsWith(".json")) {
			return {} as T;
		} else {
			return {} as T;
		}
		if (!existingData) return {} as T;
		const parsedData: T = JSON.parse(existingData);
		return parsedData;
	} catch (ex) {
		const err = ex as InstanceType<typeof Error>
		console.error("Erro ao analisar o JSON:", err.message);
		return {} as T;
	}
}

/**
 * 
 * @param local Json Path
 * @param data Object Data
 * @param force Force save(ignore read path and merge obj)
 * @returns 
 */
function jsonsv<Datatype>(local: string, data: Datatype, force = false): void {
	try {
		let existingData: Datatype;
		if (force) {
			fs.writeFileSync(local, JSON.stringify(data, null, 2), "utf-8");
			return;
		}
		if (fs.existsSync(local)) {
			const fileContent = fs.readFileSync(local, "utf-8");
			existingData = JSON.parse(fileContent);
		} else {
			existingData = {} as Datatype;
		}
		const mergedData = lodash.merge(existingData, data);
		const jsonData = JSON.stringify(mergedData, null, 2);
		fs.writeFileSync(local, jsonData, "utf-8");
	} catch (error) {
		console.error("Erro write file:" + local + " ,error :", error);
	}
}
export { json, jsonsv };
