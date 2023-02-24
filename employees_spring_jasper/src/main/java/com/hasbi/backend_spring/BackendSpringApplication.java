package com.hasbi.backend_spring;

import com.hasbi.backend_spring.entities.Employee;
import com.hasbi.backend_spring.repositories.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendSpringApplication.class, args);
    }

    @Bean
    CommandLineRunner start(EmployeeRepository employeeRepository){
        return args -> {
            employeeRepository.save(new Employee(null, "Fatima Zahra", "hasbi.fatimazahra@gmail.com", 20000));
            employeeRepository.save(new Employee(null, "Hasnaa", "hasnaa@gmail.com", 30000));
            employeeRepository.save(new Employee(null, "Achraf", "achraf@gmail.com", 10000));
            employeeRepository.save(new Employee(null, "Halima", "halima@gmail.com", 40000));
            employeeRepository.save(new Employee(null, "Noureddine", "noureddine@gmail.com", 22000));
            employeeRepository.save(new Employee(null, "Hamza", "hamza@gmail.com", 20000));
            employeeRepository.save(new Employee(null, "Meryem", "meryem@gmail.com", 30000));
        };
    }

}
