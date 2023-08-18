package com.asrai.joinit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDate;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter @Setter
public class Treatment {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "treatment_id")
	private int treatmentId;

	//치료사
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "therapist_id")
	private Therapist therapist;

	//환부
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "joint_id")
	private Joint joint;

	//환부 명
	@Column(name = "joint_name")
	private String jointName;

	//환자
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "patient_id")
	private Patient patient;
	
//	환자 명
	@Column(name = "patient_name", nullable = false)
	private String patientName;
	
	//환자 전화번호
	@Column(name = "patient_phone", nullable = false)
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
	@Column(name = "is_completed", nullable = false)
//	@Builder.Default("N")
	@ColumnDefault("N")
	private String isCompleted;

	//치료 코드
	@Column(name = "treatement_code")
	private String treatmentCode;

	//진료 시작일
	@Column(name = "start_time", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private LocalDate startTime;
	
	//진료 수정일
	@Column(name = "update_time")
	private LocalDate updateTime;
	
	//진료 종료일
	@Column(name = "end_time")
	private LocalDate endTime;


	@OneToMany(fetch = FetchType.LAZY, mappedBy = "treatment")
	private List<Prescription> prescriptions;

}
