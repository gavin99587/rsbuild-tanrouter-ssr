import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack'
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";

export default defineConfig({
  environments: {
    // 配置 web 环境，用于浏览器端
    web: {
      source: {
        entry: {
          index: './src/entry-client',
        },
      },
      output: {
        target: 'web',
        manifest: true,
      }
    },
    // 配置 node 环境，用于 SSR
    node: {
      source: {
        entry: {
          index: './src/entry-server',
        },
      },
      output: {
        target: 'node',
        distPath: {
          root: "dist/server",
        },
      },
    },
  },
  plugins: [pluginReact(),pluginNodePolyfill()],
  tools: {
    htmlPlugin:false,
    rspack: {
      devtool:'eval-source-map',
      plugins: [
        TanStackRouterRspack({ target: 'react', autoCodeSplitting: true }),
      ],
    },
  },
})
