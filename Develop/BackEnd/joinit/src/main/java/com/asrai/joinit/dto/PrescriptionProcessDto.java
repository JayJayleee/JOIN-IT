package com.asrai.joinit.dto;

import com.asrai.joinit.domain.Prescription;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrescriptionProcessDto {

    TrainingOutputDto training;
    PrescriptionDetailDto prescription;


}
