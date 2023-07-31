package com.asrai.joinit.user.therapist;

import com.asrai.joinit.domain.Therapist;
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

    @Override
    public void addProfile(String therapistId, Therapist therapist, MultipartFile licenseImage,
        String licenseImageName) {

    }

    @Override
    public Therapist getProfile(String therapistId) {
        return null;
    }

    @Override
    public Therapist updateProfile(String therapistId) {
        return null;
    }

    @Override
    public void addProfileImage(String therapistId, MultipartFile profileImage,
        String profileImageName) {

    }

    @Override
    public void updateProfileImage(String therapistId, MultipartFile profileImage,
        String profileImageName) {

    }
}
