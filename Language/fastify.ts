/**
 * Exemple of Route in express, for uses i18next
 */
import I18alt from "./i18alt";

const app = Fastify();

app.get("/languages", (req, reply) => {
    const { namespace, lang, hash } = req.query as any;
    const data = I18alt.live.GNR(namespace as string, lang as string);
    reply.header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    reply.header('ETag', "hashtag");
    reply.header('i18hash', hash || 'know');
    reply.send(data);
})
