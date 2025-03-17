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

@RestController
public class FlagExplorerController {

    private RestCountriesService restCountriesService;

    public FlagExplorerController(RestCountriesService restCountriesService) {
        this.restCountriesService = restCountriesService;
    }

    @GetMapping("/countries")
    public ResponseEntity<List<Country>> countriesGet() {
        List<Map<String, Object>> list = restCountriesService.getCountryAttributes();

        List<Country> listOfCountries = new ArrayList<>();

        for (Map<String, Object> country : list) {
            Country c = new Country();
            c.setName(country.get("commonName").toString());
            c.setFlag(country.get("flagUrl").toString());
            listOfCountries.add(c);
        }

        return ResponseEntity.ok(listOfCountries);
    }

    @GetMapping("/countries/{name}")
    public ResponseEntity<CountryDetails> countriesNameGet(@PathVariable String name) {
        List<Map<String, Object>> list = restCountriesService.getCountryAttributes();

        CountryDetails countryDetails = new CountryDetails();

        list.stream().filter(country -> country.get("commonName").equals(name)).findFirst().ifPresent(country -> {
            countryDetails.setName((String) country.get("commonName"));
            countryDetails.setFlag((String) country.get("flagUrl"));
            countryDetails.setCapital((String) country.get("capital"));
            countryDetails.setPopulation((Integer) country.get("population"));
        });

        return ResponseEntity.ok(countryDetails);
    }
}
