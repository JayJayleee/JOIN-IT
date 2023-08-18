package com.asrai.joinit.dto;

import com.asrai.joinit.domain.Training;
import java.sql.Timestamp;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
public class PrescriptionOutputDto {

	private int	prescriptionId;
	private int treatmentId; //필요한가?
	private TrainingOutputDto training;
	private String prescriptionCode;
	private String isCompleted;
	private String timeOver;
	private LocalDate prescriptionTime;

}
