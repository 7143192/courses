package com.example.sportapp_backend.controller;

/*import com.example.sportapp_backend.entity.Record;
import com.example.sportapp_backend.entity.SingleRecord;
import com.example.sportapp_backend.service.MomentService;
import com.example.sportapp_backend.service.RecordService;
import org.influxdb.InfluxDB;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(RecordController.class)
@AutoConfigureMockMvc*/
class RecordControllerTest {
    /*@Autowired
    private MockMvc mockMvc;

    @MockBean
    private RecordService recordService;

    @MockBean
    private InfluxDB influxDB;

    private String getMethodName() {
        StackTraceElement[] stacktrace = Thread.currentThread().getStackTrace();
        StackTraceElement e = stacktrace[2];
        String methodName = e.getMethodName();
        return methodName;
    }

    @Test
    void insertRecord() throws Exception {
        SingleRecord s = new SingleRecord();
        s.setTime(1L);
        s.setLat(12f);
        s.setLng(12F);

        Record r = new Record(1,
                new Date(12333),
                new Date(12333),
                12,
                12f);

//        this.mockMvc.perform(get(
//                "/"+getMethodName())
////                .contentType(MediaType.APPLICATION_JSON)
//                        .param()
//                .content(String.valueOf(r))
//        ).andExpect(status().isOk());

    }

    @Test
    void getUserRecords() throws Exception {
        this.mockMvc.perform(get(
                "/"+getMethodName())
                .param("user_id", "1")
        ).andExpect(status().isOk());
    }

    @Test
    void getMaxId() throws Exception {
        this.mockMvc.perform(get(
                "/"+getMethodName())

        ).andExpect(status().isOk());
    }*/
}
