import fs from "node:fs";
import express from "express";
import {createRsbuild, loadConfig, logger} from "@rsbuild/core";


let manifest;

const serverRender = (serverAPI) => async (req, res) => {
    const indexModule = await serverAPI.environments.node.loadBundle("index");

    indexModule.render({
        req, res, nick: 'bery',
    });
};

export async function startDevServer() {
    const {content} = await loadConfig({});

    // Init Rsbuild
    const rsbuild = await createRsbuild({
        rsbuildConfig: content,
    });

    console.log('content', JSON.stringify(content));

    rsbuild.onDevCompileDone(async () => {
        try {
            const _manifest = await fs.promises.readFile("./dist/manifest.json", "utf-8");
            manifest = JSON.parse(_manifest);
        } catch (err) {
            logger.error("Failed to read manifest file:", err);
        }
    });

    const app = express();

    // Create Rsbuild DevServer instance
    const rsbuildServer = await rsbuild.createDevServer();

    const serverRenderMiddleware = serverRender(rsbuildServer);

    app.get(/^(?!\/rsbuild-hmr|\/static|.*hot-update).*$/, async (req, res, next) => {
        try {
            await serverRenderMiddleware(req, res, next);
        } catch (err) {
            logger.error("SSR render error, downgrade to CSR...\n", err);
            next();
        }
    });

    // Apply Rsbuild’s built-in middlewares
    app.use(rsbuildServer.middlewares);

    const httpServer = app.listen(rsbuildServer.port, () => {
        // Notify Rsbuild that the custom server has started
        rsbuildServer.afterListen();

        console.log(`Server started at http://localhost:${rsbuildServer.port}`);
    });

    rsbuildServer.connectWebSocket({server: httpServer});

    return {
        close: async () => {
            await rsbuildServer.close();
            httpServer.close();
        },
    };
}

startDevServer();
