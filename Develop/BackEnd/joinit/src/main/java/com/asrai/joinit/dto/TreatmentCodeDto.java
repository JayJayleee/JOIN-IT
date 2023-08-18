package com.asrai.joinit.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

//환자 이름과 전화번호를 입력하면 환자 id와 치료코드 리스트를 반환하는 api에서 사용
@Getter @Setter
public class TreatmentCodeDto {

	private String patientId;
	private List<String> treatmentCodeList;

}
