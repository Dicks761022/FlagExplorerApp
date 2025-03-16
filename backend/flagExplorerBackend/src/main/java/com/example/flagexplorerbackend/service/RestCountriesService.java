package com.example.flagexplorerbackend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RestCountriesService {
    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public RestCountriesService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.baseUrl("https://restcountries.com/v3.1/all").codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024)).build();
        this.objectMapper = objectMapper;

    }

    public List<Map<String, Object>> getCountryAttributes() {
        // Fetch raw JSON string from WebClient
        String jsonResponse = webClient.get()
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            // Parse JSON into a list of generic objects
            List<Map<String, Object>> countries = objectMapper.readValue(jsonResponse, new TypeReference<>() {});

            // Extract specific attributes (common name, capital, flag) into a new list of maps
            return countries.stream()
                    .map(country -> Map.of(
                            "commonName", ((Map<?, ?>) country.get("name")).get("common"),
                            "capital", getFirstElementOrDefault((List<?>) country.get("capital"), "Unknown"),
                            "flagUrl", ((Map<?, ?>) country.get("flags")).get("png"),
                            "population", country.getOrDefault("population", 0)


                    ))
                    .collect(Collectors.toList());

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse JSON response", e);
        }
    }

    private String getFirstElementOrDefault(List<?> list, String defaultValue) {
        if (list != null && !list.isEmpty()) {
            return list.get(0).toString(); // Return the first element of the list
        }
        return defaultValue; // Return "Unknown" if the list is null or empty
    }



}
