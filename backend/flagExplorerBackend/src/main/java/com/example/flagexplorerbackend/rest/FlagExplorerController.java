package com.example.flagexplorerbackend.rest;

import com.baeldung.openapi.api.CountriesApiDelegate;
import com.baeldung.openapi.model.Country;
import com.baeldung.openapi.model.CountryDetails;
import com.example.flagexplorerbackend.service.RestCountriesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class FlagExplorerController {

    private RestCountriesService restCountriesService;

    public FlagExplorerController(RestCountriesService restCountriesService) {
        this.restCountriesService = restCountriesService;
    }

    @GetMapping("/countries")
    public ResponseEntity<List<Country>> countriesGet() {
        List<Country> listOfCountries = restCountriesService.getCountryAttributes()
                .stream()
                .map(this::mapToCountry)
                .collect(Collectors.toList());

        return ResponseEntity.ok(listOfCountries);

    }

    @GetMapping("/countries/{name}")
    public ResponseEntity<CountryDetails> countriesNameGet(@PathVariable String name) {
        // Get the country attributes for the given name from the service.
        Map<String, Object> countryAttributes = restCountriesService.getCountryByName(name);

        // If no country data is found, return a 404 response.
        if (countryAttributes == null || countryAttributes.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Map the country attributes to a CountryDetails object.
        CountryDetails countryDetails = mapToCountryDetails(countryAttributes);

        // Return the CountryDetails object wrapped in a ResponseEntity.
        return ResponseEntity.ok(countryDetails);

    }

    private Country mapToCountry(Map<String, Object> countryAttributes) {
        Country country = new Country();
        country.setName((String) countryAttributes.getOrDefault("commonName", "Unknown")); // Default to "Unknown" if missing
        country.setFlag((String) countryAttributes.getOrDefault("flagUrl", ""));       // Default to empty string if missing
        return country;
    }

    private CountryDetails mapToCountryDetails(Map<String, Object> countryAttributes) {
        CountryDetails countryDetails = new CountryDetails();
        countryDetails.setName((String) countryAttributes.getOrDefault("commonName", "Unknown"));
        countryDetails.setFlag((String) countryAttributes.getOrDefault("flagUrl", ""));
        countryDetails.setCapital((String) countryAttributes.getOrDefault("capital", "N/A"));
        countryDetails.setPopulation((Integer) countryAttributes.getOrDefault("population", 0));
        return countryDetails;
    }


}
