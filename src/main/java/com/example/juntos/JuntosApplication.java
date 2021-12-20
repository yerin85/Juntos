package com.example.juntos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import org.mybatis.spring.annotation.MapperScan;


@SpringBootApplication
@MapperScan(basePackages = "com.example.juntos")
public class JuntosApplication {

	public static void main(String[] args) {
		SpringApplication.run(JuntosApplication.class, args);
	}


}
