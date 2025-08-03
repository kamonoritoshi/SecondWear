package com.sw.chatbot.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Service
public class GeminiService {

    private final String API_KEY = "AIzaSyDXJM8MH41P5Q_m8IjpJwPZOlue8ThIteU";
    private final String GEMINI_API_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY;

    public String askGemini(String prompt) {
        try {
            // Tạo request body an toàn bằng ObjectMapper
            ObjectMapper mapper = new ObjectMapper();

            ObjectNode textNode = mapper.createObjectNode();
            textNode.put("text", prompt);

            ArrayNode partsArray = mapper.createArrayNode();
            partsArray.add(textNode);

            ObjectNode contentNode = mapper.createObjectNode();
            contentNode.set("parts", partsArray);

            ArrayNode contentsArray = mapper.createArrayNode();
            contentsArray.add(contentNode);

            ObjectNode root = mapper.createObjectNode();
            root.set("contents", contentsArray);

            String requestBody = mapper.writeValueAsString(root);

            // Cấu hình HTTP headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
            RestTemplate restTemplate = new RestTemplate();

            // Gửi request tới Gemini API
            ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_API_URL, request, String.class);

            // Phân tích kết quả trả về
            JsonNode rootResponse = mapper.readTree(response.getBody());
            return rootResponse.at("/candidates/0/content/parts/0/text").asText();

        } catch (Exception e) {
            e.printStackTrace();
            return "Xin lỗi, tôi không thể trả lời câu hỏi đó lúc này.";
        }
    }
}
