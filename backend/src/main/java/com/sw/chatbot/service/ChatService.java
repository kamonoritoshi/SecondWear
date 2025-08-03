package com.sw.chatbot.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.sw.chatbot.model.ChatRequest;
import com.sw.chatbot.model.ChatResponse;
import com.sw.chatbot.model.ProductSuggestion;
import com.sw.dao.ProductRepository;
import com.sw.entity.Product;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {

	private final GeminiService geminiService;
	private final ProductRepository productRepository;
	private final KnowledgeBaseService knowledgeBaseService;

	public ChatResponse processMessage(ChatRequest request) {
		String userMessage = request.getMessage();

		String knownAnswer = knowledgeBaseService.searchBestAnswer(userMessage);

		String aiReply;
		List<ProductSuggestion> suggestions = null;
		if (knownAnswer != null) {
			aiReply = knownAnswer;
			System.out.println("[KNOWLEDGE BASE] Matched: " + aiReply);
		} else {
			// 2. Nếu không có, gọi Gemini AI
			System.out.println("[GEMINI] Request: " + userMessage);
			aiReply = geminiService.askGemini(userMessage);
			System.out.println("[GEMINI] Response: " + aiReply);
		}

		// Có keyword → lọc sản phẩm theo keyword (giả định là tên)
		List<Product> matchedProducts = productRepository.findTop3SuggestedProducts();
		suggestions = matchedProducts.stream().map(p -> new ProductSuggestion(p.getProductId(), p.getName(),
				p.getPrice(), p.getImages().isEmpty() ? null : p.getImages().get(0).getImageUrl())).toList();
		if (userMessage.toLowerCase().matches(".*\\b(gợi ý|mua|phù hợp)\\b.*")) {
			// fallback nếu có ý định mua nhưng không có keyword
			List<Product> fallback = productRepository.findTop3SuggestedProducts();
			suggestions = fallback.stream().map(p -> new ProductSuggestion(p.getProductId(), p.getName(), p.getPrice(),
					p.getImages().isEmpty() ? null : p.getImages().get(0).getImageUrl())).toList();
		}

		ChatResponse response = new ChatResponse();
		response.setIntent("ai_assistant");
		response.setReply(aiReply);
		response.setSuggestions(suggestions);
		return response;
	}

	// Nếu Gemini trả về nội dung có [tag], xoá bỏ tag
	private String cleanReply(String reply) {
		return reply.replaceAll("\\[.*?\\]", "").trim();
	}
}
