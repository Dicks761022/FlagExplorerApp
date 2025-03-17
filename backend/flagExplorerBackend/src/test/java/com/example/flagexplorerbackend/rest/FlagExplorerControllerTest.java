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
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest
class FlagExplorerControllerTest {

    @Mock
    RestCountriesService restCountriesService;

    @InjectMocks
    private FlagExplorerController flagExplorerController;

    @Test
    void testGetAllCountries() throws Exception {
        Mockito.when(restCountriesService.getCountryAttributes()).thenReturn(List.of(Map.of("name", "Russia", "population", 100000000, "region", "Europe", "capital", "Moscow", "flag", "https://flagcdn.com/ru.svg")));
        ResponseEntity<List<Country>> response = flagExplorerController.countriesGet();
        assertNotNull(response.getBody());
    }

}