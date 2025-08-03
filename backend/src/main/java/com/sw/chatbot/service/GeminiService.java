package com.sw.chatbot.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Service
public class GeminiService {

	private final String API_KEY = "AIzaSyDXJM8MH41P5Q_m8IjpJwPZOlue8ThIteU";
	private final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key="
			+ API_KEY;

	public String askGemini(String userInput) {
		try {
			ObjectMapper mapper = new ObjectMapper();

			String systemPrompt = """
					Bạn là trợ lý AI của SecondWear – nền tảng thương mại điện tử mua/bán quần áo cũ tại Việt Nam.

					SecondWear giúp người dùng:
					- Tìm và mua quần áo đã qua sử dụng (áo thun, quần jeans, áo khoác, giày,...)
					- Thanh toán qua COD, VNPay hoặc PayOS
					- Theo dõi đơn hàng

					SecondWear hỗ trợ người bán:
					- Đăng bán sản phẩm, quản lý ảnh và mô tả
					- Xử lý đơn hàng của khách

					Trả lời ngắn gọn, đúng thông tin hệ thống. Không bịa chuyện.
					""";

			String fullPrompt = systemPrompt + "\n\nNgười dùng hỏi: " + userInput;

			ObjectNode textNode = mapper.createObjectNode();
			textNode.put("text", fullPrompt);

			ArrayNode partsArray = mapper.createArrayNode().add(textNode);
			ObjectNode contentNode = mapper.createObjectNode().set("parts", partsArray);
			ArrayNode contentsArray = mapper.createArrayNode().add(contentNode);

			ObjectNode root = mapper.createObjectNode().set("contents", contentsArray);
			String requestBody = mapper.writeValueAsString(root);

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
			RestTemplate restTemplate = new RestTemplate();

			for (int attempt = 1; attempt <= 3; attempt++) {
				try {
					ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_API_URL, request, String.class);
					JsonNode rootResponse = mapper.readTree(response.getBody());
					return rootResponse.at("/candidates/0/content/parts/0/text").asText();
				} catch (HttpServerErrorException e) {
					if (e.getStatusCode() == HttpStatus.SERVICE_UNAVAILABLE && attempt < 3) {
						System.out.println("Gemini quá tải, thử lại lần " + attempt);
						Thread.sleep(2000L * attempt); // exponential backoff
					} else {
						throw e;
					}
				}
			}
			return "Hiện tại Gemini đang quá tải. Vui lòng thử lại sau ít phút.";
		} catch (Exception e) {
			e.printStackTrace();
			return "Xin lỗi, tôi không thể trả lời câu hỏi đó lúc này.";
		}
	}
}
