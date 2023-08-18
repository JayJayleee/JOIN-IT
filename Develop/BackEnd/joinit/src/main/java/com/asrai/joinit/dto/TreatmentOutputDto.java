package com.asrai.joinit.dto;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TreatmentOutputDto {

	private int treatmentId; //혹시 모르니 받아두기 (무조건 필요해보임)
	private String patientName;
	private String jointName;
	private LocalDate startTime;
	private String patientPhone;
	private String accidentDetail;
	private String treatmentSignificant;
	private String summary;

	//처방 건수

}
