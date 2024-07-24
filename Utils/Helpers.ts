import path from "path";

/**
 * Expected Typescript locale
 */
const TYPESCRIPT_DIRECTORY = "./app";

/**
 * Expected Javascript locale
 */
const JAVASCRIPT_DIRECTORY = "./dist";

/**
 * Expected Bundle file
 */
const BUNDLE_FILE = "service.js";

/**
 * Check current Mode in panel "Bundle" | "Typescript" | "Javascript"
 */
export const CurrentMode = __filename.endsWith(BUNDLE_FILE) ? "Bundle" : path.join(__filename).endsWith(".ts") ? "Typescript" : "Javascript";

/**
 * Return RootPATH of panel
 */
export const RootPATH = CurrentMode === "Bundle" ? "./" : CurrentMode === "Javascript" ? JAVASCRIPT_DIRECTORY : TYPESCRIPT_DIRECTORY;

/**
 * Return ResourcesPATH of panel
 */
export const ResourcesPATH = CurrentMode === "Bundle" ? RootPATH + "/locals" : RootPATH + "/Resources";

/**
 * Return StoragePATH of panel
 */
export const StoragePATH = "./storage";

/**
 * Return AbsolutePATH of panel, but ignores pkg_mode locale
 */
export const AbsolutePATH = process.cwd();
