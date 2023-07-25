package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Training {

	@Id @GeneratedValue
	@Column(name = "training_id")
	private Long trainingId;

	@Column(name = "training_name")
	private String trainingName;

	@Column(name = "training_URL")
	private String trainingURL;

	@Column(name = "start_point")
	private int startPoint;

	@Column(name = "middle_point")
	private int middlePoint;

	@Column(name = "end_point")
	private int endPoint;

	private int difficultly;

	private String description;

	@OneToMany(mappedBy = "training")
	private List<TrainingTypeTraining> trainingTypeTrainings = new ArrayList<>();
}
