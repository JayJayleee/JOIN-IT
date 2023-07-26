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
public class Joint {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "joint_id")
	private int jointId;

	@Column(name = "joint_name")
	private String jointName;

	@OneToMany(mappedBy = "joint")
	private List<JointTrainingType> jointTrainingTypes = new ArrayList<>();
}
