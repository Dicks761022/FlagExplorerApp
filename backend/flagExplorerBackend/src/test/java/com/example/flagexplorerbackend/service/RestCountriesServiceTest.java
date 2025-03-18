package com.example.flagexplorerbackend.service;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootTest
class RestCountriesServiceTest {

    @Mock
    WebClient webClient;

    @InjectMocks
    private RestCountriesService restCountriesService;

    @Test
    void testGetAllCountries() throws Exception {
        Mockito.when(webClient.get()
                .retrieve()
                .bodyToMono(String.class)
                .block()).thenReturn(

        );

    }

}