package com.asrai.joinit.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TrainingOutputDto {

	private int trainingID;
	private String trainingName;
	private String trainingURL;
	private int startPoint;
	private int middlePoint;
	private int endPoint;
	private int difficulty;
	private String description;
	private int rom;
	private List<JointNameAndTrainingType> jointNameAndTrainingTypeList;

}
