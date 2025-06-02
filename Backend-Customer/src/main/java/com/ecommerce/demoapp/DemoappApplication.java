package com.ecommerce.demoapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.ecommerce.demoapp")
public class DemoappApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoappApplication.class, args);
    }
}
