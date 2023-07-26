package com.asrai.joinit.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class TrainingTypeTraining {

	@Id
	@ManyToOne
	@JoinColumn(name = "mapping_id")
	private JointTrainingType jointTrainingType;

	@Id
	@ManyToOne
	@JoinColumn(name = "training_id")
	private Training training;

}
