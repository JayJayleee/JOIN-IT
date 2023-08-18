package com.asrai.joinit.survey;

import com.asrai.joinit.coaching.CoachingRepository;
import com.asrai.joinit.domain.AfterSurvey;
import com.asrai.joinit.domain.AfterSurvey.AfterSurveyDto;
import com.asrai.joinit.domain.BeforeSurvey;
import com.asrai.joinit.domain.BeforeSurvey.BeforeSurveyDto;
import com.asrai.joinit.domain.Prescription;
import com.asrai.joinit.domain.Treatment;
import com.asrai.joinit.dto.AfterSurveyStatisticsOutputDto;
import com.asrai.joinit.dto.AfterSurveyStatisticsSourceDto;
import com.asrai.joinit.dto.BeforeSurveyStatisticsOutputDto;
import com.asrai.joinit.dto.BeforeSurveyStatisticsSourceDto;
import com.asrai.joinit.dto.DailyAfterSurveyResult;
import com.asrai.joinit.dto.DailyAfterSurveyValue;
import com.asrai.joinit.exception.NotYetAllocateException;
import com.asrai.joinit.img.ImageService;
import com.asrai.joinit.treatment.TreatmentRepository;
import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class SurveyService {

	//생성자 주입
	private final SurveyRepository surveyRepository;

	private final ImageService imageService;

//	private final BeforeSurveyRepository beforeSurveyRepository;

	private final TreatmentRepository treatmentRepository;

	private final CoachingRepository coachingRepository;

	//전 설문 입력
	@Transactional
	public void createBeforeSurvey(BeforeSurveyDto beforeSurveyDto, MultipartFile beforeImgRoute)
		throws IOException {

		log.info("beforeImgRoute : {}", beforeImgRoute);
		log.info("beforeSurveyDto : {]", beforeSurveyDto);

		String beforeImgRouteOriginalName = UUID.randomUUID() + "-" + beforeImgRoute.getOriginalFilename();

		String imageImgRouteName = imageService.upload(beforeImgRoute, beforeImgRouteOriginalName);


		Optional<Prescription> prescriptionOptional = coachingRepository.findById(beforeSurveyDto.getPrescriptionId());

		if(prescriptionOptional.isEmpty()){

		}

		Prescription prescription = prescriptionOptional.get();
//		prescription.setPrescriptionId(beforeSurveyDto.getPrescriptionId());

		BeforeSurvey beforeSurvey = new BeforeSurvey();
		beforeSurvey.setPrescription(prescription);

		if(prescription.getTraining().getRom() < beforeSurveyDto.getAngle()){
			beforeSurveyDto.setAngle(prescription.getTraining().getRom());
		}

		if(beforeSurveyDto.getAngle() < 0){
			beforeSurveyDto.setAngle(0);
		}

		beforeSurvey.setAngle(beforeSurveyDto.getAngle());
		beforeSurvey.setBeforeImgRoute(imageImgRouteName);

		surveyRepository.createBeforeSurvey(beforeSurvey);
	}

	//전 설문 조회
	public BeforeSurveyDto findBeforeSurvey(int prescriptionId){
		BeforeSurveyDto beforeSurveyOutputDto = new BeforeSurveyDto();

		BeforeSurvey beforeSurvey = surveyRepository.findBeforeSurvey(prescriptionId);

		if(beforeSurvey == null){
			throw new NotYetAllocateException("존재하지 않는 처방입니다.");
		}

		beforeSurveyOutputDto.setPrescriptionId(beforeSurvey.getPrescription().getPrescriptionId());
		beforeSurveyOutputDto.setBeforeImgRoute(beforeSurvey.getBeforeImgRoute());
		beforeSurveyOutputDto.setAngle(beforeSurveyOutputDto.getAngle());
		return beforeSurveyOutputDto;

	}




	//전 설문 통계 데이터 조회
	public List<BeforeSurveyStatisticsOutputDto>  findBeforeSurveyStatisticsByDay(int treatmentId){

		//통계 row 데이터 획득
		List<BeforeSurveyStatisticsSourceDto> list = surveyRepository.findBeforeSurveyStatistics(treatmentId);

		for (BeforeSurveyStatisticsSourceDto b: list
		) {
			System.out.println(b.getSurveyDate());
		}

		//통계를 Timestamp 기반으로 map 저장
		HashMap<LocalDate, List<BeforeSurveyStatisticsOutputDto>> resultTempMap = new HashMap<>() ;

		List<LocalDate> keyList = new ArrayList<>();

		//row 데이터를 순회하며 Timestamp 별로 daliy data 를 저장
		for(int i = 0; i < list.size(); i++){
			BeforeSurveyStatisticsSourceDto current_source = list.get(i);
			LocalDate date = current_source.getSurveyDate();
			BeforeSurveyStatisticsOutputDto beforeSurveyStatisticsOutputDto = new BeforeSurveyStatisticsOutputDto();

			beforeSurveyStatisticsOutputDto.setAngle(current_source.getAngle());
			beforeSurveyStatisticsOutputDto.setRom(current_source.getRom());
			beforeSurveyStatisticsOutputDto.setTargetAngle(current_source.getTargetAngle());

			//이미 있는 trainingId는 해당 training 에 일별 데이터만 추가
			if(resultTempMap.containsKey(date)){
				resultTempMap.get(date).add(beforeSurveyStatisticsOutputDto);

				//새로운 trainingId
			} else {

				keyList.add(date);

				//전체 객체 생성
				List<BeforeSurveyStatisticsOutputDto> beforeSurveyStatisticsOutputDto1 = new ArrayList<>();

				beforeSurveyStatisticsOutputDto1.add(beforeSurveyStatisticsOutputDto);

				//맵에 추가
				resultTempMap.put(date, beforeSurveyStatisticsOutputDto1);
			}
		}

		List<BeforeSurveyStatisticsOutputDto> resultList = new ArrayList<>();

//		//output list 생성
//		List<BeforeSurveyStatisticsOutputDto> resultList = new ArrayList<>();
		for (int i = 0; i < resultTempMap.size(); i++){
//			HashMap<LocalDate, BeforeSurveyStatisticsOutputDto> resultMap = new HashMap<>() ;
			BeforeSurveyStatisticsOutputDto beforeSurveyStatisticsOutputDto = new BeforeSurveyStatisticsOutputDto();
			beforeSurveyStatisticsOutputDto.setDate(keyList.get(i));
			double rom = 0;
			double targetAngle = 0;
			double angle = 0;
			System.out.println(keyList.get(i));
			for (int j = 0; j < resultTempMap.get(keyList.get(i)).size(); j ++){
				rom += resultTempMap.get(keyList.get(i)).get(j).getRom();
				targetAngle += resultTempMap.get(keyList.get(i)).get(j).getTargetAngle();
				angle += resultTempMap.get(keyList.get(i)).get(j).getAngle();

			}
			rom = rom/resultTempMap.get(keyList.get(i)).size();
			targetAngle = targetAngle/resultTempMap.get(keyList.get(i)).size();
			angle = angle/resultTempMap.get(keyList.get(i)).size();

			double targetAngleVersisRom = targetAngle/rom*100;
			double angleVersisRom = angle/rom*100;

			beforeSurveyStatisticsOutputDto.setTargetAngle(targetAngleVersisRom);
			beforeSurveyStatisticsOutputDto.setAngle(angleVersisRom);
//			beforeSurveyStatisticsOutputDto.setRom(rom);
//			resultMap.put(keyList.get(i),beforeSurveyStatisticsOutputDto);
			resultList.add(beforeSurveyStatisticsOutputDto);
//			//모든 id 를 조회하며 데이터를 꺼냄
//			resultList.add(resultTempMap.get(trainingIdList.get(i)));
		}

		return resultList;


	}


	//후 설문 입력
	@Transactional
	public void createAfterSurvey(AfterSurveyDto afterSurveyDto){

		Prescription prescription = new Prescription();
		prescription.setPrescriptionId(afterSurveyDto.getPrescriptionId());

		AfterSurvey afterSurvey = new AfterSurvey();
		afterSurvey.setPrescription(prescription);
		afterSurvey.setDifficulty(afterSurveyDto.getDifficulty());
		afterSurvey.setPainRelief(afterSurveyDto.getPainRelief());
		afterSurvey.setSatisfaction(afterSurveyDto.getSatisfaction());
		afterSurvey.setPainDegree(afterSurveyDto.getPainDegree());
		afterSurvey.setEtc(afterSurveyDto.getEtc());

		surveyRepository.createAfterSurvey(afterSurvey);
	}

	//후 설문 조회
	public AfterSurveyDto findAfterSurvey(int prescriptionId){
		AfterSurvey afterSurvey = surveyRepository.findAfterSurvey(prescriptionId);

		if(afterSurvey == null){
			throw new NotYetAllocateException("존재하지 않는 처방입니다.");
		}

		AfterSurveyDto afterSurveyOutputDto = new AfterSurveyDto();
		afterSurveyOutputDto.setPrescriptionId(afterSurvey.getPrescription().getPrescriptionId());
		afterSurveyOutputDto.setDifficulty(afterSurvey.getDifficulty());
		afterSurveyOutputDto.setSatisfaction(afterSurvey.getSatisfaction());
		afterSurveyOutputDto.setPainDegree(afterSurvey.getPainDegree());
		afterSurveyOutputDto.setPainRelief(afterSurvey.getPainRelief());
		afterSurveyOutputDto.setEtc(afterSurvey.getEtc());
		return afterSurveyOutputDto;

	}


	//후 설문 통계 데이터 조회
	public List<AfterSurveyStatisticsOutputDto> findAfterSurveyStatistics(int treatmentId){

		List<AfterSurveyStatisticsOutputDto> resultList = new ArrayList<>();

		//통계 row 데이터 획득
		List<AfterSurveyStatisticsSourceDto> list = surveyRepository.findAfterSurveyStatistics(treatmentId);

		HashMap<String, DailyAfterSurveyResult> dailyPainDegree = new HashMap<>();
		HashMap<String, DailyAfterSurveyResult> dailyDifficulty = new HashMap<>();
		HashMap<String, DailyAfterSurveyResult> dailySatisfaction = new HashMap<>();
		HashMap<String, DailyAfterSurveyResult> dailyPainRelief = new HashMap<>();

		List<String> keyList = new ArrayList<>();

		for (AfterSurveyStatisticsSourceDto afterSurveyStatisticsSourceDto: list
		) {
			long time = afterSurveyStatisticsSourceDto.getPrescriptionProcessTime().getTime();
			Date date = new Date(time);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String key = sdf.format(date);

			//이미 해당 날짜에 값이 존재함
			if(dailyPainDegree.containsKey(key)){
				dailyPainDegree.get(key).addSum(afterSurveyStatisticsSourceDto.getPainDegree());
				dailyDifficulty.get(key).addSum(afterSurveyStatisticsSourceDto.getDifficulty());
				dailySatisfaction.get(key).addSum(afterSurveyStatisticsSourceDto.getSatisfaction());
				dailyPainRelief.get(key).addSum(afterSurveyStatisticsSourceDto.getPainRelief());
			} else {	//새로운 날짜
				keyList.add(key);
				dailyPainDegree.put(key, new DailyAfterSurveyResult(afterSurveyStatisticsSourceDto.getPainDegree(), 1));
				dailyDifficulty.put(key, new DailyAfterSurveyResult(afterSurveyStatisticsSourceDto.getDifficulty(), 1));
				dailySatisfaction.put(key, new DailyAfterSurveyResult(afterSurveyStatisticsSourceDto.getSatisfaction(), 1));
				dailyPainRelief.put(key, new DailyAfterSurveyResult(afterSurveyStatisticsSourceDto.getPainRelief(), 1));
			}
		}

		AfterSurveyStatisticsOutputDto painDegree = new AfterSurveyStatisticsOutputDto("painDegree", new ArrayList<>());
		AfterSurveyStatisticsOutputDto difficulty = new AfterSurveyStatisticsOutputDto("difficulty", new ArrayList<>());
		AfterSurveyStatisticsOutputDto satisfaction = new AfterSurveyStatisticsOutputDto("satisfaction", new ArrayList<>());
		AfterSurveyStatisticsOutputDto painRelief = new AfterSurveyStatisticsOutputDto("painRelief", new ArrayList<>());


		for (String key: keyList
		) {
			painDegree.getDate().add(new DailyAfterSurveyValue(key, dailyPainDegree.get(key).getValue()));
			difficulty.getDate().add(new DailyAfterSurveyValue(key, dailyDifficulty.get(key).getValue()));
			satisfaction.getDate().add(new DailyAfterSurveyValue(key, dailySatisfaction.get(key).getValue()));
			painRelief.getDate().add(new DailyAfterSurveyValue(key, dailyPainRelief.get(key).getValue()));
		}

		resultList.add(painDegree);
		resultList.add(difficulty);
		resultList.add(satisfaction);
		resultList.add(painRelief);

		return resultList;


	}
}
