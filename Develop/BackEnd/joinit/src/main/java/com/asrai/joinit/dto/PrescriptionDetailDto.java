package com.asrai.joinit.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PrescriptionDetailDto {

	private int treatmentId;
	private TrainingOutputDto training;
	private String prescriptionCode;
	private String prescriptionComment;
	private String coachingComment;
	private String onlineCoachingUrl;
	private double targetAngle;
	private int setCount;
	private LocalDateTime prescriptionProcessTime; //코칭, 대면에만 해당

}
