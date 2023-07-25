package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Joint {

	@Id @GeneratedValue
	@Column(name = "joint_id")
	private Long jointId;

	@Column(name = "joint_name")
	private String jointName;

	@OneToMany(mappedBy = "joint")
	private List<JointTrainingType> jointTrainingTypes = new ArrayList<>(;)
}
