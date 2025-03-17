package com.example.flagexplorerbackend.rest;

import com.example.flagexplorerbackend.config.FlagExplorerControllerCustomTestConfig;
import com.example.flagexplorerbackend.service.RestCountriesService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Map;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ContextConfiguration(classes = FlagExplorerControllerCustomTestConfig.class) // Custom test context
@WebMvcTest(FlagExplorerController.class)
class FlagExplorerControllerTest {

    private final MockMvc mockMvc;
    private final RestCountriesService mockRestCountriesService;

    FlagExplorerControllerTest(MockMvc mockMvc, RestCountriesService restCountriesService) {
        this.mockMvc = mockMvc;
        this.mockRestCountriesService = restCountriesService;
    }

    @Test
    void testCountriesGet() throws Exception {
        // Mock the service response
        List<Map<String, Object>> mockResponse = List.of(
                Map.of(
                        "commonName", "Canada",
                        "capital", "Ottawa",
                        "flagUrl", "https://flagcdn.com/w320/ca.png",
                        "population", 38000000
                ),
                Map.of(
                        "commonName", "Germany",
                        "capital", "Berlin",
                        "flagUrl", "https://flagcdn.com/w320/de.png",
                        "population", 83000000
                )
        );

        // Mock the behavior of your service
        Mockito.when(mockRestCountriesService.getCountryAttributes()).thenReturn(mockResponse);

        // Perform and validate the request
        mockMvc.perform(get("/api/v1/countries")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].commonName", is("Canada")))
                .andExpect(jsonPath("$[0].capital", is("Ottawa")))
                .andExpect(jsonPath("$[0].flagUrl", is("https://flagcdn.com/w320/ca.png")))
                .andExpect(jsonPath("$[0].population", is(38000000)));
    }

    @Test
    void testCountriesNameGet() throws Exception {
        // Mock the service response
        Map<String, Object> mockResponse = Map.of(
                "commonName", "Canada",
                "capital", "Ottawa",
                "flagUrl", "https://flagcdn.com/w320/ca.png",
                "population", 38000000
        );

        // Mock the behavior of your service
        Mockito.when(mockRestCountriesService.getCountryByName("Canada")).thenReturn(mockResponse);

        // Perform and validate the request
        mockMvc.perform(get("/api/v1/countries/Canada")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.commonName", is("Canada")))
                .andExpect(jsonPath("$.capital", is("Ottawa")))
                .andExpect(jsonPath("$.flagUrl", is("https://flagcdn.com/w320/ca.png")))
                .andExpect(jsonPath("$.population", is(38000000)));
    }
}