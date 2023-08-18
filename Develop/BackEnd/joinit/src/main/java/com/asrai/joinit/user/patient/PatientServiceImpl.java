package com.asrai.joinit.user.patient;

import com.asrai.joinit.domain.Patient;
import com.asrai.joinit.domain.PatientDisease;
import com.asrai.joinit.dto.AdminPatientDto;
import com.asrai.joinit.dto.PatientDiseaseDto;
import com.asrai.joinit.dto.PatientDto;
import com.asrai.joinit.dto.PatientProfileDto;
import jakarta.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PatientServiceImpl implements PatientService {

    @Autowired
    private EntityManager em;
    private final PatientRepository patientRepository;
    private final PatientDiseaseRepository patientDiseaseRepository;

    @Override
    @Transactional
    public boolean addProfile(String userId, PatientDto patientDto, List<String> diseaseList) {

        String profileColorCode = "C" + (int) ((Math.random() * 20) + 1);

        Optional<Patient> patientOptional = patientRepository.findById(userId);
        if (patientOptional.isEmpty()) {
            return false;
        }
        Patient patient = patientOptional.get();

        log.info("userId = {}", userId);
        log.info("patient = {}", patient);
        log.info("diseaseList = {}", diseaseList);

        patient.setHeight(patientDto.getHeight());
        patient.setWeight(patientDto.getWeight());
        patient.setBirth(patientDto.getBirth());
        patient.setGender(patientDto.getGender());
        patient.setNickname(patientDto.getNickname());
        patient.setEtc(patientDto.getEtc());
        patient.setPastAccidentDetails(patientDto.getPastAccidentDetails());
        patient.setSignificant(patientDto.getSignificant());
        patient.setProfileColorCode(profileColorCode);

        for (int i = 0; i < diseaseList.size(); i++) {
            String diseaseCode = diseaseList.get(i);
            PatientDisease patientDisease = new PatientDisease(patient, diseaseCode);
            patientDiseaseRepository.save(patientDisease);
        }

        return true;
    }

    @Override
    public boolean usedNickname(String nickname) {
        if (patientRepository.countByNickname(nickname) > 0) {
            return true;
        }
        return false;
    }

    @Override
    public PatientProfileDto getProfile(String patientId) {
        Optional<Patient> patientOptional = patientRepository.findById(patientId);
        if (patientOptional.isEmpty()) {
            return null;
        }
        Patient patient = patientOptional.get();
        log.info("patient = {}", patient);
        PatientProfileDto patientProfileDto = new PatientProfileDto(
            patient.getUserId(),
            patient.getName(),
            patient.getLoginId(),
            patient.getPhone(),
            patient.getEmail(),
            patient.getHeight(),
            patient.getWeight(),
            patient.getBirth(),
            patient.getGender(),
            patient.getNickname(),
            patient.getEtc(),
            patient.getPastAccidentDetails(),
            patient.getSignificant()
        );
        List<PatientDiseaseDto> patientDiseaseDtoList = patientDiseaseRepository
            .patientDiseaseDTOListByPatientId(patient);
        List<String> patientProfileDiseaseList = patientDiseaseDtoList.stream()
            .map(list -> list.getDiseaseCode()).collect(Collectors.toList());
        patientProfileDto.setPatientDiseaseList(patientProfileDiseaseList);
        return patientProfileDto;
    }

    @Override
    public PatientProfileDto updateProfile(String patientId, PatientProfileDto patientProfileDto, List<String> patientDiseaseList) {
        Optional<Patient> patientOptional = patientRepository.findById(patientId);
        if (patientOptional.isEmpty()) {
            return null;
        }
        Patient patient = patientOptional.get();
        log.info("patient : {}", patient);

        if (patientProfileDto.getEmail() != null && !patientProfileDto.getEmail().equals("")) {
            patient.setEmail(patientProfileDto.getEmail());
        }
        if (patientProfileDto.getPhone() != null && !patientProfileDto.getPhone().equals("")) {
            patient.setPhone(patientProfileDto.getPhone());
        }
        if (patientProfileDto.getNickname() != null && !patientProfileDto.getNickname().equals("")) {
            patient.setNickname(patientProfileDto.getNickname());
        }
        if (patientProfileDto.getHeight() != null && !patientProfileDto.getHeight().equals(0)) {
            patient.setHeight(patientProfileDto.getHeight());
        }
        if (patientProfileDto.getWeight() != null && !patientProfileDto.getWeight().equals(0)) {
            patient.setWeight(patientProfileDto.getWeight());
        }
        if (patientProfileDto.getEtc() != null && !patientProfileDto.getEtc().equals("")) {
            patient.setEtc(patientProfileDto.getEtc());
        }
        if (patientProfileDto.getPastAccidentDetails() != null && !patientProfileDto.getPastAccidentDetails().equals("")) {
            patient.setPastAccidentDetails(patientProfileDto.getPastAccidentDetails());
        }
        if (patientProfileDto.getSignificant() != null && !patientProfileDto.getSignificant().equals("")) {
            patient.setSignificant(patientProfileDto.getSignificant());
        }
        patient.setUpdateTime(Timestamp.valueOf(LocalDateTime.now()));

        patientDiseaseRepository.deleteByPatientId(patientId);

        em.flush();
        em.clear();

        Patient patient1 = patientRepository.findById(patientId).get();

        if (patientDiseaseList == null) {
            return getProfile(patientId);
        }

        for (int i = 0; i < patientDiseaseList.size(); i++) {
            String diseaseCode = patientDiseaseList.get(i);
            patientDiseaseRepository.save(new PatientDisease(patient1, diseaseCode));
            em.flush();
        }

        em.flush();
        em.clear();

        return getProfile(patientId);

    }

    @Override
    public List<PatientDto> getPatientList() {
        List<Patient> patientList = patientRepository.findPatientList();
        return patientList.stream().map(p -> new PatientDto(
            p.getUserId(),
            p.getName(),
            p.getLoginId(),
            p.getPhone(),
            p.getEmail(),
            p.getUserTypeCode(),
            p.getRole(),
            p.getSocialTypeCode(),
            p.getSocialId(),
            p.getSmsAgree(),
            p.getEmailAgree(),
            p.getCreateTime(),
            p.getUpdateTime(),
            p.getEndTime(),
            p.getHeight(),
            p.getWeight(),
            p.getBirth(),
            p.getGender(),
            p.getNickname(),
            p.getEtc(),
            p.getPastAccidentDetails(),
            p.getSignificant(),
            p.getProfileColorCode()
        )).collect(Collectors.toList());
    }
}
