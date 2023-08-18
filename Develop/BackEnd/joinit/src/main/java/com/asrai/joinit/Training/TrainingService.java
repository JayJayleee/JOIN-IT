package com.asrai.joinit.Training;

import com.asrai.joinit.dto.JointTrainingTypeMappingDto;
import com.asrai.joinit.dto.JointTrainingMappingDto;
import com.asrai.joinit.dto.TrainingInputDto;
import com.asrai.joinit.domain.JointTrainingType;
import com.asrai.joinit.domain.Training;
import com.asrai.joinit.domain.TrainingTypeTraining;
import com.asrai.joinit.dto.TrainingOutputDto;
import com.asrai.joinit.img.ImageService;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class TrainingService {

    //생성자 주입
    private final TrainingRepository trainingRepository;

    private final ImageService imageService;


    public int saveTraining(
        TrainingInputDto form,
        MultipartFile imageImgRoute,
        MultipartFile filterImgRoute,
        MultipartFile thumbnailImgRoute
    ) throws IOException {
        String imageImgRouteOriginalName = UUID.randomUUID() + "-" + imageImgRoute.getOriginalFilename();
        String filterImgRouteOriginalName = UUID.randomUUID() + "-" + filterImgRoute.getOriginalFilename();
        String thumbnailImgRouteOriginalName = UUID.randomUUID() + "-" + thumbnailImgRoute.getOriginalFilename();


        String imageImgRouteName = imageService.upload(imageImgRoute, imageImgRouteOriginalName);
        String filterImgRouteName = imageService.upload(filterImgRoute, filterImgRouteOriginalName);
        String thumbnailImgRouteName = imageService.upload(thumbnailImgRoute, thumbnailImgRouteOriginalName);

        Training training = new Training();
        training.setTrainingName(form.getTrainingName());
        training.setTrainingURL(form.getTrainingURL());
        training.setStartPoint(form.getStartPoint());
        training.setMiddlePoint(form.getMiddlePoint());
        training.setEndPoint(form.getEndPoint());
        training.setDifficulty(form.getDifficulty());
        training.setDescription(form.getDescription());
        training.setRom(form.getRom());
        training.setImageImgRoute(imageImgRouteName);
        training.setImageImgRouteOriginalName(imageImgRouteOriginalName);
        training.setFilterImgRoute(filterImgRouteName);
        training.setFilterImgRouteOriginalName(filterImgRouteOriginalName);
        training.setThumbnailImgRoute(thumbnailImgRouteName);
        training.setThumbnailImgRouteOriginalName(thumbnailImgRouteOriginalName);

        trainingRepository.saveTraining(training); //운동 객체 등록

        int[] mappingIds = form.getMappingIds();
        System.out.println(Arrays.toString(mappingIds));
        for (int id : mappingIds) {
            JointTrainingType jointTrainingType = trainingRepository.findJointTrainingType(
                id); //매핑id로 JointTrainingType(환부_운동종류) 조회

            TrainingTypeTraining trainingTypeTraining = new TrainingTypeTraining(); //TrainingTypeTraining(운동종류_운동) 객체 생성
            trainingTypeTraining.setTraining(training);
            trainingTypeTraining.setJointTrainingType(jointTrainingType);
            trainingRepository.saveTrainingTypeTraining(
                trainingTypeTraining); //TrainingTypeTraining 객체 등록
        }
        return training.getTrainingId();
    }
    //운동 등록

    @Transactional(readOnly = true)
    public List<Training> findTrainingList() {
        return trainingRepository.findTrainingList();
    }
    //운동 리스트 조회


    @Transactional(readOnly = true)
    public List<Training> findTrainingList(int mappingId) {
        return trainingRepository.findTrainingList(mappingId);

    }
    //환부_운동종류 선택 후 운동 조회

    @Transactional(readOnly = true)
    public List<JointTrainingMappingDto> findJointTrainingTypeList() {
        return trainingRepository.findJointTrainingTypeList();
    }
    //환부_운동 종류_매핑 리스트 조회

    @Transactional(readOnly = true)
    public TrainingOutputDto findTrainingDetail(int trainingId) {

        TrainingOutputDto trainingOutputDto = new TrainingOutputDto();
        Training training = trainingRepository.findTrainingDetail(trainingId);
        trainingOutputDto.setTrainingID(trainingId);
        trainingOutputDto.setTrainingURL(training.getTrainingURL());
        trainingOutputDto.setTrainingName(training.getTrainingName());
        trainingOutputDto.setDescription(training.getDescription());
        trainingOutputDto.setDifficulty(training.getDifficulty());
        trainingOutputDto.setStartPoint(training.getStartPoint());
        trainingOutputDto.setMiddlePoint(training.getMiddlePoint());
        trainingOutputDto.setEndPoint(training.getEndPoint());
        trainingOutputDto.setRom(training.getRom());
        trainingOutputDto.setFilterImgRoute(training.getFilterImgRoute());
        trainingOutputDto.setImageImgRoute(training.getImageImgRoute());
        trainingOutputDto.setThumbnailImgRoute(training.getThumbnailImgRoute());

//		System.out.println(trainingOutputDto);

        List<JointTrainingTypeMappingDto> list = trainingRepository.findTrainingJointTrainingType(
            trainingId);
        trainingOutputDto.setJointTrainingTypeMappingDtoList(list);

        return trainingOutputDto;
    }
    //운동 상세 조회


    //영송성에 따라 수정된 값은 자동으로 변경
    public void updateTraining(int trainingId, TrainingInputDto form, MultipartFile imageImgRoute,
        MultipartFile filterImgRoute, MultipartFile thumbnailImgRoute)
        throws IOException {
        Training findTraining = trainingRepository.findTrainingDetail(trainingId);

        findTraining.setTrainingName(form.getTrainingName());
        findTraining.setTrainingURL(form.getTrainingURL());
        findTraining.setStartPoint(form.getStartPoint());
        findTraining.setMiddlePoint(form.getMiddlePoint());
        findTraining.setEndPoint(form.getEndPoint());
        findTraining.setDifficulty(form.getDifficulty());
        findTraining.setDescription(form.getDescription());
        findTraining.setRom(form.getRom());



        //gif 이미지 변경 시
        if (imageImgRoute != null) {
            //기존 이미지 삭제
            String imageImgRoute1 = findTraining.getImageImgRouteOriginalName();
            if (imageService.isExistedFile(imageImgRoute1)) {
                imageService.deleteFile(imageImgRoute1);
            } else {
                System.out.println("gif 없음");
            }

            //새로운 이미지로 변경
            String imageImgRouteOriginalName = UUID.randomUUID() + "-" + imageImgRoute.getOriginalFilename();
            String imageImgRouteName = imageService.upload(imageImgRoute, imageImgRouteOriginalName);
            findTraining.setImageImgRoute(imageImgRouteName);
            findTraining.setImageImgRouteOriginalName(imageImgRouteOriginalName);
        }

        //필터 이미지 변경시
        if (filterImgRoute != null) {
            //기존 이미지 삭제
            String filterImgRoute1 = findTraining.getFilterImgRouteOriginalName();
            if (imageService.isExistedFile(filterImgRoute1)) {
                imageService.deleteFile(filterImgRoute1);
            } else {
                System.out.println("필터 없음");
            }
            //새로운 이미지로 변경
            String filterImgRouteOriginalName = UUID.randomUUID() + "-" + filterImgRoute.getOriginalFilename();
            String filterImgRouteName = imageService.upload(filterImgRoute, filterImgRouteOriginalName);
            findTraining.setFilterImgRoute(filterImgRouteName);
            findTraining.setFilterImgRouteOriginalName(filterImgRouteOriginalName);
        }

        //썸네일 이미지 변경시
        if (thumbnailImgRoute != null) {
            //기존 이미지 삭제
            String thumbnailImgRoute1 = findTraining.getThumbnailImgRouteOriginalName();
            if (imageService.isExistedFile(thumbnailImgRoute1)) {
                imageService.deleteFile(thumbnailImgRoute1);
            } else {
                System.out.println("썸네일 없음");
            }
            //새로운 이미지로 변경
            String thumbnailImgRouteOriginalName = UUID.randomUUID() + "-" + thumbnailImgRoute.getOriginalFilename();
            String thumbnailImgRouteName = imageService.upload(thumbnailImgRoute, thumbnailImgRouteOriginalName);
            findTraining.setThumbnailImgRoute(thumbnailImgRouteName);
            findTraining.setThumbnailImgRouteOriginalName(thumbnailImgRouteOriginalName);
        }

        //TrainingTypeTraining 데이터 삭제
        for (int i = 0; i < findTraining.getTrainingTypeTrainings().size(); i++) {
            TrainingTypeTraining ttt = new TrainingTypeTraining();
            ttt.setJointTrainingType(
                findTraining.getTrainingTypeTrainings().get(i).getJointTrainingType());
            ttt.setTraining(findTraining);
            trainingRepository.deleteTrainingTypeTraining(ttt);
        }

        int[] mappingIds = form.getMappingIds();

        //TrainingTypeTraining 데이터 추가
        for (int id : mappingIds) {
            //찾아서 수정해주는 로직
            JointTrainingType jointTrainingType = trainingRepository.findJointTrainingType(id);
            TrainingTypeTraining trainingTypeTraining = new TrainingTypeTraining();
            trainingTypeTraining.setTraining(findTraining);
            trainingTypeTraining.setJointTrainingType(jointTrainingType);
            trainingRepository.saveTrainingTypeTraining(trainingTypeTraining);
        }

    }
    //운동 수정


    public void deleteTrainingImage(int trainingId) {
        List<TrainingTypeTraining> ttt = trainingRepository.findTrainingTypeTrainingList(
            trainingId);
        for (int i = 0; i < ttt.size(); i++) {
            trainingRepository.deleteTrainingTypeTraining(ttt.get(i));
        }

        Training findTraining = trainingRepository.findTrainingDetail(trainingId);

        //기존 이미지 삭제
        String imageImgRoute1 = findTraining.getImageImgRouteOriginalName();
        System.out.println(imageImgRoute1);
        if (imageService.isExistedFile(imageImgRoute1)) {
            imageService.deleteFile(imageImgRoute1);
        } else {
            System.out.println("파일 없음..");
        }

        //기존 이미지 삭제
        String filterImgRoute1 = findTraining.getFilterImgRouteOriginalName();
        System.out.println(filterImgRoute1);
        if (imageService.isExistedFile(filterImgRoute1)) {
            imageService.deleteFile(filterImgRoute1);
        } else {
            System.out.println("파일 없음..");
        }

        //기존 이미지 삭제
        String thumbnailImgRoute1 = findTraining.getThumbnailImgRouteOriginalName();
        System.out.println(thumbnailImgRoute1);
        if (imageService.isExistedFile(thumbnailImgRoute1)) {
            imageService.deleteFile(thumbnailImgRoute1);
        } else {
            System.out.println("파일 없음..");
        }

        trainingRepository.deleteTraining(trainingId);
    }
    //운동 삭제

}
