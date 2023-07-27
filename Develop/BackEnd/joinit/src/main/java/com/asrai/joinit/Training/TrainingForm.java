package com.asrai.joinit.Training;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TrainingForm {

	private int trainingID;
	private String trainingName;
	private String trainingURL;
	private int startPoint;
	private int middlePoint;
	private int endPoint;
	private int difficulty;
	private String description;
	private int[] mappingIds;

}
