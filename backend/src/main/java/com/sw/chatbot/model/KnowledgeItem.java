package com.sw.chatbot.model;

import lombok.Data;

@Data
public class KnowledgeItem {
	private String id;
	private String question;
    private String answer;
}
