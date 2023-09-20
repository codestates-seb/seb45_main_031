package com.seb45_main_031.routine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class RoutineApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoutineApplication.class, args);
	}

}
