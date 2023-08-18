package com.asrai.joinit.user.patient;

import com.asrai.joinit.dto.AdminPatientDto;
import com.asrai.joinit.dto.PatientDto;
import com.asrai.joinit.dto.PatientProfileDto;
import java.util.List;

public interface PatientService {

    /**
     * 환자 프로필 추가 입력
     * 1. 기본정보 입력
     * 2. 프로필 색상 코드 랜덤 저장
     * 3. 만병질환 리스트 삽입
     * @param patientDto : 환자 데이터
     * @return boolean : 성공여부
     */
    boolean addProfile(String userId, PatientDto patientDto, List<String> patientDiseaseList );

    /**
     * 닉네임 중복 검사
     * @param nickname
     * @return
     */
    boolean usedNickname(String nickname);

    /**
     * 환자 ID로 프로필 조회
     * @param patientId
     * @return
     */
    PatientProfileDto getProfile(String patientId);

    /**
     * 환자의 프로필 수정
     * @param patientId
     * @param patientProfileDto
     * @param patientDiseaseList
     * @return
     */
    PatientProfileDto updateProfile(String patientId, PatientProfileDto patientProfileDto, List<String> patientDiseaseList);

    /**
     * 환자 목록 조회
     * @return
     */
    List<PatientDto> getPatientList();
}
