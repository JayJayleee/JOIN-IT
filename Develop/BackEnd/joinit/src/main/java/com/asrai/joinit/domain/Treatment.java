package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.sql.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Treatment {

	@Id @GeneratedValue
	@Column(name = "treatment_id")
	private Long treatmentId;

	//치료사id
//	private Therapist therapist;

	//환부id
	@ManyToOne
	@JoinColumn(name = "joint_id")
	private Joint joint;
	
	//환부 명
	@Column(name = "joint_name")
	private String jointName;

	//환자id
//	@ManyToOne
//	private Patient patient;
	
	//환자 명
	@Column(name = "patient_name")
	private String patientName;
	
	//환자 전화번호
	@Column(name = "patient_phone")
	private String patientPhone;

	//사고경위
	@Column(name = "accident_detail")
	private String accidentDetail;

	//특이사항
	@Column(name = "treatment_significant")
	private String treatmentSignificant;

	//요약
	private String summary;
	
	//완료 여부
	@Column(name = "is_completed")
	private String isCompleted;

	//치료 코드
	@Column(name = "treatement_code")
	private String treatementCode;

	//진료 시작일
	@Column(name = "start_time")
	private java.sql.Timestamp startTime;
	
	//진료 수정일
	@Column(name = "update_time")
	private java.sql.Timestamp updateTime;
	
	//진료 종료일
	@Column(name = "end_time")
	private java.sql.Timestamp endTime;

}
