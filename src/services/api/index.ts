import ky from 'ky'

export enum Method {
  GET = 'get',
  POST = 'post',
  UPDATE = 'update',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

export async function KY<T>(method: Method, url: string, data?: any): Promise<T> {
  try {
    const options = data ? { json: data } : undefined

    switch (method) {
      case Method.GET:
        return await ky.get(url).json()
      case Method.POST:
        return await ky.post(url, options).json()
      case Method.PUT:
        return await ky.put(url, options).json()
      case Method.PATCH:
        return await ky.patch(url, options).json()
      case Method.DELETE:
        return await ky.delete(url, options).json()
      default:
        throw new Error(`Método HTTP no soportado: ${method}`)
    }
  } catch (error) {
    console.error('Error en la petición:', error)
    throw error // * We throw the error to be able to handle it in the component
  }
}


export async function CheckFollowersAndSubcriptions<T>(platform: string, userId: string) {
  try {
    const response = await KY<T>(Method.POST, '/api/v1/third-party-api', { platform, action: 'followers', userId })
    return response
  } catch (error) {
    console.error('Error retrieving social media data:', error);
  }
}


/* 

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
*/