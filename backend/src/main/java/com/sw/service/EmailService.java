package com.sw.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
	private final JavaMailSender mailSender;

    public void sendVerificationCode(String toEmail, String code) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            String subject = "SecondWear - Xác nhận đăng ký";
            String content = "<h3>Mã xác nhận của bạn là:</h3><h2>" + code + "</h2>"
                           + "<p>Vui lòng nhập mã này để hoàn tất đăng ký.</p>";

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(content, true); // HTML

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Gửi email thất bại: " + e.getMessage());
        }
    }
}
