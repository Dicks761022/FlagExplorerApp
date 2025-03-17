package com.example.flagexplorerbackend.rest;

import com.baeldung.openapi.model.Country;
import com.example.flagexplorerbackend.service.RestCountriesService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest
class FlagExplorerControllerTest {

    @Mock
    RestCountriesService restCountriesService;

    @InjectMocks
    private FlagExplorerController flagExplorerController;

    @Test
    void testGetAllCountries() throws Exception {
        Mockito.when(restCountriesService.getCountryAttributes()).thenReturn(List.of(Map.of("commonName", "Russia", "population", 100000000, "region", "Europe", "capital", "Moscow", "flagUrl", "https://flagcdn.com/ru.svg")));
        ResponseEntity<List<Country>> response = flagExplorerController.countriesGet();
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals("Russia", response.getBody().get(0).getName());
        assertEquals(100000000, response.getBody().get(0).getPopulation());
        assertEquals("Europe", response.getBody().get(0).getRegion());
        assertEquals("Moscow", response.getBody().get(0).getCapital());
        assertEquals("https://flagcdn.com/ru.svg", response.getBody().get(0).getFlag());
    }

}