package com.example.juntos.service;

import com.example.juntos.vo.TestVO;

import java.util.List;

public interface TestService {
    public List<TestVO> getUpKindList() throws Exception;
    
    public List<TestVO> getSidoList() throws Exception;
}
