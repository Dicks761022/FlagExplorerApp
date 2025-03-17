package com.example.flagexplorerbackend.config;

import com.example.flagexplorerbackend.service.RestCountriesService;
import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FlagExplorerControllerCustomTestConfig {

    @Bean
    public RestCountriesService restCountriesService() {
        // Return a Mockito mock that will be injected into the controller
        return Mockito.mock(RestCountriesService.class);
    }
}
