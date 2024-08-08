import ky from 'ky'

export enum Method {
  GET = 'get',
  POST = 'post',
  UPDATE = 'update',
  PATCH = 'patch',
  DELETE = 'delete',
}

export async function KY(method: Method, url: string, data?: any) {
  try {
    if (method === Method.GET) {
      const response = await (ky as any)[method](url).json()
      return response
    } else if (method === Method.POST) {
      const response = await (ky as any)[method](url, data)
      return response
    }
    return null
  } catch (error) {
    console.log(error);
    return error
  }

}