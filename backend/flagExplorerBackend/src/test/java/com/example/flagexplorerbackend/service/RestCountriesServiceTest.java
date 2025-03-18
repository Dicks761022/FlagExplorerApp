package com.example.flagexplorerbackend.service;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class RestCountriesServiceTest {
    @Mock
    private RestCountriesService restCountriesService;

    @Test
    void testGetCountryAttributes() throws Exception {
        Mockito.when(restCountriesService.getCountryAttributes()).thenReturn(List.of(Map.of("name", "Russia", "population", 100000000, "region", "Europe", "capital", "Moscow", "flag", "https://flagcdn.com/ru.svg")));
        List<Map<String, Object>> countries = restCountriesService.getCountryAttributes();
        assertNotNull(countries);
        assertEquals(1, countries.size());
        assertEquals("Russia", countries.get(0).get("name"));
        assertEquals(100000000, countries.get(0).get("population"));
        assertEquals("Europe", countries.get(0).get("region"));
        assertEquals("Moscow", countries.get(0).get("capital"));
        assertEquals("https://flagcdn.com/ru.svg", countries.get(0).get("flag"));
    }
}