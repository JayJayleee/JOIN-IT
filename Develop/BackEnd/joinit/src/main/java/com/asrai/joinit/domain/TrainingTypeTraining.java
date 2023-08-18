package com.asrai.joinit.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "training_type_training")
@Getter @Setter
public class TrainingTypeTraining {

	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name = "mapping_id", nullable = false)
	private JointTrainingType jointTrainingType;

	@Id
	@ManyToOne(fetch = FetchType.LAZY)
//	@JsonIgnore
	@JoinColumn(name = "training_id", nullable = false)
	private Training training;

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		TrainingTypeTraining that = (TrainingTypeTraining) o;
		return Objects.equals(jointTrainingType, that.jointTrainingType)
			&& Objects.equals(training, that.training);
	}

	@Override
	public int hashCode() {
		return Objects.hash(jointTrainingType, training);
	}
}
