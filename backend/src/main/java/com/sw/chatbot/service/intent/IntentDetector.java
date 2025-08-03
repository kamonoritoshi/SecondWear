package com.sw.chatbot.service.intent;

import org.springframework.stereotype.Component;

@Component
public class IntentDetector {

    public String detectIntent(String message) {
        String msg = message.toLowerCase();

        if (msg.contains("đơn hàng") || msg.contains("giao hàng") || msg.contains("mã đơn"))
            return "order_status";

        if (
            msg.contains("gợi ý") ||
            msg.contains("tư vấn") ||
            msg.contains("mua gì") ||
            msg.contains("phù hợp") ||
            msg.contains("sản phẩm") ||
            msg.contains("áo") || msg.contains("quần") || msg.contains("giày") ||
            msg.contains("giá bao nhiêu") || msg.contains("bao nhiêu tiền")
        ) {
            return "suggest_product";
        }

        // fallback là faq
        return "faq";
    }
}
