package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Training {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "training_id")
	private int trainingId;

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

	@Column(name = "difficulty")
	private int difficulty;

	private String description;

	@OneToMany(mappedBy = "training")
	private List<TrainingTypeTraining> trainingTypeTrainings = new ArrayList<>();
}
