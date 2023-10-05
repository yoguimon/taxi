package com.agustin.taxi.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailUtil {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendPasswordEmail(String email) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Cambiar Contraseña");
        mimeMessageHelper.setText("""
                <div>
                    <a href="http://localhost:8080/linkNuevaContrasena.html?email=%s" target="_blank">Presiona este Link para cambiar contraseña </a>
                </div>
                """.formatted(email),true);
        javaMailSender.send(mimeMessage);
    }
}
