package com.asrai.joinit.Training;

import static org.junit.jupiter.api.Assertions.*;

import com.asrai.joinit.domain.Training;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class TrainingServiceTest {

	@Autowired TrainingService trainingService;
	@Autowired TrainingRepository trainingRepository;

	@Test
	public void 운동등록() throws Exception {
		Training training = new Training();
		training.setTrainingName("목 돌리기");
		training.setTrainingURL("https://www.youtube.com/watch?v=vvHZhhI9TdE");
		training.setStartPoint(1);
		training.setMiddlePoint(2);
		training.setEndPoint(3);
		training.setDifficulty(2);
		training.setDescription("목 돌리기 운동입니다.");
		int[] mappingIds = {10, 13};
		int saveId = trainingService.saveTraining(training, mappingIds);

//		assertEquals(training, adminRepository.findTrainingList());
		System.out.println(saveId);
	}

}