package com.asrai.joinit.user.therapist;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TherapistServiceImpl implements TherapistService {

    private final TherapistRepository therapistRepository;

}
