package com.asrai.joinit.user.therapist;

import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.domain.Therapist;
import com.asrai.joinit.domain.Treatment;
import com.asrai.joinit.dto.AdminTherapistDto;
import com.asrai.joinit.dto.PatientDto;
import com.asrai.joinit.dto.PatientProfileTreatmentDto;
import com.asrai.joinit.dto.PatientTreatmentDto;
import com.asrai.joinit.dto.TherapistDto;
import com.asrai.joinit.dto.TherapistProfileDto;
import com.asrai.joinit.img.ImageService;
import com.asrai.joinit.user.patient.PatientDiseaseRepository;
import com.asrai.joinit.user.patient.PatientInfo;
import com.asrai.joinit.user.patient.PatientRepository;
import com.querydsl.core.Tuple;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service @Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TherapistServiceImpl implements TherapistService {

    private final TherapistRepository therapistRepository;
    private final ImageService imageService;
    private final PatientDiseaseRepository patientDiseaseRepository;
    private final PatientRepository  patientRepository;

    @Override
    @Transactional
    public boolean addProfile(String userId, TherapistDto therapistDto, MultipartFile licensePhoto)
        throws IOException {

        log.info("userId : {}", userId);

        Optional<Therapist> therapistOptional = therapistRepository.findById(userId);
        if (therapistOptional.isEmpty()) {
            return false;
        }
        Therapist therapist = therapistOptional.get();

        log.info("therapist : {}",  therapist);

        if (therapistDto.getBirth() != null && !therapistDto.getBirth().equals("")) {
            therapist.setBirth(therapistDto.getBirth());
        }
        if (therapistDto.getGender() != null && !therapistDto.getGender().equals("")) {
            therapist.setGender(therapistDto.getGender());
        }
        if (therapistDto.getHospitalName() != null && !therapistDto.getHospitalName().equals("")) {
            therapist.setHospitalName(therapistDto.getHospitalName());
        }
        if (therapistDto.getHospitalNumber() != null && !therapistDto.getHospitalNumber().equals("")) {
            therapist.setHospitalNumber(therapistDto.getHospitalNumber());
        }

        therapist.setIntroduce(therapistDto.getIntroduce());
        therapist.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));

        String imageImgRouteOriginalName = UUID.randomUUID() + "-" + licensePhoto.getOriginalFilename();

        String upload = imageService.upload(licensePhoto, imageImgRouteOriginalName);

        therapist.setLicenseImgRoute(upload);

        therapistRepository.flush();

        return true;
    }

    @Override
    public TherapistProfileDto getProfile(String therapistId) {
        Optional<Therapist> therapistOptional = therapistRepository.findById(therapistId);
        if (therapistOptional.isEmpty()) {
            return null;
        }
        Therapist therapist = therapistOptional.get();
        log.info("therapist : {}",  therapist);
        TherapistProfileDto therapistProfileDto = new TherapistProfileDto(
            therapist.getUserId(),
            therapist.getName(),
            therapist.getLoginId(),
            therapist.getPhone(),
            therapist.getEmail(),
            therapist.getBirth(),
            therapist.getGender(),
            therapist.getHospitalName(),
            therapist.getHospitalNumber(),
            therapist.getIntroduce(),
            therapist.getLicenseImgRoute()
        );
        return therapistProfileDto;
    }

    @Override
    @Transactional
    public TherapistProfileDto updateProfile(String therapistId, TherapistProfileDto therapistProfileDto) {
        Optional<Therapist> therapistOptional = therapistRepository.findById(therapistId);
        if (therapistOptional.isEmpty()) {
            return null;
        }
        Therapist therapist = therapistOptional.get();
        log.info("therapist : {}",  therapist);

        if (therapistProfileDto.getName() != null && !therapistProfileDto.getName().equals("")) {
            therapist.setName(therapistProfileDto.getName());
        }
        if (therapistProfileDto.getPhone() != null && !therapistProfileDto.getPhone().equals("")) {
            therapist.setPhone(therapistProfileDto.getPhone());
        }
        if (therapistProfileDto.getEmail() != null && !therapistProfileDto.getEmail().equals("")) {
            therapist.setEmail(therapistProfileDto.getEmail());
        }
        if (therapistProfileDto.getHospitalName() != null && !therapistProfileDto.getHospitalName().equals("")) {
            therapist.setHospitalName(therapistProfileDto.getHospitalName());
        }
        if (therapistProfileDto.getHospitalNumber() != null && !therapistProfileDto.getHospitalNumber().equals("")) {
            therapist.setHospitalNumber(therapistProfileDto.getHospitalNumber());
        }
        if (therapistProfileDto.getIntroduce() != null && !therapistProfileDto.getIntroduce().equals("")) {
            therapist.setIntroduce(therapistProfileDto.getIntroduce());
        }
        therapist.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));

        return getProfile(therapistId);
    }

//    @Override
//    @Transactional
//    public void addProfileImage(String therapistId, MultipartFile profileImage,
//        String profileImageName) {
//    }
//
//    @Override
//    @Transactional
//    public void updateProfileImage(String therapistId, MultipartFile profileImage,
//        String profileImageName) {
//    }

    @Override
    public TherapistDto getOneTherapist(String therapistId) {
        Optional<Therapist> therapistOptional = therapistRepository.findById(therapistId);

        if (!therapistOptional.isPresent()) {
            return null;
        }

        Therapist therapist = therapistOptional.get();
        log.info("therapist : {}", therapist);

        return new TherapistDto(
            therapist.getUserId(),
            therapist.getName(),
            therapist.getLoginId(),
            therapist.getPhone(),
            therapist.getEmail(),
            therapist.getUserTypeCode(),
            therapist.getRole(),
            therapist.getSocialTypeCode(),
            therapist.getSocialId(),
            therapist.getSmsAgree(),
            therapist.getEmailAgree(),
            therapist.getCreateTime(),
            therapist.getUpdateTime(),
            therapist.getEndTime(),
            therapist.getBirth(),
            therapist.getGender(),
            therapist.getHospitalName(),
            therapist.getHospitalNumber(),
            therapist.getIntroduce(),
            therapist.getLicenseImgRoute()
        );
    }

    @Override
    public List<TherapistDto> getTherapistList() {
        List<Therapist> therapistList = therapistRepository.getTherapistList();
        return therapistList.stream().map(t -> new TherapistDto(
            t.getUserId(),
            t.getName(),
            t.getLoginId(),
            t.getPhone(),
            t.getEmail(),
            t.getUserTypeCode(),
            t.getRole(),
            t.getSocialTypeCode(),
            t.getSocialId(),
            t.getSmsAgree(),
            t.getEmailAgree(),
            t.getCreateTime(),
            t.getUpdateTime(),
            t.getEndTime(),
            t.getBirth(),
            t.getGender(),
            t.getHospitalName(),
            t.getHospitalNumber(),
            t.getIntroduce(),
            t.getLicenseImgRoute()
        )).collect(Collectors.toList());
    }

    @Override
    public List<PatientInfo> findPatientListByTherapist(String therapistId) {

        log.info("therapistId : {}", therapistId);

        List<Tuple> patientListByTherapistId = therapistRepository.findPatientListByTherapistId(therapistId);

        log.info("patientListByTherapistId : {}", patientListByTherapistId);

        List<PatientInfo> collect = patientListByTherapistId.stream().map(t -> new PatientInfo(
            t.get(0, String.class),
            t.get(1, String.class),
            t.get(2, String.class),
            t.get(3, String.class),
            t.get(4, LocalDate.class)
        )).collect(Collectors.toList());

        /*
            환자 리스트를 가져온 이후, index를 돌면서 중복인 userId의 index를 저장하고
            중복이 있다면 하나만 남겨야 한다.
            isCompleted를 확인하여 N이 하나라도 있다면 N을 남겨야 한다. (N > Y)
            N이 index의 앞에 있으므로, 뒤의 중복을 지우면 된다.
            
            1. collect를 돌면서 등장하는 userId를 Map<String, List<Integer>>로 저장하여 index를 저장하며 개수를 센다.
            2. List의 size가 중복의 개수이고, 값은 index가 된다.
            3. size가 2가 넘어간다면
         */
        Map<String, List<Integer>> duplicatedCheckMap = new HashMap<>();
        for (int i = 0; i < collect.size(); i++) {
            // collect에 저장되어있는 patientInfo의 userId를 가져온다.
            String userId = collect.get(i).getUserId();
            // 처음 등장하는 userId 라면 -> list를 새로 만들고, index를 추가한다.
            if (!duplicatedCheckMap.containsKey(userId)) {
                duplicatedCheckMap.put(userId, new ArrayList<>());
                duplicatedCheckMap.get(userId).add(i);
            } else { // 이미 있는 userId라면 index를 추가한다. = 중복이 존재하여 size가 2가 된다.
                duplicatedCheckMap.get(userId).add(i);
            }
        }

        log.info("duplicatedCheckMap : {}", duplicatedCheckMap);

        List<Integer> deleteIndexList = new ArrayList<>();

        for (List<Integer> list : duplicatedCheckMap.values()) {
            if (list.size() == 1) continue;
            boolean existN = false;
            // 중복이 있을 때, isCompleted가 N인 것이 하나라도 존재한다면 하나만 남기고 다 지우는 list에 저장한다.
            for (int i = 0; i < list.size(); i++) {
                if (existN) { // N이 이미 존재한다면, 이후의 index들은 지우면 된다.
                    deleteIndexList.add(list.get(i));
                    continue;
                }
                int collectIndex = list.get(i); // collect의 index 추출
                if (collect.get(collectIndex).getIsCompleted().equals("N")) { // N 찾기
                    existN = true;
                }
            }
            // N이 없이 다 Y라면 Y인 치료 중에 마지막에 끝난 것만 남기고 다 지우는 list에 저장한다.
            if (existN) continue;
            boolean isFirst = true;
            for (int i = 0; i < list.size(); i++) {
                // 처음에 등장하는 Y만 안 지우고, 이후의 값들은 다 지운다.
                if (isFirst) {
                    isFirst = false;
                    continue;
                }
                deleteIndexList.add(list.get(i));
            }
        }

        Collections.sort(deleteIndexList);

        log.info("deleteIndexList : {}", deleteIndexList);

        for (int i = deleteIndexList.size() - 1; i >= 0; i--) {
            int index = deleteIndexList.get(i);
            log.info("deleteIndexList.get(i) : {}", index);
            log.info("collect[i] : {}", collect.get(index));
            collect.remove(collect.get(index));
        }

        log.info("collect : {}", collect);

        return collect;
    }

    @Override
    public PatientProfileTreatmentDto findPatientDetailByTherapist(String therapistId, String patientId) {

        List<Treatment> therapistOptional = therapistRepository.findByTherapistIdAndPatientId(therapistId, patientId);
        if (therapistOptional.isEmpty()) {
            return null;
        }

        Patient patient =therapistRepository.findPatientByTherapist(patientId);

        PatientProfileTreatmentDto patientDto = new PatientProfileTreatmentDto(
            patient.getName(), // 이름
            patient.getPhone(), // 전화번호
            patient.getHeight(), // 키
            patient.getWeight(), // 몸무게
            patient.getBirth(), // 생일
            patient.getGender(), // 성별
            patient.getEtc(), // 기타 질환
            patient.getPastAccidentDetails(), // 사고이력
            patient.getSignificant() // 특이사항
        );

        patientDto.setPatientDiseaseList(patientDiseaseRepository.patientDiseaseDTOListByPatientId(patient)); // 질환 목록
        List<Treatment> patientTreatmentList = patientRepository.patientTreatmentList(therapistId, patientId); // 치료 목록
        if  (patientTreatmentList.isEmpty()) {
            return patientDto;
        }
        List<PatientTreatmentDto> collect = patientTreatmentList.stream().map(treatment ->
            new PatientTreatmentDto(
                treatment.getTreatmentId(),
                treatment.getPatientName(),
                treatment.getJointName(),
                String.valueOf(treatment.getStartTime()),
                String.valueOf(treatment.getEndTime()),
                treatment.getSummary()
            )
        ).collect(Collectors.toList());

        for (PatientTreatmentDto patientTreatmentDto : collect) {
            Integer completedPrescription = patientRepository.countCompletedPrescriptionByTreatmentId(patientTreatmentDto.getTreatmentId());
            Integer uncompletedPrescription = patientRepository.countUncompletedPrescriptionByTreatmentId(patientTreatmentDto.getTreatmentId());

            patientTreatmentDto.setCompletedPrescription(completedPrescription); // 치료 개수가 아니라, 처방 개수 (미완료, 완료 입력해주기)
            patientTreatmentDto.setUncompletedPrescription(uncompletedPrescription); // 치료 개수가 아니라, 처방 개수 (미완료, 완료 입력해주기)
        }


        patientDto.setTreatmentList(collect);

        return patientDto;
    }


}
