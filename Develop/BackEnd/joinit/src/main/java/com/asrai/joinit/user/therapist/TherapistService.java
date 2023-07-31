package com.asrai.joinit.user.therapist;

import com.asrai.joinit.domain.Therapist;
import org.springframework.web.multipart.MultipartFile;

public interface TherapistService {

    void addProfile(String therapistId, Therapist therapist, MultipartFile licenseImage, String licenseImageName);

    Therapist getProfile(String therapistId);

    Therapist updateProfile(String therapistId);

    void addProfileImage(String therapistId, MultipartFile profileImage, String profileImageName);

    void updateProfileImage(String therapistId, MultipartFile profileImage, String profileImageName);
}
