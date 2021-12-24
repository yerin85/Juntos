package com.example.juntos.service;

import com.example.juntos.dao.TestDAO;
import com.example.juntos.vo.TestVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestServiceImpl implements TestService{
    
    @Autowired
    private TestDAO testDAO;

    @Override
    public List<TestVO> getUpKindList() throws Exception {
        return testDAO.getUpKindList();
    }

    @Override
    public List<TestVO> getSidoList() throws Exception {
        return testDAO.getSidoList();
    }
}
