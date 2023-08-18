package com.asrai.joinit.user.therapist;

import com.asrai.joinit.dto.AdminTherapistDto;
import com.asrai.joinit.dto.PatientDto;
import com.asrai.joinit.dto.PatientProfileTreatmentDto;
import com.asrai.joinit.dto.TherapistDto;
import com.asrai.joinit.dto.TherapistProfileDto;
import com.asrai.joinit.user.patient.PatientInfo;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface TherapistService {

    public boolean addProfile(String userId, TherapistDto therapistDto, MultipartFile licensePhoto)
        throws IOException;

    /**
     * 치료사 기본 데이터 저장
     * @param therapist
     * @return
     */

//    boolean addProfile(Therapist therapist
////        , MultipartFile licensePhoto
//    ) throws IOException;

    /**
     * 치료사 프로필 조회
     * @param therapistId
     * @return
     */
    TherapistProfileDto getProfile(String therapistId);

    /**
     * 치료사 프로필 업데이트
     * @param therapistId
     * @return
     */
    TherapistProfileDto updateProfile(String therapistId, TherapistProfileDto therapistProfileDto);

//    /**
//     * 치료사 프로필 이미지 저장
//     * @param therapistId
//     * @param profileImage
//     * @param profileImageName
//     */
//    void addProfileImage(String therapistId, MultipartFile profileImage, String profileImageName);
//
//    /**
//     * 치료사 프로필 이미지 수정
//     * @param therapistId
//     * @param profileImage
//     * @param profileImageName
//     */
//    void updateProfileImage(String therapistId, MultipartFile profileImage, String profileImageName);

    /**
     * 치료사 목록 전체 조회
     * @return
     */
    List<TherapistDto> getTherapistList();

    /**
     * 치료사에게 할당된 환자리스트 조회
     * @param therapistId
     * @return
     */
    List<PatientInfo> findPatientListByTherapist(String therapistId);

    /**
     * 치료사가 환자 상세 정보 조회
     * @param therapistId
     * @param patientId
     * @return
     */
    PatientProfileTreatmentDto findPatientDetailByTherapist(String therapistId, String patientId);

    /**
     * 치료사의 모든 정보 조회
     * @param therapistId
     * @return
     */
    TherapistDto getOneTherapist(String therapistId);
}
