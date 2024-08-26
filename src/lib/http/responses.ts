export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD" | "CONNECT" | "TRACE"

type successResponse<T> = {
  ok: true
  data: T
}
type errorResponse<T> = {
  ok: false
  error: T
}

const success = <T>(payload: T) => {
  const response: successResponse<T> = {
    ok: true,
    data: payload,
  }
  return response
}

const error = <T>(payload: T) => {
  const errorResponse: errorResponse<T> = {
    ok: false,
    error: {
      ...payload,
    },
  }
  return errorResponse
}

export function OK<T>(payload?: T) {
  return Response.json(success(payload), { status: 200 })
}

//TODO: need to add headers for the response to locate the created resourceb y id
export function Created<T>(payload: T, location?: string) {
  const headers = location ? { location: location } : undefined
  return Response.json(success(payload), { status: 201, headers })
}

export function Conflict<T>(payload: T) {
  return Response.json(error(payload), { status: 409 })
}

export function ServerError<T>(payload: T) {
  return Response.json(error(payload), { status: 500 })
}

export function NoContent() {
  return new Response(null, {
    status: 204,
  })
}

export function BadRequest<T>(payload: T) {
  return Response.json(error(payload), { status: 400 })
}

export function Unauthorized<T>(payload?: T) {
  return Response.json(error(payload), { status: 401 })
}

export function NotFound<T>(payload: T) {
  return Response.json(error(payload), { status: 404 })
}
