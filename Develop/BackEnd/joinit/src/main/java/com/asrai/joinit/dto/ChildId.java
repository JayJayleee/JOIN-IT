package com.asrai.joinit.dto;

import jakarta.persistence.Column;
import java.io.Serializable;
import lombok.Data;

@Data
public class ChildId implements Serializable {

//    @Column(name = "prescription_id")
    private int prescriptionId;
    private int sequence;

}