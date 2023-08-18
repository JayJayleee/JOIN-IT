package com.asrai.joinit.survey;

import com.asrai.joinit.coaching.CoachingRepository;
import com.asrai.joinit.domain.AfterSurvey.AfterSurveyDto;
import com.asrai.joinit.domain.BeforeSurvey.BeforeSurveyDto;
import com.asrai.joinit.dto.AfterSurveyStatisticsOutputDto;
import com.asrai.joinit.dto.BeforeSurveyStatisticsOutputDto;
import com.asrai.joinit.exception.NotYetAllocateException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/survey")
@RequiredArgsConstructor
@CrossOrigin("*")
@Slf4j
public class SurveyController {

    //RequeiredArgsConstructor로 생성자 주입
    private final SurveyService surveyService;


    //전 설문 등록
    @PostMapping(path = "/before", consumes = {MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public void createBeforeSurvey(
        @RequestPart(name = "beforeSurvey") BeforeSurveyDto beforeSurveyDto,
        @RequestPart(name = "beforeImgRoute",required = false) MultipartFile beforeImgRoute
    ) throws IOException {
        log.info("beforeImgRoute : {}", beforeImgRoute);
        log.info("beforeSurveyDto : {]", beforeSurveyDto);
        surveyService.createBeforeSurvey(beforeSurveyDto, beforeImgRoute);
    }


    //전 설문 조회
    //처방 데이터가 없으므로 더미 데이터 반환
    @GetMapping("/before/{prescriptionId}")
    public ResponseEntity<Object> findBeforeSurvey(@PathVariable("prescriptionId") int prescriptionId) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("result", surveyService.findBeforeSurvey(prescriptionId));
            return new ResponseEntity<>(result, HttpStatus.OK) ;
        } catch (NotYetAllocateException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST) ;
        }
    }

    //전 설문 통계 데이터 조회
    @GetMapping("/before/statistics/{treatmentId}")
    public ResponseEntity<Object> getBeforeSurveyStatistics(
        @PathVariable("treatmentId") int treatmentId) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("result", surveyService.findBeforeSurveyStatisticsByDay(treatmentId));
            return new ResponseEntity<>(result, HttpStatus.OK) ;
        } catch (NotYetAllocateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    //후 설문 등록
    @PostMapping("/after")
    public void createAfterSurvey(@RequestBody AfterSurveyDto afterSurveyDto) {

        surveyService.createAfterSurvey(afterSurveyDto);
    }

    //후 설문 조회
    @GetMapping("/after/{prescriptionId}")
    public ResponseEntity<Object> findAfterSurvey(@PathVariable("prescriptionId") int prescriptionId) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("result", surveyService.findAfterSurvey(prescriptionId));
            return new ResponseEntity<>(result, HttpStatus.OK) ;
        } catch (NotYetAllocateException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST) ;
        }
    }

    //후 설문 통계 조회
    @GetMapping("/after/statistics/{treatmentId}")
    public ResponseEntity<Object>  getAfterSurveyStatistics(
        @PathVariable("treatmentId") int treatmentId) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("result", surveyService.findAfterSurveyStatistics(treatmentId));
            return new ResponseEntity<>(result, HttpStatus.OK) ;
        } catch (NotYetAllocateException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST) ;
        }

    }

}
