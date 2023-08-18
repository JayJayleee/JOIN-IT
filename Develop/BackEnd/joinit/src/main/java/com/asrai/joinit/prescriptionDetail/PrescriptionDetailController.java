package com.asrai.joinit.prescriptionDetail;

import com.asrai.joinit.domain.OnlineCoachingComment.OnlineCoachingCommentInputDto;
import com.asrai.joinit.domain.OnlineCoachingComment.OnlineCoachingCommentOutputDto;
import com.asrai.joinit.domain.OnlineCoachingImage.OnlineCoachingImageOutputDto;
import com.asrai.joinit.dto.CoachingPatientDto;
import com.asrai.joinit.exception.PrescriptionTypeException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/prescription")
@Slf4j
@RequiredArgsConstructor
public class PrescriptionDetailController {

    private final PrescriptionDetailService prescriptionDetailService;

//    @PostMapping
//    public ResponseEntity<String> createPrescription(){
//
//        return ResponseEntity.status(200).build();
//    }

    @GetMapping("/completeCoaching/{prescriptionId}")
    public ResponseEntity<Object> getCompleteCoaching(
        @PathVariable("prescriptionId") int prescriptionId) {
        Map<String, Object> result = new HashMap<>();
        try {

            result.put("result", prescriptionDetailService.getCompletedCoachingDetail(prescriptionId));
            return new ResponseEntity<>(result, HttpStatus.OK) ;
        } catch (PrescriptionTypeException e ){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST) ;
        }


    }

    @GetMapping("/detail/{prescriptionId}")
    public ResponseEntity<Object> getCompleteExercise(
        @PathVariable("prescriptionId") int prescriptionId) {
        Map<String, Object> result = new HashMap<>();
        try {

            result.put("result", prescriptionDetailService.getCompletedExerciseDetail(prescriptionId));
            return new ResponseEntity<>(result, HttpStatus.OK) ;
        } catch (PrescriptionTypeException e ){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST) ;
        }


    }
//
//    @GetMapping("/image/{prescriptionId}")
//    public Map<String, List<OnlineCoachingImageOutputDto>> findCoachingimages(
//        @PathVariable("prescriptionId") int prescriptionId
//
//    ) {
//        Map<String, List<OnlineCoachingImageOutputDto>> resultMap = new HashMap<>();
//        resultMap.put("imgList", prescriptionDetailService.findCoachingimages(prescriptionId));
//        return resultMap;
//
//    }
//
//    @PostMapping("/comment/{prescriptionId}")
//    public ResponseEntity<String> saveCoachingComment(
//        @PathVariable("prescriptionId") int prescriptionId,
//        @RequestBody List<OnlineCoachingCommentInputDto> onlineCoachingCommentList
//
//    ) {
//        try {
//            prescriptionDetailService.saveOnlineCoachingComment(onlineCoachingCommentList, prescriptionId);
//            return ResponseEntity.status(200).build();
//        } catch (PrescriptionTypeException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        } catch (Exception e) {
//            return ResponseEntity.status(500).build();
//        }
//
//
//    }
//
//    @GetMapping("/comment/{prescriptionId}")
//    public Map<String, List<OnlineCoachingCommentOutputDto>> findCoachingComment(
//        @PathVariable("prescriptionId") int prescriptionId
//
//    ) {
//        Map<String, List<OnlineCoachingCommentOutputDto>> resultMap = new HashMap<>();
//        resultMap.put("commentList", prescriptionDetailService.findOnlineCoachingComment(prescriptionId));
//        return resultMap;
//
//    }

}
