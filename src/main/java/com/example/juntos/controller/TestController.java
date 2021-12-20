package com.example.juntos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.juntos.vo.TestVO;
import com.example.juntos.service.TestService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private TestService testService;

    @GetMapping("/test")
    public String test(){
        return "this is test";
    }

    @RequestMapping(value="/test2", method = RequestMethod.GET)
    public List<TestVO> getTest() throws Exception{
        return testService.getTestList();
    }
}
