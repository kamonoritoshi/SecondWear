package com.sw.chatbot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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
		if (knownAnswer != null) {
			aiReply = knownAnswer;
			System.out.println("[KNOWLEDGE BASE] Matched: " + aiReply);
		} else {
			// 3. Nếu không có, fallback gọi Gemini
			System.out.println("[GEMINI] Request: " + userMessage);
			aiReply = geminiService.askGemini(userMessage);
			System.out.println("[GEMINI] Response: " + aiReply);
		}

		// 4. Gợi ý sản phẩm nếu cần
		List<ProductSuggestion> suggestions = null;
		if (userMessage.toLowerCase().contains("gợi ý") || userMessage.toLowerCase().contains("mua")) {
			List<Product> products = productRepository.findTop3SuggestedProducts(PageRequest.of(0, 3));
			suggestions = products.stream().map(p -> new ProductSuggestion(p.getProductId(), p.getName(), p.getPrice(),
					p.getImages().isEmpty() ? null : p.getImages().get(0).getImageUrl())).toList();
		}

		ChatResponse response = new ChatResponse();
		response.setIntent("ai_assistant");
		response.setReply(aiReply);
		response.setSuggestions(suggestions);
		return response;
	}

	// ==== Helper methods ====

	// Trích xuất intent từ Gemini bằng tag hoặc nội dung
	private String extractIntentFromReply(String reply) {
		String lower = reply.toLowerCase();
		if (lower.contains("gợi ý") || lower.contains("mua") || lower.contains("sản phẩm")) {
			return "suggest_product";
		}
		return "ai_assistant";
	}

	// Nếu Gemini trả về nội dung có [tag], xoá bỏ tag
	private String cleanReply(String reply) {
		return reply.replaceAll("\\[.*?\\]", "").trim();
	}
}
