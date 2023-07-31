package com.asrai.joinit.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "training_type_training")
@Getter @Setter
public class TrainingTypeTraining {

	@Id
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "mapping_id")
	private JointTrainingType jointTrainingType;

	@Id
	@ManyToOne
//	@JsonIgnore
	@JoinColumn(name = "training_id")
	private Training training;

}
