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


export async function CheckTokens<T>(email: string) {
  try {
    const response = await KY<T>(Method.POST, '/api/v1/check-tokens', { email })
    return response
  } catch (error) {
    console.error('Error retrieving tokens:', error)
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


// export async function CheckLocalToken({ tokens, setToken, checkTokens }: TokenStore, userId: string) {
//   try {
//     const localToken = localStorage.getItem("twitch_access_token");
//     const expiresAt = localStorage.getItem("twitch_expires_at");

//     if (localToken && expiresAt && new Date().getTime() < Number(expiresAt)) {
//       setToken("twitch", localToken, Number(expiresAt));
//       return;
//     }
//     // Si no hay token en localStorage o está vencido, consultar a la BD
//     // const res = await fetch(`/api/twitch/token?userId=${userId}`);
//     const url = `/api/v1/tokens?userId=${encodeURIComponent(userId)}`
//     //console.log('URL generada:', url);

//     const res = await KY<{ isValid: boolean; accessToken: string; expiresAt: string }>(
//       Method.GET,
//       url
//     );

//     const data = res

//     if (data.isValid) {

//       console.log('Token is valid:', data);
//       localStorage.setItem("twitch_access_token", data.accessToken);
//       localStorage.setItem("twitch_expires_at", String(new Date(data.expiresAt).getTime()));
//       setToken("twitch", data.accessToken, new Date(data.expiresAt).getTime());
//     }
//   } catch (error) {
//     console.error('Error retrieving local token:', error);

//   }

// };