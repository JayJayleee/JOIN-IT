package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class JointTrainingType {

	@Id @GeneratedValue
	@Column(name = "mapping_id")
	private Long mappingId;

	@ManyToOne
	@JoinColumn(name = "joint_id")
	private Joint joint;

	@ManyToOne
	@JoinColumn(name = "training_type_id")
	private TrainingType exerciseType;

	private int count; // 트레이닝 수
}
