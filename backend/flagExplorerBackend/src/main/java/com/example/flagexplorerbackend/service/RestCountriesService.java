package com.example.flagexplorerbackend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
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
        String jsonResponse = webClient.get()
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            List<Map<String, Object>> countries = objectMapper.readValue(jsonResponse, new TypeReference<>() {});

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

    public Map<String, Object> getCountryByName(String name) {
        List<Map<String, Object>> countries = getCountryAttributes();

        // Filter and find the country by its "commonName", then return if found
        return countries.stream()
                .filter(country -> name.equals(country.get("commonName"))) // Match by "commonName"
                .findFirst()
                .orElse(new HashMap<>());


    }

    private String getFirstElementOrDefault(List<?> list, String defaultValue) {
        if (list != null && !list.isEmpty()) {
            return list.get(0).toString();
        }
        return defaultValue;
    }



}
