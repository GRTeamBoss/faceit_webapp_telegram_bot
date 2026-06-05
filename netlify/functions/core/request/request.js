export default class Request {

  constructor() {}

  async get(path, endpoint, params = {}, header = {}) {
    const paramsQuery = new URLSearchParams(params).toString()
    const res = await fetch(`${path}${endpoint}${paramsQuery ? `?${paramsQuery}` : ""}`, {
      headers: header
    })
    if (!res.ok) {return -1}
    return await res.json()
  }
}