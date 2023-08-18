package com.asrai.joinit.prescription;

import com.asrai.joinit.domain.Prescription;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.domain.Treatment;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PrescriptionRepository {

	private final EntityManager em;

	//운동, 코칭, 대면 처방 등록 & 수정
	public void insertPrescription(Prescription prescription) {
		if (prescription.getPrescriptionId() == 0) {
			em.persist(prescription);
		} else {
			em.merge(prescription);
		}
	}

	//운동 id로 운동 조회
	public Training findTrainingById(int trainingId) {
		return em.find(Training.class, trainingId);
	}

	//치료 id로 치료 조회
	public Treatment findTreatmentById(int treatmentId) {
		return em.find(Treatment.class, treatmentId);
	}

	//치료별 전체 처방 리스트 조회
	public List<Prescription> selectPrescriptionListByTreatmentId(int treatmentId) {
		return em.createQuery("select p from Prescription p where p.treatment.treatmentId = '"+treatmentId+"' order by p.prescriptionProcessTime desc",
			Prescription.class).getResultList();
	}

	//치료사별 전체 처방 리스트 조회 (코칭, 대면만)
	public List<Prescription> selectPrescriptionListByTherapistId(String therapistId) {
		return em.createQuery("select p from Prescription p where p.treatment.therapist.id = '"+therapistId+"' and p.prescriptionCode != '운동'", Prescription.class)
			.getResultList();
	}

	//치료사별 일별 처방 리스트 조회 (코칭, 대면만)
	public List<Prescription> selectDailyPrescriptionByTherapistId(String therapistId, String date) {
//		return em.createQuery("select p from Prescription p where p.treatment.therapist.id = '"+therapistId+"' and p.prescriptionProcessTime = '"+date+"' and p.prescriptionCode != '운동'", Prescription.class)
//			.getResultList();

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate localDate = LocalDate.parse(date, formatter);
		LocalDateTime startOfDay = localDate.atStartOfDay();
		LocalDateTime endOfDay = localDate.atTime(23, 59, 59);

		String jpql = "select p from Prescription p where p.treatment.therapist.id = '"+therapistId+"' and p.prescriptionProcessTime between '"+startOfDay+"' and '"+endOfDay+"' and p.prescriptionCode != '운동'";
		return em.createQuery(jpql, Prescription.class).getResultList();
	}

	//치료별 일별 처방 리스트 조회 (운동, 코칭, 대면 모두)
	public List<Prescription> selectDailyPrescriptionByPatientId(int treatmentId, String date) {
//		return em.createQuery("select p from Prescription p where p.treatment.patient.id = '"+patientId+"' and p.prescriptionProcessTime = '"+date+"'", Prescription.class)
//			.getResultList();

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate localDate = LocalDate.parse(date, formatter);
		LocalDateTime startOfDay = localDate.atStartOfDay();
		LocalDateTime endOfDay = localDate.atTime(23, 59, 59);

		String jpql = "select p from Prescription p where p.treatment.treatmentId = '"+treatmentId+" ' and p.prescriptionProcessTime between '"+startOfDay+"' and '"+endOfDay+"'";
		return em.createQuery(jpql, Prescription.class).getResultList();
	}

	//치료사 기준 금일 코칭 조회
	public List<Prescription> selectCoachingListByTherapistId(String therapistId) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate localDate = LocalDate.now();
//		String date = "2023-08-19";
//		LocalDate localDate = LocalDate.parse(date, formatter);
		LocalDateTime startOfDay = localDate.atStartOfDay();
		LocalDateTime endOfDay = localDate.atTime(23, 59, 59);

		String jpql = "select p from Prescription p where p.treatment.therapist.id = '"+therapistId+"' and p.prescriptionProcessTime between '"+startOfDay+"' and '"+endOfDay+"' and p.prescriptionCode = '코칭' order by p.prescriptionProcessTime asc";
		return em.createQuery(jpql, Prescription.class).getResultList();
	}

	//치료별 전체 처방 리스트 (환자 달력용)
	public List<Prescription> selectPrescriptionListForPatient(String treatmentId) {
		String jpql = "select p from Prescription p where p.treatment.treatmentId = '"+treatmentId+"'";
		return em.createQuery(jpql, Prescription.class).getResultList();
	}

	//환자별 일별 처방 리스트
	public List<Prescription> selectPrescriptionListDailyForPatient(String patientId, String date) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate localDate = LocalDate.parse(date, formatter);
		LocalDateTime startOfDay = localDate.atStartOfDay();
		LocalDateTime endOfDay = localDate.atTime(23, 59, 59);

		String jpql = "select p from Prescription p where p.treatment.patient.id = '"+patientId+"' and p.prescriptionProcessTime between '"+startOfDay+"' and '"+endOfDay+"' order by case when p.isCompleted='N' then 0 else 1 end, p.prescriptionProcessTime";
		return em.createQuery(jpql, Prescription.class).getResultList();
	}

	//환자별 완료된 일별 처방 리스트
//	public List<Prescription> selectCompletedPrescriptionListDailyForPatient(String patientId, String date) {
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//		LocalDate localDate = LocalDate.parse(date, formatter);
//		LocalDateTime startOfDay = localDate.atStartOfDay();
//		LocalDateTime endOfDay = localDate.atTime(23, 59, 59);
//
//		String jpql = "select p from Prescription p where p.treatment.patient.id = '"+patientId+"' and p.prescriptionProcessTime between '"+startOfDay+"' and '"+endOfDay+"' and p.isCompleted = 'Y'";
//		return em.createQuery(jpql, Prescription.class).getResultList();
//	}

	//처방 상세 조회(수정용)
	public Prescription selectPrescriptionDetail(int prescriptionId) {
		return em.find(Prescription.class, prescriptionId);
	}

	//처방 삭제
	public void deletePrescription(int prescriptionId) {
//		em.remove(em.find(Prescription.class, prescriptionId));
		System.out.println("처방 삭제 들어옴");
		String jpql = "DELETE FROM Prescription p WHERE p.prescriptionId = '"+prescriptionId+"' and p.isCompleted = 'N'";
		em.createQuery(jpql).executeUpdate();
	}

	//치료별 처방 갯수
//	public Long countPrescriptionByTreatmentId(int treatmentId) {
//		return em.createQuery("select count(p) from Prescription p where p.treatment.treatmentId = '"+treatmentId+"' and p.prescriptionCode != '대면'", Long.class).getSingleResult();
//	}

	//치료별 완료 처방 갯수
//	public Long countCompletedPrescription(int treatmentId) {
//		return em.createQuery("select count(p) from Prescription p where p.treatment.treatmentId = '"+treatmentId+"' and p.isCompleted = 'Y'", Long.class).getSingleResult();
//	}

	//환자의 일별 처방 갯수
	public Long countDailyPrescription(int treatmentId, String date) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate localDate = LocalDate.parse(date, formatter);
		LocalDateTime startOfDay = localDate.atStartOfDay();
		LocalDateTime endOfDay = localDate.atTime(23, 59, 59);
		return em.createQuery("select count(p) from Prescription p where p.treatment.id = '"+treatmentId+"' and p.prescriptionProcessTime between '"+startOfDay+"' and '"+endOfDay+"'", Long.class).getSingleResult();
	}

	//환자의 일별 완료 처방 갯수
	public Long countDailyCompletedPrescription(int treatmentId, String date) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate localDate = LocalDate.parse(date, formatter);
		LocalDateTime startOfDay = localDate.atStartOfDay();
		LocalDateTime endOfDay = localDate.atTime(23, 59, 59);
		return em.createQuery("select count(p) from Prescription p where p.treatment.id = '"+treatmentId+"' and p.prescriptionProcessTime between '"+startOfDay+"' and '"+endOfDay+"' and p.isCompleted = 'Y'", Long.class).getSingleResult();
	}

	//치료 id로 해당 치료의 미완료 처방 리스트 조회
	public List<Prescription> selectUncompletedPrescriptionList(int treatmentId) {
		return em.createQuery("select p from Prescription p where p.treatment.treatmentId = '"+treatmentId+"' and p.isCompleted = 'N'",
			Prescription.class).getResultList();
	}
	
}
