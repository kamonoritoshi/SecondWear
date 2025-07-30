package com.sw.chatbot.service;

import java.io.IOException;
import java.util.List;

import org.apache.commons.text.similarity.LevenshteinDistance;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sw.chatbot.model.KnowledgeItem;

import jakarta.annotation.PostConstruct;

@Service
public class KnowledgeBaseService {
	private List<KnowledgeItem> knowledgeItems;

    @PostConstruct
    public void init() throws IOException {
        Resource resource = new ClassPathResource("ai_knowledge/secondwear_knowledge.json");
        ObjectMapper mapper = new ObjectMapper();
        knowledgeItems = mapper.readValue(resource.getInputStream(), new TypeReference<>() {});
    }

    public String searchBestAnswer(String userQuestion) {
    	LevenshteinDistance distance = new LevenshteinDistance();
        KnowledgeItem bestMatch = null;
        int minDistance = Integer.MAX_VALUE;

        for (KnowledgeItem item : knowledgeItems) {
            int d = distance.apply(userQuestion.toLowerCase(), item.getQuestion().toLowerCase());
            if (d < minDistance) {
                minDistance = d;
                bestMatch = item;
            }
        }

        if (minDistance < 10) return bestMatch.getAnswer(); // ngưỡng tùy chỉnh
        return null;
    }

    public List<KnowledgeItem> getAll() {
        return knowledgeItems;
    }
}
