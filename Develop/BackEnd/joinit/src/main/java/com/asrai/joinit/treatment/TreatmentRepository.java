package com.asrai.joinit.treatment;

import com.asrai.joinit.domain.Joint;
import com.asrai.joinit.domain.Therapist;
import com.asrai.joinit.domain.Treatment;
import com.asrai.joinit.domain.User;
import com.asrai.joinit.dto.TreatmentCodeDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TreatmentRepository {

	private final EntityManager em; 

	//치료 등록, 수정
	public void saveTreatment(Treatment treatment) {
		if(treatment.getTreatmentId() == 0) {
			em.persist(treatment);
		} else {
//			System.out.println("수정으로 들어옴");
//			System.out.println(treatment.getJointName());
//			System.out.println(treatment.getPatientName());
			em.merge(treatment);
		}
	}

	//치료사 id로 치료사 조회 (치료 등록용)
	public Therapist findTherapist(String id) {
		return em.find(Therapist.class, id);
	}

	//환부 명으로 환부 조회 (치료 등록용)
	public Joint findJoint(String name) {
//		return em.find(Joint.class, name);
		return em.createQuery("select j from Joint j where j.jointName = '"+name+"'", Joint.class).getSingleResult();
	}

	//치료사 기준 전체 치료 리스트 조회
//	public List<Treatment> selectTreatmentListForTherapist(String id) {
//		System.out.println("treatmentRepository");
//		return em.createQuery("select t from Treatment t where t.therapist.id = '"+id+"' order by t.startTime desc", Treatment.class).getResultList();
//	}

	//치료사 기준 진행 치료 리스트 조회
	public List<Treatment> selectTreatmentListForTherapistInProgress(String id) {
		return em.createQuery("select t from Treatment t where t.therapist.id = '"+id+"' and t.isCompleted = 'N' order by t.startTime desc", Treatment.class).getResultList();
	}

	//치료사 기준 완료 치료 리스트 조회
	public List<Treatment> selectTreatmentListForTherapistCompleted(String id) {
		return em.createQuery("select t from Treatment t where t.therapist.id = '"+id+"' and t.isCompleted = 'Y' order by t.startTime desc", Treatment.class).getResultList();
	}

	//환자 기준 진행 치료 리스트 조회
	public List<Treatment> selectTreatmentListForPatientInProgress(String id) {
//		System.out.println("repository");
		return em.createQuery("select t from Treatment t where t.patient.id = '"+id+"' and t.isCompleted = 'N' order by t.startTime desc", Treatment.class).getResultList();
	}

	//환자 기준 완료 치료 리스트 조회
	public List<Treatment> selectTreatmentListForPatientCompleted(String id) {
		return em.createQuery("select t from Treatment t where t.patient.id = '"+id+"' and t.isCompleted = 'Y' order by t.startTime desc", Treatment.class).getResultList();
	}

	//치료사가 해당 환자에게 할당했던 치료 리스트 조회
	public List<Treatment> selectTreatmentListForTherapistAssignedToPatient(String therapistId, String patientId) {
//		System.out.println("repository");
		return em.createQuery("select t from Treatment t where t.therapist.id = '"+therapistId+"' and t.patient.id = '"+patientId+"' order by t.startTime desc", Treatment.class).getResultList();
	}

	//수정용 치료 상세 조회
	public Treatment selectTreatmentDetail(int treatmentId) {
		return em.find(Treatment.class, treatmentId);
	}

	//치료별 환자 정보 조회
	public Treatment selectPatientProfile(int treatmentId) {
		return em.createQuery("select t from Treatment t where t.treatmentId = '"+treatmentId+"'", Treatment.class).getSingleResult();
	}

	//환자 이름, 전화번호 입력해서 환자 id 반환
	public String selectTreatmentPatientId(String patientName, String patientPhone) {
		return (String)em.createNativeQuery("select u.user_id from user u where u.name = '"+patientName+"' and u.phone = '"+patientPhone+"'").getSingleResult();
	}

	//환자 이름, 전화번호 입력해서 치료코드 리스트 반환
	public List<Treatment> selectTreatmentCodeList(String patientName, String patientPhone) {
//		System.out.println("리포지토리까지 옴");
		return em.createQuery("select t from Treatment t where t.patientName = '"+patientName+"' and t.patientPhone = '"+patientPhone+"'", Treatment.class).getResultList();
	}

	//있는 치료 코드인지 조회하고 치료 id 반환
	public int selectTreatmentCode(String code) {
//		System.out.println("리포지토리까지 옴");
		try {
			return em.createQuery("select t.treatmentId from Treatment t where t.treatmentCode = '"+code+"'", Integer.class).getSingleResult();
		} catch (NoResultException e) {
			return 0;
		}
	}

	//진행 중 처방 갯수
	public Long selectAllPrescription(int treatmentId) {
		return em.createQuery("select count(p) from Prescription p where p.treatment.treatmentId = '"+treatmentId+"'and p.isCompleted = 'N'", Long.class).getSingleResult();
	}

	//완료 처방 갯수
	public Long selectCompletedPrescription(int treatmentId) {
		return em.createQuery("select count(p) from Prescription p where p.treatment.treatmentId = '"+treatmentId+"' and p.isCompleted = 'Y'", Long.class).getSingleResult();
	}

	//처음이신가요? - 환자에게 할당된 치료 리스트가 있는지 없는지
	public boolean isFirstTreatment(String patientId) {
		Long count = em.createQuery("select count(t) from Treatment t where t.patient.id = '"+patientId+"'", Long.class).getSingleResult();
		System.out.println("count: " +count);
		if(count == 0)
			return true;
		else
			return false;
	}

	//환자에게 할당된 치료 리스트
	public List<Treatment> selectTreatmentListForPatient(String patientId) {
		return em.createQuery("select t from Treatment t where t.patient.id = '" + patientId + "'",
			Treatment.class).getResultList();
	}

}
