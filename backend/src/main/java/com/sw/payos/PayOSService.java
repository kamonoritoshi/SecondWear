package com.sw.payos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.sw.entity.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PayOSService {

    private final PayOSConfig config;
    private final RestTemplate restTemplate;

    private String generateSignature(String data, String key) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        mac.init(secretKeySpec);
        byte[] rawHmac = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder();
        for (byte b : rawHmac) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public String createOrGetPaymentLink(PayOSRequest request) throws Exception {
        try {
            return tryCreatePaymentLink(request);
        } catch (RuntimeException ex) {
            if (ex.getMessage().contains("Đơn thanh toán đã tồn tại")) {
                try {
                    String existingLink = getPaymentLinkByOrderCode(request.getOrderCode());
                    if (existingLink != null && !existingLink.isBlank()) {
                        return existingLink;
                    }
                } catch (RuntimeException innerEx) {
                    System.out.println("⚠ DEBUG: Không lấy được link đơn cũ - " + innerEx.getMessage());
                }
                // Nếu không lấy được link → tạo lại đơn mới
                long newOrderCode = Math.abs(UUID.randomUUID().getMostSignificantBits());
                request.setOrderCode(newOrderCode);
                return tryCreatePaymentLink(request);
            }
            throw ex;
        }
    }

    private String tryCreatePaymentLink(PayOSRequest request) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        mapper.configure(SerializationFeature.ORDER_MAP_ENTRIES_BY_KEYS, true);

        Map<String, String> rawParams = new TreeMap<>();
        rawParams.put("amount", String.valueOf(request.getAmount()));
        rawParams.put("cancelUrl", request.getCancelUrl());
        rawParams.put("description", request.getDescription());
        rawParams.put("orderCode", String.valueOf(request.getOrderCode()));
        rawParams.put("returnUrl", request.getReturnUrl());

        String dataToSign = rawParams.entrySet().stream()
            .map(entry -> entry.getKey() + "=" + entry.getValue())
            .reduce((a, b) -> a + "&" + b)
            .orElse("");

        String signature = generateSignature(dataToSign, config.getChecksumKey());
        request.setSignature(signature);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-client-id", config.getClientId());
        headers.set("x-api-key", config.getApiKey());

        HttpEntity<PayOSRequest> httpEntity = new HttpEntity<>(request, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
            config.getEndpoint(), httpEntity, Map.class
        );

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            Map<String, Object> body = response.getBody();
            System.out.println("PayOS Full Response: " + body.toString());
            if (!"00".equals(String.valueOf(body.get("code")))) {
                throw new RuntimeException("Lỗi PayOS: " + body.get("desc"));
            }

            Map<String, Object> data = (Map<String, Object>) body.get("data");
            if (data == null || !data.containsKey("checkoutUrl")) {
                throw new RuntimeException("Không tìm thấy checkoutUrl: " + data);
            }
            return data.get("checkoutUrl").toString();
        } else {
            throw new RuntimeException("Tạo thanh toán thất bại: " + response.getBody());
        }
    }

    public String getPaymentLinkByOrderCode(long orderCode) {
        String url = config.getEndpoint() + "/" + orderCode;

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-client-id", config.getClientId());
        headers.set("x-api-key", config.getApiKey());

        HttpEntity<Void> httpEntity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
            url, HttpMethod.GET, httpEntity, Map.class
        );

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            Map<String, Object> body = response.getBody();
            if (!"00".equals(String.valueOf(body.get("code")))) {
                throw new RuntimeException("Lỗi khi lấy link đơn cũ: " + body.get("desc"));
            }

            Map<String, Object> data = (Map<String, Object>) body.get("data");
            if (data != null && data.containsKey("checkoutUrl")) {
                return data.get("checkoutUrl").toString();
            } else {
                throw new RuntimeException("Không tìm thấy checkoutUrl trong dữ liệu đơn cũ.");
            }
        } else {
            throw new RuntimeException("Không thể lấy thông tin đơn cũ: " + response.getBody());
        }
    }

    public List<Item> buildItemsFromOrder(Order order) {
        return order.getItems().stream().map(orderItem -> {
            return new Item(
                orderItem.getProduct().getName(),
                orderItem.getQuantity(),
                orderItem.getPrice().intValue()
            );
        }).toList();
    }
}
