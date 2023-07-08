interface HttpResponse {
  body: any
  statusCode: number
}

interface HttpRequest {
  body?: any
}

export type { HttpRequest, HttpResponse }
