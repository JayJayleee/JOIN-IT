package com.asrai.joinit.treatment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Treatment {

	@Id @GeneratedValue
	@Column(name = "treatment_id")
	private String treatmentId;
	@Column(name = "joint_name")
	private String jointName;
	@Column(name = "patient_name")
	private String patientName;
	@Column(name = "patient_phone")
	private String patientPhone;

	

}
