package com.asrai.joinit.Training;

import static org.junit.jupiter.api.Assertions.*;

import com.asrai.joinit.domain.Training;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class TrainingServiceTest {

    @Autowired
    private TrainingService trainingService;

    @Autowired
    private TrainingRepository trainingRepository;

    @Test
    public void testtest(){
        List<Training> temp = trainingRepository.findTrainingList(11);
        for (Training traing: temp
        ) {
            System.out.println(traing.toString());
        }


    }

    @Test
    public void testtest2(){
        List<JointTrainingMapping> temp = trainingRepository.findJointTrainingTypeList();
//        System.out.println(temp.get(0));
//
//        System.out.println(temp.get(0).getJointName());
        for (JointTrainingMapping jtm: temp
        ) {
            System.out.println(jtm.toString());
        }


    }

}