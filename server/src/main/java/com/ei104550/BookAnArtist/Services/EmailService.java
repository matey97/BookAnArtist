package com.ei104550.BookAnArtist.Services;

import com.ei104550.BookAnArtist.model.Contract;
import com.ei104550.BookAnArtist.model.Notification;
import com.ei104550.BookAnArtist.model.User;
import com.sun.mail.smtp.SMTPTransport;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.security.Security;
import java.util.Date;
import java.util.Properties;

@Service
public class EmailService {

    private final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";

    public void sendNewContractEmail(String user, Contract contract){
        Notification notification = new Notification();
        notification.setDestinationUser(user);
        notification.setDate(new Date());
        notification.setSubject("Nueva oferta de contratación");

        StringBuilder sb = new StringBuilder();
        sb.append("Hola " + user + ",\n\n");
        sb.append("Enhorabuena, has recibido una oferta de contración. Accede a la plataforma para revisar la oferta y aceptarla o rechazarla.\n\n");
        sb.append("Detalles de oferta: \n");
        sb.append("\t-Organizador: " + contract.getOrganizerUsername() + "\n");
        sb.append("\t-Descripción: " + contract.getComments() + "\n");
        sb.append("\t-Lugar y fecha: " + contract.getLocation() + ", " + contract.getZone() + ", " + new Date(contract.getDate()).toString() + "\n");
        sb.append("\nGracias por confiar en nosotros,\n");
        sb.append("BookAnArtist.");
        notification.setMessage(sb.toString());

        sendEmail(notification);
    }

    public void sendAcceptContractEmail(User user, Contract contract){

    }

    /*public void sendReclamationEmail(User user,){

    }*/

    public void sendPayEmail(User user){

    }

    public void sendIncomeEmail(User user){

    }

    public void sendPayBackEmail(User user){

    }

    private void sendEmail(Notification notification){
        Security.addProvider(new com.sun.net.ssl.internal.ssl.Provider());

        Properties props = System.getProperties();
        props.setProperty("mail.smtps.host", "smtp.gmail.com");
        props.setProperty("mail.smtp.socketFactory.class", SSL_FACTORY);
        props.setProperty("mail.smtp.socketFactory.fallback", "false");
        props.setProperty("mail.smtp.port", "465");
        props.setProperty("mail.smtp.socketFactory.port", "465");
        props.setProperty("mail.smtps.auth", "true");
        props.put("mail.smtps.quitwait", "false");

        Session session = Session.getInstance(props, null);

        final MimeMessage message = new MimeMessage(session);

        try{
            message.setFrom(new InternetAddress("al341802@uji.es"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("al341933@uji.es", false));
            message.setRecipients(Message.RecipientType.CC, InternetAddress.parse("", false));

            message.setSubject(notification.getSubject());
            message.setText(notification.getMessage());
            message.setSentDate(notification.getDate());

            SMTPTransport transport = (SMTPTransport)session.getTransport("smtps");
            transport.connect("smtp.gmail.com", "", "");
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
        }catch(Exception e){
            e.printStackTrace();
            System.out.println("Error al enviar el email");
        }
    }

}
