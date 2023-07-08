interface httpResponse {
  body: any
  statusCode: number
}

interface httpRequest {
  body?: any
}

export type { httpRequest, httpResponse }
