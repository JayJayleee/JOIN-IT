package com.asrai.joinit.util.oauth;

import java.sql.Timestamp;
import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    /**
     * {
     *    "sub": "식별값",
     *    "name": "name",
     *    "given_name": "given_name",
     *    "picture": "https//lh3.googleusercontent.com/~~",
     *    "email": "email",
     *    "email_verified": true,
     *    "locale": "ko"
     * }
     */

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

//    @Override
//    public String getGender() {
//        return null;
//    }
//
//    @Override
//    public Timestamp getBirth() {
//        return null;
//    }

    @Override
    public String getPhone() {
        return null;
    } // 필수값인데, 구글에서는 넘겨주지 않는다. 문제가 될듯
}
