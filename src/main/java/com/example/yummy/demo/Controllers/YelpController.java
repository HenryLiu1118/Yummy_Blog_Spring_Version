package com.example.yummy.demo.Controllers;

import com.example.yummy.demo.Request.YelpRequest;
import com.example.yummy.demo.Responses.TextResponse;
import com.example.yummy.demo.Service.MapValidationErrorService;
import com.example.yummy.demo.Service.YelpService;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

@Controller
@RequestMapping("/api/yelp")
public class YelpController {

    @Autowired
    private YelpService yelpService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/search")
    public ResponseEntity<?> search(@Valid @RequestBody YelpRequest yelpRequest, BindingResult result) throws IOException {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        return ResponseEntity.ok(yelpService.search(yelpRequest));
    }
}
