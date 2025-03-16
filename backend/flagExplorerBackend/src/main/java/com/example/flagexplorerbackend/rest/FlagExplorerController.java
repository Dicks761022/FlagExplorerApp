package com.example.flagexplorerbackend.rest;

import com.baeldung.openapi.api.CountriesApiDelegate;
import com.baeldung.openapi.model.Country;
import com.baeldung.openapi.model.CountryDetails;
import com.example.flagexplorerbackend.service.RestCountriesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class FlagExplorerController implements CountriesApiDelegate {

    public RestCountriesService restCountriesService;

    public FlagExplorerController(RestCountriesService restCountriesService) {
        this.restCountriesService = restCountriesService;
    }

    @Override
    public ResponseEntity<List<Country>> countriesGet() {
        return CountriesApiDelegate.super.countriesGet();
    }

    @Override
    public ResponseEntity<CountryDetails> countriesNameGet(String name) {
        return CountriesApiDelegate.super.countriesNameGet(name);
    }
}
