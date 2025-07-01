package com.sw.vnpay;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class VNPayUtils {
	public static String hmacSHA512(String key, String data) throws Exception {
        Mac hmac512 = Mac.getInstance("HmacSHA512");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "HmacSHA512");
        hmac512.init(secretKey);
        byte[] bytes = hmac512.doFinal(data.getBytes("UTF-8"));
        return HexFormat.of().formatHex(bytes);
    }

    public static String getPaymentUrl(Map<String, String> vnpParams, String hashSecret, String vnpUrl) throws Exception {
        // 1. Sort params
        List<String> sortedKeys = new ArrayList<>(vnpParams.keySet());
        Collections.sort(sortedKeys);
        StringBuilder query = new StringBuilder();
        StringBuilder hashData = new StringBuilder();

        for (String key : sortedKeys) {
            String value = URLEncoder.encode(vnpParams.get(key), StandardCharsets.US_ASCII);
            query.append(key).append("=").append(value).append("&");
            hashData.append(key).append("=").append(value).append("&");
        }

        // Remove last &
        query.setLength(query.length() - 1);
        hashData.setLength(hashData.length() - 1);

        // 2. Hash
        String secureHash = hmacSHA512(hashSecret, hashData.toString());

        return vnpUrl + "?" + query + "&vnp_SecureHash=" + secureHash;
    }
}
