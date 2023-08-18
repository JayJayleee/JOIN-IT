import axios from "axios";


/** accessToken이 만료되었거나 값이 없고, refrechToken이 있을 때 accessToken을 재발급 받는 함수
 * 1. 인자로는 refreshToken을 받음
 * 2. refreshToken : string 타입만 보낼 수 있음
 * 3. 함수 내에서 accessToken을 재발급받도록 주소와 header 설정 후 axios 요청을 보냄
 * 4. 성공할 경우 accessToken을 
 */
export const GetAccessToken = async (refreshToken: string) => {
  const headers = {
    Authorization : `Bearer ${refreshToken}`
  }
  try {
    const Result = await axios.get(`/api/refresh`, {headers})
    sessionStorage.setItem('accessToken', Result.data.accessToken)
    localStorage.setItem('userPk', Result.data.userPk)
    return sessionStorage.getItem('accessToken')
  } catch(err) {
    return ''
  }
}



/** 로그인 하기 위해서 POST 요청을 보내는 함수(post without login)
 * 1. 인자로는 주소와 body, header를 받음
 * 2. 주소 : string 타입만 보낼 수 있으며 `/api/` 까지 기본 입력이 되있으므로 뒷부분만 보내면 된다.
 * 3. body: object 타입만 보낼 수 있음
 * 4. header : object 타입만 보낼 수 있다
 * 5. 결과 값으로 얻은 것을 구분없이 전부 돌려준다.(성공적으로 받은 결과 / axios에서 실패한 결과)
 */
export const PostLoginFtn = async (url: string, body: object, headers: object,) => {

  try {
    const Result = await axios.post(`/api/${url}`, body, { headers });
    return Result
  } catch (err) {
    return err
  }
}



/** 로그인하지 않은 상태에서 POST 요청을 보내는 함수(post without login)
 * 1. 인자로는 주소와 body, header를 받음
 * 2. 주소 : string 타입만 보낼 수 있으며 `/api/` 까지 기본 입력이 되있으므로 뒷부분만 보내면 된다.
 * 3. body: object 타입만 보낼 수 있음
 * 4. header : object 타입만 보낼 수 있다
 * 5. 결과 값으로 얻은 것을 구분없이 전부 돌려준다.(성공적으로 받은 결과 / axios에서 실패한 결과)
 */
export const PostWOL = async (url: string, body: object, headers: object) => {
    
  try {
    const Result = await axios.post(`/api/${url}`, {body}, {headers})
    return Result
  } catch(err) {
    return err
  }
}



/** 로그인하지 않은 상태에서 PUT 요청을 보내는 함수(put without login)
 * 1. 인자로는 주소와 body, header를 받음
 * 2. 주소 : string 타입만 보낼 수 있으며 `/api/` 까지 기본 입력이 되있으므로 뒷부분만 보내면 된다.
 * 3. body: object 타입만 보낼 수 있음
 * 4. header : object 타입만 보낼 수 있다
 * 5. 결과 값으로 얻은 것을 구분없이 전부 돌려준다.(성공적으로 받은 결과 / axios에서 실패한 결과)
 */
export const PutWOL = async (url: string, body: object, headers: object) => {
  try {
    const Result = await axios.put(`/api/${url}`, {body}, {headers})
    return Result
  } catch(err) {
    return err
  }
}



/** 로그인한 상태에서 get 요청을 보내는 함수(get with login)
 * 1. 인자로는 주소와 headers, accessToken, refreshToken를 받음
 * 2. 주소 : string 타입만 보낼 수 있으며 `/api/` 까지 기본 입력이 되있으므로 뒷부분만 보내면 된다.
 * 3. header : object 타입만 보낼 수 있으며, 'Authorization'의 key/value가 포함되어야 함
 * 4. accessToken : string 타입만 보낼 수 있으며, 이를 통해 headers 안에 authorization 값을 설정한다.
 * 5. refreshToken : string 타입만 보낼 수 있으며, 이를 통해 accessToken이 만료되었을 때 재 발급을 받는다.
 * 6. err에서 status가 401이면 accessToken을 재 발급받는 함수를 실행한다.
 * 7. 만약 전달받은 accessToken과 refreshToken이 빈 문자열이거나, accessToken을 재 발급받은 결과가 빈 문자열이면 숫자 1을 반환한다.
 */
export const GetWL = async (url: string, headers: object, accessToken: string, refreshToken: string) => {
  if (accessToken === '' && refreshToken === '') {
    return 1
  } else {
    headers = {...headers, Authorization: `Bearer ${accessToken}`}
    try {
      const Result = await axios.get(`/api/${url}`, {headers})
      return Result
    } catch(err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 && refreshToken !== '') {
          const newAccessToken = await GetAccessToken(refreshToken)
          if (newAccessToken === '') {
            return 1
          } else {
            headers = {...headers, Authorization: `Bearer ${newAccessToken}`}
            try {
              const NewResult = await axios.get(`/api/${url}`, {headers})
              return NewResult
            } catch(err) {
              return err
            }
          }
        } else {
          return err
        }
      } else {
        return err
      }
    }
  }
}



/** 로그인한 상태에서 post 요청을 보내는 함수(post with login)
 * 1. 인자로는 주소와 body, headers, accessToken, refreshToken를 받음
 * 2. 주소 : string 타입만 보낼 수 있으며 `/api/` 까지 기본 입력이 되있으므로 뒷부분만 보내면 된다.
 * 3. body : object 타입만 보낼 수 있다.
 * 4. header : object 타입만 보낼 수 있음
 * 5. accessToken : string 타입만 보낼 수 있으며, 이를 통해 headers 안에 authorization 값을 설정한다.
 * 6. refreshToken : string 타입만 보낼 수 있으며, 이를 통해 accessToken이 만료되었을 때 재 발급을 받는다.
 * 7. err에서 status가 401이면 accessToken을 재 발급받는 함수를 실행한다.
 * 8. 만약 전달받은 accessToken과 refreshToken이 빈 문자열이거나, accessToken을 재 발급받은 결과가 빈 문자열이면 숫자 1을 반환한다.
 */
export const PostWL = async (url: string, body: object, headers: object, accessToken: string, refreshToken: string) => {
  if (accessToken === '' && refreshToken === '') {
    return 1
  } else {
    headers = {...headers, Authorization: `Bearer ${accessToken}`}
    try {
      const Result = await axios.post(`/api/${url}`, {body}, {headers})
      return Result
    } catch(err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 && refreshToken !== '') {
          const newAccessToken = await GetAccessToken(refreshToken)
          if (newAccessToken === '') {
            return 1
          } else {
            headers = {...headers, Authorization: `Bearer ${newAccessToken}`}
            try {
              const NewResult = await axios.post(`/api/${url}`, {body}, {headers})
              return NewResult
            } catch(err) {
              return err
            }
          }
        } else {
          return err
        }
      } else {
        return err
      }
    }
  }
}



/** 로그인한 상태에서 put 요청을 보내는 함수(put with login)
 * 1. 인자로는 주소와 body, headers, accessToken, refreshToken를 받음
 * 2. 주소 : string 타입만 보낼 수 있으며 `/api/` 까지 기본 입력이 되있으므로 뒷부분만 보내면 된다.
 * 3. body : object 타입만 보낼 수 있다.
 * 4. header : object 타입만 보낼 수 있음
 * 5. accessToken : string 타입만 보낼 수 있으며, 이를 통해 headers 안에 authorization 값을 설정한다.
 * 6. refreshToken : string 타입만 보낼 수 있으며, 이를 통해 accessToken이 만료되었을 때 재 발급을 받는다.
 * 7. err에서 status가 401이면 accessToken을 재 발급받는 함수를 실행한다.
 * 8. 만약 전달받은 accessToken과 refreshToken이 빈 문자열이거나, accessToken을 재 발급받은 결과가 빈 문자열이면 숫자 1을 반환한다.
 */
export const PutWL = async (url: string, body: object, headers: object, accessToken: string, refreshToken: string) => {
  if (accessToken === '' && refreshToken === '') {
    return 1
  } else {
    headers = {...headers, Authorization: `Bearer ${accessToken}`}
    try {
      const Result = await axios.put(`/api/${url}`, {body}, {headers})
      return Result
    } catch(err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 && refreshToken !== '') {
          const newAccessToken = await GetAccessToken(refreshToken)
          if (newAccessToken === '') {
            return 1
          } else {
            headers = {...headers, Authorization: `Bearer ${newAccessToken}`}
            try {
              const NewResult = await axios.put(`/api/${url}`, {body}, {headers})
              return NewResult
            } catch(err) {
              return err
            }
          }
        } else {
          return err
        }
      } else {
        return err
      }
    }
  }
}



/** 로그인한 상태에서 delete 요청을 보내는 함수(delete with login)
 * 1. 인자로는 주소와 headers, accessToken, refreshToken를 받음
 * 2. 주소 : string 타입만 보낼 수 있으며 `/api/` 까지 기본 입력이 되있으므로 뒷부분만 보내면 된다.
 * 3. body : object 타입만 보낼 수 있다.
 * 4. header : object 타입만 보낼 수 있음
 * 5. accessToken : string 타입만 보낼 수 있으며, 이를 통해 headers 안에 authorization 값을 설정한다.
 * 6. refreshToken : string 타입만 보낼 수 있으며, 이를 통해 accessToken이 만료되었을 때 재 발급을 받는다.
 * 7. err에서 status가 401이면 accessToken을 재 발급받는 함수를 실행한다.
 * 8. 만약 전달받은 accessToken과 refreshToken이 빈 문자열이거나, accessToken을 재 발급받은 결과가 빈 문자열이면 숫자 1을 반환한다.
 */
export const DeleteWL = async (url: string, headers: object, accessToken: string, refreshToken: string) => {
  if (accessToken === '' && refreshToken === '') {
    return 1
  } else {
    headers = {...headers, Authorization: `Bearer ${accessToken}`}
    try {
      const Result = await axios.delete(`/api/${url}`, {headers})
      return Result
    } catch(err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 && refreshToken !== '') {
          const newAccessToken = await GetAccessToken(refreshToken)
          if (newAccessToken === '') {
            return 1
          } else {
            headers = {...headers, Authorization: `Bearer ${newAccessToken}`}
            try {
              const NewResult = await axios.delete(`/api/${url}`, {headers})
              return NewResult
            } catch(err) {
              return err
            }
          }
        } else {
          return err
        }
      } else {
        return err
      }
    }
  }
}