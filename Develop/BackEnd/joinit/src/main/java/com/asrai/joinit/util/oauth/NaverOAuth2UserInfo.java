package com.asrai.joinit.util.oauth;

import java.sql.Timestamp;
import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo {

    /**
     * {
     *   "resultcode": "00",
     *   "message": "success",
     *   "response": {
     *     "email": "openapi@naver.com",
     *     "nickname": "OpenAPI",
     *     "profile_image": "https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif",
     *     "age": "40-49",
     *     "gender": "F",
     *     "id": "32742776",
     *     "name": "오픈 API",
     *     "birthday": "10-01"
     *   }
     * }
     */

    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }
        return (String) response.get("id");
    }

    @Override
    public String getName() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }
        return (String) response.get("name");
    }

    @Override
    public String getEmail() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }
        return (String) response.get("email");
    }

//    @Override
//    public String getGender() {
//        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
//
//        if (response == null) {
//            return null;
//        }
//
//        String gender = (String) response.get("gender");
//
//        if (gender.equals("F")) {
//            return "W";
//        }
//        return (String) response.get("gender");
//    }

//    @Override
//    public String getBirth() {
//        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
//
//        if (response == null) {
//            return null;
//        }
//        return (String) response.get("birthday");
//    }

    @Override
    public String getPhone() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }

        String phone = (String) response.get("mobile");

        phone = phone.replace("-", "");

        return phone;
    }
}
