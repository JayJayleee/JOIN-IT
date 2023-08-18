package com.asrai.joinit.coaching;

import com.asrai.joinit.domain.OnlineCoachingComment.OnlineCoachingCommentInputDto;
import com.asrai.joinit.domain.OnlineCoachingComment.OnlineCoachingCommentOutputDto;
import com.asrai.joinit.domain.OnlineCoachingImage.OnlineCoachingImageOutputDto;
import com.asrai.joinit.exception.NotYetAllocateException;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/coaching")
@Slf4j
@RequiredArgsConstructor
public class CoachingController {

    private final CoachingService coachingService;


    @GetMapping("/therapist/{prescriptionId}")
    public ResponseEntity<Object> getCoachingForTherapist(
        @PathVariable("prescriptionId") int prescriptionId) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("result", coachingService.getCoachingDataForTherapist(prescriptionId));
            return new ResponseEntity<>(result, HttpStatus.OK) ;
        } catch (NotYetAllocateException | PrescriptionTypeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST) ;
        }

    }

    @GetMapping("/patient/{prescriptionId}")
    public ResponseEntity<Object> getCoachingForPatient(
        @PathVariable("prescriptionId") int prescriptionId) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("result", coachingService.getCoachingDataForPatient(prescriptionId));
            return new ResponseEntity<>(result, HttpStatus.OK) ;
        } catch (NotYetAllocateException | PrescriptionTypeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST) ;
        }

    }

    @GetMapping("/isStart/{prescriptionId}")
    public ResponseEntity<Object> getCoachingIsStart(
        @PathVariable("prescriptionId") int prescriptionId) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("result", coachingService.getCoachingIsStart(prescriptionId));
            return new ResponseEntity<>(result, HttpStatus.OK) ;
        } catch (NotYetAllocateException | PrescriptionTypeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST) ;
        }

    }

    @PostMapping("/image/{prescriptionId}")
    public ResponseEntity<Object> saveCoachingImage(
        @PathVariable("prescriptionId") int prescriptionId,
        @RequestParam("files") List<MultipartFile> files
    ) {
        Map<String, Object> result = new HashMap<>();
        try {
            for (MultipartFile f:files
            ) {
                log.info(f.getOriginalFilename());
            }
            coachingService.saveCoachingImage(files, prescriptionId);
            result.put("result", "success");
            return new ResponseEntity<>(result,HttpStatus.OK);
        } catch (NotYetAllocateException | PrescriptionTypeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            return ResponseEntity.status(500).build();
        }


    }

    @GetMapping("/image/{prescriptionId}")
    public Map<String, List<OnlineCoachingImageOutputDto>> findCoachingimages(
        @PathVariable("prescriptionId") int prescriptionId

    ) {
        Map<String, List<OnlineCoachingImageOutputDto>> resultMap = new HashMap<>();
        resultMap.put("imgList", coachingService.findCoachingimages(prescriptionId));
        return resultMap;

    }

    @PostMapping("/comment/{prescriptionId}")
    public ResponseEntity<String> saveCoachingComment(
        @PathVariable("prescriptionId") int prescriptionId,
        @RequestBody List<OnlineCoachingCommentInputDto> onlineCoachingCommentList

    ) {
        try {
            coachingService.saveOnlineCoachingComment(onlineCoachingCommentList, prescriptionId);
            return ResponseEntity.status(200).build();
        } catch (NotYetAllocateException | PrescriptionTypeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }


    }

    @GetMapping("/comment/{prescriptionId}")
    public Map<String, List<OnlineCoachingCommentOutputDto>> findCoachingComment(
        @PathVariable("prescriptionId") int prescriptionId

    ) {
        Map<String, List<OnlineCoachingCommentOutputDto>> resultMap = new HashMap<>();
        resultMap.put("commentList", coachingService.findOnlineCoachingComment(prescriptionId));
        return resultMap;

    }

    @PostMapping("/video/{prescriptionId}")
    public ResponseEntity<Object> saveOnlineCoachingVideo(
        @PathVariable("prescriptionId") int prescriptionId,
//        @RequestPart(name = "content", required = false) String content,
        @RequestPart(name = "videoRoute", required = false) MultipartFile file
    ) {
//        log.info(content);
        Map<String, Object> result = new HashMap<>();
        try {
            coachingService.setOnlineCoachingVideo(file, prescriptionId);
            result.put("result", file.getOriginalFilename());
            return new ResponseEntity<>(result,HttpStatus.OK);
        } catch (NotYetAllocateException | PrescriptionTypeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/video/test")
    public ResponseEntity<String> saveOnlineCoachingVideo11(
        @RequestPart(name = "content", required = false) String content,
        @RequestPart(name = "videoRoute", required = false) MultipartFile file
    ) {
        log.info(content);
        log.info(file.getOriginalFilename());
//        try {
//            coachingService.setOnlineCoachingVideo(file, prescriptionId);
            return ResponseEntity.status(200).build();
//        } catch (PrescriptionTypeException e){
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        } catch (Exception e){
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
    }

}
