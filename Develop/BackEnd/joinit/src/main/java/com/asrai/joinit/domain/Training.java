package com.asrai.joinit.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "training")
@Getter @Setter
public class Training {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "training_id")
	private int trainingId;

	@Column(name = "training_name", nullable = false)
	private String trainingName;

	@Column(name = "training_URL", nullable = false)
	private String trainingURL;

	@Column(name = "start_point", nullable = false)
	private int startPoint;

	@Column(name = "middle_point", nullable = false)
	private int middlePoint;

	@Column(name = "end_point", nullable = false)
	private int endPoint;

	@Column(nullable = false)
	private int difficulty;

	@Column(nullable = false)
	private String description;

	@Column(nullable = false)
	private double rom;

	@OneToMany(mappedBy = "training")
	@JsonIgnore
	private List<TrainingTypeTraining> trainingTypeTrainings = new ArrayList<>();

	@Column(name = "thumbnail_img_route")
	private String thumbnailImgRoute;

	@Column(name = "thumbnail_img_route_original_name")
	private String thumbnailImgRouteOriginalName;

	@Column(name = "filter_img_route")
	private String filterImgRoute;

	@Column(name = "filter_img_route_original_name")
	private String filterImgRouteOriginalName;

	@Column(name = "image_img_route")
	private String imageImgRoute;

	@Column(name = "image_img_route_original_name")
	private String imageImgRouteOriginalName;


}
