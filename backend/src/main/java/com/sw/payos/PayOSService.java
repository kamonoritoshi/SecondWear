package com.sw.payos;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.apache.commons.codec.digest.HmacAlgorithms;
import org.apache.commons.codec.digest.HmacUtils;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PayOSService {

    private final PayOSConfig config;
    private final ObjectMapper objectMapper;

    public String createPaymentLink(PayOSRequest request) throws Exception {
        RestTemplate restTemplate = new RestTemplate();

        // Tạo chữ ký checksum từ request
        String bodyString = objectMapper.writeValueAsString(request);
        String signature = new HmacUtils(HmacAlgorithms.HMAC_SHA_256, config.getChecksumKey())
                .hmacHex(bodyString);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-client-id", config.getClientId());
        headers.set("x-api-key", config.getApiKey());
        headers.set("x-checksum", signature);

        HttpEntity<PayOSRequest> httpEntity = new HttpEntity<>(request, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
            config.getEndpoint(), httpEntity, Map.class
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> body = response.getBody();

            if (body == null || !body.containsKey("data")) {
                throw new RuntimeException("Phản hồi từ PayOS không chứa trường 'data': " + body);
            }
            
            System.out.println("PayOS Response: " + response.getBody());

            Map<String, Object> data = (Map<String, Object>) body.get("data");

            if (data == null || !data.containsKey("checkoutUrl")) {
                throw new RuntimeException("Không tìm thấy 'checkoutUrl' trong phản hồi: " + data);
            }
            System.out.println("PayOS Response: " + response.getBody());
            return data.get("checkoutUrl").toString();
        } else {
            throw new RuntimeException("Lỗi tạo thanh toán: " + response.getStatusCode() + " - " + response.getBody());
        }
    }

}
