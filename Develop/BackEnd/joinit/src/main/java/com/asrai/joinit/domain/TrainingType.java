package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "training_type")
@Getter @Setter
public class TrainingType {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "training_type_id")
	private int trainingTypeId;

	@Column(name = "training_type_name", nullable = false)
	private String trainingTypeName;

	@OneToMany(mappedBy = "trainingType")
	private List<JointTrainingType> jointTrainingTypes = new ArrayList<>();
	//환부와 운동종류 매핑
	//다대다 관계 매핑 테이블을 엔티티로 분리하고 각각 ManyToOne으로 해줌
	//근데 어디 쪽에 리스트가 들어가야하는지 헷갈려서 일단 양쪽 다 넣어둠
	//상의해서 빼기

}
