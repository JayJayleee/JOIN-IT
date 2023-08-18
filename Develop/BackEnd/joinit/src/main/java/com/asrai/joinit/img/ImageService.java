package com.asrai.joinit.img;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectResult;
import java.io.IOException;
import java.net.URL;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageService {

	private static String bucketName = "asrai-bucket";
//	private final AmazonS3Client amazonS3Client;
	private final AmazonS3 amazonS3;
//	private final ImageRepository imageRepository;

//	@Transactional
//	public List<String> saveImages(ImageSaveDto saveDto) {
//		List<String> resultList = new ArrayList<>();
//
//		for(MultipartFile multipartFile : saveDto.getImages()) {
//			String value = saveImage(multipartFile);
//			resultList.add(value);
//		}
//
//		return resultList;
//	}

	@Transactional
	public String upload(MultipartFile multipartFile, String s3FileName) throws IOException {

		ObjectMetadata objMetadata = new ObjectMetadata();
		objMetadata.setContentLength(multipartFile.getInputStream().available());

		PutObjectResult putObjectResult = amazonS3.putObject(bucketName, s3FileName, multipartFile.getInputStream(), objMetadata);


		//		putObjectResult.


		return amazonS3.getUrl(bucketName, s3FileName).toString();
	}

	public String getImageUrl(String s3FileName) {
//		Member member = memberService.findMember(memberId);

		URL url = amazonS3.getUrl(bucketName, s3FileName);

		return url.toString();
	}

	public boolean isExistedFile(String keyName){
		return amazonS3.doesObjectExist(bucketName, keyName);

	}

	public void deleteFile(String keyName) {
		amazonS3.deleteObject(bucketName, keyName);

	}

}
