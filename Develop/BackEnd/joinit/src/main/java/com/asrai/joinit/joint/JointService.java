package com.asrai.joinit.joint;

import com.asrai.joinit.domain.Joint;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class JointService {

	private final JointRepository jointRepository;
	//생성자 주입

	public List<Joint> findJointList() {
		return jointRepository.findJointList();
	}
	//환부 리스트 전체 조회

}
