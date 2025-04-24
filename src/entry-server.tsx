import {pipeline} from 'node:stream/promises'
import {createRequestHandler, defaultRenderHandler,} from '@tanstack/react-start/server'
import {createRouter} from './router'
import {i18n} from '@lingui/core'
import {parse, serialize} from 'cookie-es'
import type express from 'express'
import {setupLocaleFromRequest} from "./modules/lingui/i18n.server";
import {defaultLocale, isLocaleValid} from "./modules/lingui/i18n";

export async function render({
                                 req, res, nick,
                             }: {
    nick: string
    req: express.Request
    res: express.Response
}) {
    console.log('req.originalUrl->', req.originalUrl);
    console.log('nick->', nick);

    // Convert the express request to a fetch request
    const url = new URL(req.originalUrl || req.url, 'https://localhost:3000').href

    const request = new Request(url, {
        method: req.method,
        headers: (() => {
            const headers = new Headers()
            for (const [key, value] of Object.entries(req.headers)) {
                if (value) {
                    headers.set(key, value as any)
                }
            }
            return headers
        })(),
    })

    let locale = null;
    //从cookie里获取语言
    const cookie = parse(request.headers.get('cookie') ?? '')
    if (cookie.locale && isLocaleValid(cookie.locale)) {
        locale = cookie.locale;
    } else {
        locale = defaultLocale;
    }
    console.log('headers.cookie', request.headers.get('cookie'))

    await setupLocaleFromRequest(locale);

    // Create a request handler
    const handler = createRequestHandler({
        request,
        createRouter: () => {
            const router = createRouter({i18n})

            // Update each router instance with the head info from vite
            router.update({
                context: {
                    ...router.options.context,
                    nick: nick,
                }
            })
            return router
        }
    })

    // Let's use the default stream handler to create the response
    const response = await handler(defaultRenderHandler)


    // console.log('response.status', response.status);

    // Convert the fetch response back to an express response
    res.set('Content-Type', 'text/html');
    res.statusMessage = response.statusText
    res.status(response.status)

    response.headers.forEach((value, name) => {
        res.setHeader(name, value)
    })

    // Stream the response body
    return pipeline(response.body as any, res)
}
