package com.asrai.joinit.img;

import java.io.IOException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class ImageController {

	private final ImageService imageService;

	@PostMapping("/upload")
	public String uploadFile(@RequestParam("images") MultipartFile multipartFile) throws IOException {

		String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();
		return imageService.upload(multipartFile, s3FileName);
	}

	@GetMapping
	public String getImageUrl(){
		return imageService.getImageUrl("8fbccaa7-1186-42c0-918a-0bfaa3f0a2b6-운동_중화질.gif");

	}


}
