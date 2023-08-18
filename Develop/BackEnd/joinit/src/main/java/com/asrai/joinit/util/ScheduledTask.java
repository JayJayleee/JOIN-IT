package com.asrai.joinit.util;

import com.asrai.joinit.domain.Prescription;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ScheduledTask {

	private final EntityManager em;

//	@Scheduled(cron = "0 */1 * * * *") // 매 1분마다 실행
	@Scheduled(cron = "0 0 0 * * *") //매일 자정에 실행
	@Transactional
	public void updateTimeOver() {
		System.out.println("처방 시간 지남 스케줄러 실행됨");
		String jpql = "update Prescription p set p.timeOver='Y' where p.prescriptionProcessTime <= :currentDateTime";
		Query query = em.createQuery(jpql);
		query.setParameter("currentDateTime", LocalDateTime.now());
		query.executeUpdate();
	}

//	@Scheduled(cron = "0 */1 * * * *") // 매 1분마다 실행
	@Scheduled(cron = "0 0 * * * *") //한 시간마다 실행
	@Transactional
	public void updateMeetingCompleted() {
		System.out.println("대면 완료 스케줄러 실행됨");
		String jpql = "update Prescription p set p.isCompleted='Y' where p.prescriptionCode = '대면' and p.prescriptionProcessTime <= :currentDateTime";
		Query query = em.createQuery(jpql);
		query.setParameter("currentDateTime", LocalDateTime.now());
		query.executeUpdate();
	}

}
