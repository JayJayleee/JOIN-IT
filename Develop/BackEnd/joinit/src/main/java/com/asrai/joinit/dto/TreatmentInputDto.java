package com.asrai.joinit.dto;

import java.sql.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TreatmentInputDto {

	private String therapistId;
	private String jointName;
	private String patientName;
	private String patientPhone;
	private String accidentDetail;
	private String treatmentSignificant;
	private String summary;
	private String startTime;

}
