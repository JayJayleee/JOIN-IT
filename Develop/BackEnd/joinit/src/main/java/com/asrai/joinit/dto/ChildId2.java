package com.asrai.joinit.dto;

import java.io.Serializable;
import lombok.Data;

@Data
public class ChildId2 implements Serializable {

//    @Column(name = "prescription_id")
    private int prescriptionId;
    private int sequence;

}