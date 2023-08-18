package com.asrai.joinit.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DailyAfterSurveyResult {

    private int sum;
    private int count;

    public void addSum(int value){
        this.sum += value;
        count++;
    }

    public double getValue(){
        return (double)sum/(double)count;

    }
}
