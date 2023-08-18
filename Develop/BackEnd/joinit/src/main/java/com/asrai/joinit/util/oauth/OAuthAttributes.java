package com.asrai.joinit.util.oauth;

import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.domain.User;
import com.asrai.joinit.domain.UserSequence;
import com.asrai.joinit.user.Role;
import com.asrai.joinit.user.SocialType;
import com.asrai.joinit.user.UserRepository;
import com.asrai.joinit.user.UserSequenceRepository;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 각 소셜에서 받아오는 데이터가 다르므로
 * 소셜별로 데이터를 받는 데이터를 분기 처리하는 DTO 클래스
 */
@Getter
@Builder
public class OAuthAttributes {

    private String nameAttributeKey; // OAuth2 로그인 진행 시 키가 되는 필드 값, PK와 같은 의미
    private OAuth2UserInfo oauth2UserInfo; // 소셜 타입별 로그인 유저 정보(닉네임, 이메일, 프로필 사진 등등)

    @Builder
    public OAuthAttributes(String nameAttributeKey, OAuth2UserInfo oauth2UserInfo) {
        this.nameAttributeKey = nameAttributeKey;
        this.oauth2UserInfo = oauth2UserInfo;
    }

    /**
     * SocialType에 맞는 메소드 호출하여 OAuthAttributes 객체 반환
     * 파라미터 : userNameAttributeName -> OAuth2 로그인 시 키(PK)가 되는 값 / attributes : OAuth 서비스의 유저 정보들
     * 소셜별 of 메소드(ofGoogle, ofKaKao, ofNaver)들은 각각 소셜 로그인 API에서 제공하는
     * 회원의 식별값(id), attributes, nameAttributeKey를 저장 후 build
     */
    public static OAuthAttributes of(SocialType socialType,
        String userNameAttributeName, Map<String, Object> attributes) {

        if (socialType == SocialType.NAVER) {
            return ofNaver(userNameAttributeName, attributes);
        }
        if (socialType == SocialType.KAKAO) {
            return ofKakao(userNameAttributeName, attributes);
        }
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
            .nameAttributeKey(userNameAttributeName)
            .oauth2UserInfo(new KakaoOAuth2UserInfo(attributes))
            .build();
    }

    public static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
            .nameAttributeKey(userNameAttributeName)
            .oauth2UserInfo(new GoogleOAuth2UserInfo(attributes))
            .build();
    }

    public static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
            .nameAttributeKey(userNameAttributeName)
            .oauth2UserInfo(new NaverOAuth2UserInfo(attributes))
            .build();
    }

    /**
     * of메소드로 OAuthAttributes 객체가 생성되어, 유저 정보들이 담긴 OAuth2UserInfo가 소셜 타입별로 주입된 상태
     * OAuth2UserInfo에서 socialId(식별값), nickname, imageUrl을 가져와서 build
     * email에는 UUID로 중복 없는 랜덤 값 생성
     * role은 GUEST로 설정
     */
    public Patient toEntity(String userId, SocialType socialType, OAuth2UserInfo oauth2UserInfo) {

        return Patient.builder()
            .userId(userId)
            .name(oauth2UserInfo.getName())
            .loginId(oauth2UserInfo.getId())
            .password(UUID.randomUUID().toString().substring(0, 8))
            .phone(oauth2UserInfo.getPhone())
            .email(oauth2UserInfo.getEmail())
            .userTypeCode("M01")
            .smsAgree("N")
            .emailAgree("N")
            .createTime(Timestamp.valueOf(LocalDateTime.now()))
            .updateTime(Timestamp.valueOf(LocalDateTime.now()))
            .socialTypeCode(socialType)
            .socialId(oauth2UserInfo.getId())
            .role(Role.GUEST)
            .build();

//        String userId = "P";
//        switch (socialType) {
//            case KAKAO:
//                userId += "K";
//                break;
//            case NAVER:
//                userId += "N";
//                break;
//            case GOOGLE:
//                userId += "G";
//                break;
//        }
//
//        Optional<UserSequence> userSequence = userSequenceRepository.findUserSequence();
//        String lastNumber = "";
//        if (!userSequence.isEmpty()) {
//            lastNumber = String.valueOf(Integer.parseInt(userSequence.get().getPatientSeq()) + 1); // 11
//            StringBuilder zero = new StringBuilder();
//            for (int i = 0; i < 9 - lastNumber.length(); i++) {
//                zero.append("0");
//            } // PK000000011
//            zero.append(lastNumber);
//            lastNumber = zero.toString();
//
//            userSequence.get().setPatientSeq(lastNumber);
//        } else {
//            return null;
//        }
//
//        userId += lastNumber;
//
//        return User.builder()
//            .socialTypeCode(String.valueOf(socialType))
//            .userId(userId)
//            .build();
    }
}
