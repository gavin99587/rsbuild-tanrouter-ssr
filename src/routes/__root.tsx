import {createRootRouteWithContext, HeadContent, Link, Outlet, Scripts,} from '@tanstack/react-router'
import type {AppLoadContext} from '../appLoadContext'
import {defaultLocale} from "../modules/lingui/i18n";
import {useLingui} from "@lingui/react";

export const Route = createRootRouteWithContext<AppLoadContext>()({
    head: () => ({
        meta: [
            {
                title: 'TanStack Router SSR Basic File Based',
            },
            {
                charSet: 'UTF-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0',
            },
        ],
        scripts: [
            {
                src: 'https://unpkg.com/@tailwindcss/browser@4',
            },
            {
                src: '/static/js/vendors-node_modules_pnpm_process_0_11_10_node_modules_process_browser_js-node_modules_pnpm_r-fdb75d.js',
                defer: true
            },
            {
                src: '/static/js/lib-react.js',
                defer: true
            },
            {
                src: '/static/js/index.js',
                defer: true
            }
        ],
    }),
    component: RootComponent,
})

function RootComponent() {
    return (
        <RootDocument>
            <Outlet/>
        </RootDocument>
    )
}

function RootDocument({children}: { children: React.ReactNode }) {
    const {i18n} = useLingui();
    return (
        <html lang={i18n.locale ?? defaultLocale}>
        <head>
            <HeadContent/>
        </head>
        <body>
        <div className="p-2 flex gap-2 text-lg">
            <Link
                to="/"
                activeProps={{
                    className: 'font-bold',
                }}
                activeOptions={{exact: true}}
            >
                Home
            </Link>{' '}
            <Link
                to="/about"
                activeProps={{
                    className: 'font-bold',
                }}
                activeOptions={{exact: true}}
            >
                About
            </Link>{' '}
            <Link
                to="/posts"
                activeProps={{
                    className: 'font-bold',
                }}
            >
                Posts
            </Link>{' '}
            <Link
                to="/error"
                activeProps={{
                    className: 'font-bold',
                }}
            >
                Error
            </Link>
        </div>
        <hr/>
        {children}
        <Scripts/>
        </body>
        </html>
    )
}
