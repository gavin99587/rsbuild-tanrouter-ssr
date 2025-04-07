import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import type { RouterContext } from '../routerContext'

export const Route = createRootRouteWithContext<RouterContext>()({
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
        src: '/static/js/vendors-node_modules_pnpm_process_0_11_10_node_modules_process_browser_js-node_modules_pnpm_r-c79ac2.js',
        defer:true
      },
      {
        src: '/static/js/lib-react.js',
        defer:true
      },
      {
        src: '/static/js/index.js',
        defer:true
      }
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
              to="/about"
              activeProps={{
                className: 'font-bold',
              }}
              activeOptions={{ exact: true }}
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
        <hr />
        <Outlet /> {/* Start rendering router matches */}
        <Scripts />
      </body>
    </html>
  )
}
