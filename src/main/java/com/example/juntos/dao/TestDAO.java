package com.example.juntos.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.juntos.vo.TestVO;

import java.util.List;

@Repository
public class TestDAO {
    
    @Autowired
    private SqlSession sqlSession;

    private static String namespace = "com.example.juntos.dao.mapper.TestMapper";

    public List<TestVO> getUpKindList() throws Exception{
        return sqlSession.selectList(namespace + ".getUpKindList");
    }
}
