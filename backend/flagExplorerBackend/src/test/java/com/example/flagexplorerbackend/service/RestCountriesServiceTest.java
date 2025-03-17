package com.example.flagexplorerbackend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class RestCountriesServiceTest {

    private MockWebServer mockWebServer;
    private RestCountriesService restCountriesService;

    @BeforeEach
    void setUp() throws Exception {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
        WebClient.Builder webClientBuilder = WebClient.builder().baseUrl(mockWebServer.url("/").toString());
        restCountriesService = new RestCountriesService(webClientBuilder, new ObjectMapper());
    }

    @AfterEach
    void tearDown() throws Exception {
        mockWebServer.shutdown();
    }

    @Test
    void testGetCountryAttributes() throws Exception {
        String fakeApiResponse = """
        [
            {
                "name": {"common": "Canada"},
                "capital": ["Ottawa"],
                "flags": {"png": "https://flagcdn.com/w320/ca.png"},
                "population": 38000000
            },
            {
                "name": {"common": "Germany"},
                "capital": ["Berlin"],
                "flags": {"png": "https://flagcdn.com/w320/de.png"},
                "population": 83000000
            }
        ]
        """;

        mockWebServer.enqueue(new MockResponse()
                .setBody(fakeApiResponse)
                .addHeader("Content-Type", "application/json"));

        List<Map<String, Object>> countries = restCountriesService.getCountryAttributes();

        assertEquals(2, countries.size());
        assertEquals("Canada", countries.get(0).get("commonName"));
        assertEquals("https://flagcdn.com/w320/ca.png", countries.get(0).get("flagUrl"));
        assertEquals(38000000, countries.get(0).get("population"));
    }

    @Test
    void testGetCountryByName() throws Exception {
        String fakeApiResponse = """
        [
            {
                "name": {"common": "Canada"},
                "capital": ["Ottawa"],
                "flags": {"png": "https://flagcdn.com/w320/ca.png"},
                "population": 38000000
            },
            {
                "name": {"common": "Germany"},
                "capital": ["Berlin"],
                "flags": {"png": "https://flagcdn.com/w320/de.png"},
                "population": 83000000
            }
        ]
        """;

        mockWebServer.enqueue(new MockResponse()
                .setBody(fakeApiResponse)
                .addHeader("Content-Type", "application/json"));

        Map<String, Object> country = restCountriesService.getCountryByName("Canada");

        assertNotNull(country);
        assertEquals("Canada", country.get("commonName"));
        assertEquals("Ottawa", country.get("capital"));
        assertEquals("https://flagcdn.com/w320/ca.png", country.get("flagUrl"));
        assertEquals(38000000, country.get("population"));
    }
}