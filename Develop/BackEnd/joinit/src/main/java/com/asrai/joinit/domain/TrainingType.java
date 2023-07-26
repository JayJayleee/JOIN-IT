package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class TrainingType {

	@Id @GeneratedValue
	@Column(name = "training_type_id")
	private Long trainingTypeId;

	@Column(name = "training_type_name")
	private String trainingTypeName;

	@OneToMany(mappedBy = "trainingType")
	private List<JointTrainingType> jointTrainingTypes = new ArrayList<>();
	//환부와 운동종류 매핑
	//다대다 관계 매핑 테이블을 엔티티로 분리하고 각각 ManyToOne으로 해줌
	//근데 어디 쪽에 리스트가 들어가야하는지 헷갈려서 일단 양쪽 다 넣어둠
	//상의해서 빼기

	@OneToMany(mappedBy = "trainingType")
	private List<TrainingTypeTraining> trainingTypeTrainings = new ArrayList<>();
	//운동종류와 트레이닝 매핑
	//위와 동일
}
