package com.asrai.joinit.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PrescriptionInputDto {

	private int treatmentId;
	private int trainingId;
	private String prescriptionCode;
	private String prescriptionComment;
//	private String coachingComment;
	private String onlineCoachingUrl;
	private double targetAngle;
	private int setCount;
	private String isCompleted;
	private String timeOver;
	private String prescriptionTime; //처방일은 해당 처방일 (운동, 코칭, 대면 모두 해당)
	//서비스 단에서 타입 처리 필요
	private String prescriptionProcessTime; //코칭, 대면에만 해당

}
