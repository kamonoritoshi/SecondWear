//package com.sw.service;
//
//import java.util.List;
//
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import com.sw.dao.AccountRepository;
//import com.sw.entity.Account;
//
//import lombok.RequiredArgsConstructor;
//
//@Component
//@RequiredArgsConstructor
//public class PasswordEncoderInitializer implements ApplicationRunner {
//	private final AccountRepository accountRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    @Override
//    public void run(ApplicationArguments args) throws Exception {
//        List<Account> allAccounts = accountRepository.findAll();
//        int count = 0;
//
//        for (Account acc : allAccounts) {
//            String password = acc.getPassword();
//            if (password != null && !password.startsWith("$2a$")) {
//                acc.setPassword(passwordEncoder.encode(password));
//                count++;
//            }
//        }
//
//        if (count > 0) {
//            accountRepository.saveAll(allAccounts);
//            System.out.println("✅ Đã mã hóa " + count + " mật khẩu chưa được mã hóa trước đó.");
//        } else {
//            System.out.println("✅ Tất cả mật khẩu đã được mã hóa đúng.");
//        }
//    }
//}
