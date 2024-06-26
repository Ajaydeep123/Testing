import {setupServer} from 'msw/node'
import { http } from 'msw'

export const mockServer = setupServer()

export function addMockApiRouteHandler(type, path, cb) {
    mockServer.use(
      http[type](new URL(path, import.meta.env.VITE_API_URL).href, cb)
    )
  }
  