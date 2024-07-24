/**
 * Exemple of Route in express, for uses i18next
 */
import I18alt from "./i18alt";

const app = express();

app.get("/languages", (req, res) => {
    const { namespace, lang, native, hash } = req.query;
    const data = I18alt.live.GNR(namespace as string, native !== undefined, lang as string);
    res.header({
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        ETag: "hashtag",
        i18hash: hash || "know",
    });
    res.status(200).json(data);
})
