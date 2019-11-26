package com.example.yummy.demo.Service;

import com.example.yummy.demo.Request.YelpRequest;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;

@Service
public class YelpService {

    public List search(YelpRequest yelpRequest) throws IOException{
        Map<String, Object> jsonMap;
        Gson gson = new Gson();
        Type outputType = new TypeToken<Map<String, Object>>(){}.getType();
        String url = getUrl(yelpRequest);
        jsonMap = gson.fromJson(getJsonStr(url), outputType);

        Object obj = jsonMap.get("businesses");
        List<?> list = new ArrayList<>();
        if (obj.getClass().isArray()) {
            list = Arrays.asList((Object[])obj);
        } else if (obj instanceof Collection) {
            list = new ArrayList<>((Collection<?>)obj);
        }
        return list;
    }


    private String getJsonStr(String url) throws IOException {
        URL urlForGetRequest = new URL(url);
        String readLine = null;
        String str = "";

        HttpURLConnection connection = (HttpURLConnection) urlForGetRequest.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Authorization", "Bearer aFy5gH0vOtETj9aB326Ghikuv3bbAH4MkTMHu53hsRM6HEcp7svgcqmzoRea7rAoKKCOZWa_h09AdFM98Mc7B78E-54MCuw5R_D5xKRDoI8vcC9stgh-13sggSpQXXYx");

        int responseCode = connection.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(connection.getInputStream()));
            StringBuffer response = new StringBuffer();
            while ((readLine = in .readLine()) != null) {
                response.append(readLine);
            } in .close();

            return response.toString();

        } else {
            return "GET NOT WORKED";
        }
    }

    private String getUrl(YelpRequest yelpRequest) throws IOException {
        String location = yelpRequest.getLocation() != null? yelpRequest.getLocation() : "";
        String term = yelpRequest.getTerm() != null? yelpRequest.getTerm() : "";
        String categories = yelpRequest.getCategories() != null? yelpRequest.getCategories() : "";
        String limit = yelpRequest.getLimit() != null? yelpRequest.getLimit() : "";

        location = URLEncoder.encode(location,"utf-8");
        term = URLEncoder.encode(term,"utf-8");
        categories = URLEncoder.encode(categories,"utf-8");
        limit = URLEncoder.encode(limit,"utf-8");

        String param = "";
        if (location.length() > 0) param += "location="+location;
        if (term.length() > 0) param += "&term="+term;
        if (categories.length() > 0) param +="&categories="+categories;
        if (limit.length() > 0) param += "&limit="+limit;

        String url = "https://api.yelp.com/v3/businesses/search?"+param;
        return url;
    }
}
