import type {I18n} from '@lingui/core'
import {I18nProvider} from '@lingui/react'
import {createRouter as createReactRouter} from '@tanstack/react-router'
import type {PropsWithChildren} from 'react'

import {routeTree} from './routeTree.gen'

export function createRouter({i18n}: { i18n: I18n }) {
    return createReactRouter({
        routeTree,
        context: {
            nick: '',
        },
        // basepath:i18n.locale || 'en',
        // On the server, dehydrate the loader client so the router
        // can serialize it and send it to the client for us
        dehydrate: () => {
            console.log('createRouter,脱水');
            const data = {id: '1', name: '2'}
            return {
                queryClientState: JSON.stringify(data),
            };
        },
        // On the client, hydrate the loader client with the data
        // we dehydrated on the server
        hydrate: (dehydrated) => {
            console.log('createRouter,注水', dehydrated);
            return JSON.parse(dehydrated.queryClientState)
            // hydrate(queryClient, dehydrated.queryClientState)
        },
        Wrap: ({children}: PropsWithChildren) => {
            return <I18nProvider i18n={i18n}>{children}</I18nProvider>
        },
        defaultPreload: 'intent',
        scrollRestoration: true
    })
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}
