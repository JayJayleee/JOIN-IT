package com.asrai.joinit.joint;

import com.asrai.joinit.domain.Joint;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/joint")
@RequiredArgsConstructor
public class JointController {

	private final JointService  jointService;

	@GetMapping
	public List<Joint> getJointList() {
//		return null;
		return jointService.findJointList();
	}
	//환부 전체 리스트 조회

}
