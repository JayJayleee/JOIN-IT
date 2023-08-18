import { Cookies } from "react-cookie";

const cookies = new Cookies();

/** refresh Token을 저장하기 위한 함수
 * 1. cookie 안에 set 메소드를 활용해 'refreshToken' 이라는 이름 안에 인자로 들어온 값을 저장
 * 2. 이 때 
 * 
 * path : 쿠키의 값을 저장하는 서버 경로로, '/'일 경우 모든 페이지에서 쿠키에 접근할 수 있도록 설정할 수 있다.
 * 
 * secure : true인 경우에는 https로 통신할때만 쿠키가 저장된다.
 * 
 * httponly : document.cookie와 같은 자바스크립트 코드로 접근할 수 없도록 일종의 private 처리를 해준다.
 * 
 * expires : Date 객체를 받으며 쿠키 만료 날짜를 지정할 수 있다. 
 * 
 * maxAge : 초 단위로 쿠키의 상대적인 max Age를 설정할 수 있다.
 * 
 * sameSite : lax 설정은 클라이언트에서 링크를 클릭하는 등 작업을 통해서는 전달이 가능하지만 AJAX 요청을 통해서 쿠키를 전달하는 것은 불가능하기 때문
 * 
 * -> SameSite 옵션을 'None'으로 해야만 CORS 가 가능 ->  SameSite 옵션이 'None' 인 경우, Secure 옵션은 true 여야만한다. 
 */
export const setCookie = (refreshToken: string) => {
  return cookies.set('refreshToken', refreshToken, {
    path: '/',
    secure: true,
    sameSite: 'none'
  });
}

export const getCookie = () => {
  return cookies.get('refreshToken');
}

export const removeCookie = () => {
  return cookies.remove('refreshToken');
}