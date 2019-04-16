package com.ei104550.BookAnArtist.Services;

import com.ei104550.BookAnArtist.model.Contract;
import com.ei104550.BookAnArtist.model.Notification;
import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.repositories.NotificationRepository;
import com.ei104550.BookAnArtist.repositories.UserRepository;
import com.sun.mail.smtp.SMTPTransport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.security.Security;
import java.util.Date;
import java.util.Properties;

@Service
public class EmailService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NotificationRepository notificationRepository;

    private String destinationEmail;
    private User user;

    @Async("asyncExecutor")
    public void sendNewContractEmail(String user, Contract contract){
        Notification notification = buildBaseNotificationAndDestinationUser(user);
        notification.setSubject("Nueva oferta de contratación");

        StringBuilder sb = new StringBuilder();
        sb.append("Hola " + user + ",\n\n");
        sb.append("Enhorabuena, has recibido una oferta de contración. Accede a la plataforma para revisar la oferta y aceptarla o rechazarla.\n\n");

        sb.append(buildContractDetails(contract));
        sb.append("Fecha límite de contestación: " + new Date(contract.getLimitDate()).toString() + ".\n\n");
        sb.append(buildGreetings());
        notification.setMessage(sb.toString());

        sendEmail(notification);
        saveNotification(notification);
    }

    @Async("asyncExecutor")
    public void sendAcceptRejectContractEmail(String user, Contract contract, boolean accepted){
        Notification notification = buildBaseNotificationAndDestinationUser(user);
        notification.setSubject("Actualización en el estado de la oferta ID: " + contract.getId());

        StringBuilder sb = new StringBuilder();
        sb.append("Hola " + user + ",\n\n");
        if (accepted)
            sb.append("Enhorabuena, tu oferta con ID: " + contract.getId() + " ha sido aceptada. No olvides ponerte en contacto con el artista para fijar todos los detalles de la actuación.\n\n");
        else
            sb.append("Lo sentimos, tu oferta con ID: " + contract.getId() + " ha sido rechazada.\n\n");
        sb.append(buildContractDetails(contract));
        if (accepted)
            sb.append("Email de contacto del artista: " + destinationEmail + "\n");
        sb.append(buildGreetings());
        notification.setMessage(sb.toString());

        sendEmail(notification);
        saveNotification(notification);
    }

    /*
    @Async("asyncExecutor")
    public void sendReclamationEmail(User user,){

    }*/

    @Async("asyncExecutor")
    public void sendPayEmail(String user, Contract contract){
        Notification notification = buildBaseNotificationAndDestinationUser(user);
        notification.setSubject("Pago de oferta ID: " + contract.getId());

        StringBuilder sb = new StringBuilder();
        sb.append("Hola " + user + ",\n\n");
        sb.append("Debido a la aceptación de la oferta con ID: " + contract.getId() + ", se ha realizado el cobro del importe de la actuación.");
        sb.append(" En caso de que el artista no cumpla con la actuación, se le reintegrará todo el importe de la actuación.\n\n");
        sb.append(buildContractDetails(contract));
        sb.append(buildGreetings());
        notification.setMessage(sb.toString());

        sendEmail(notification);
    }

    @Async("asyncExecutor")
    public void sendIncomeEmail(String user, Contract contract){
        Notification notification = buildBaseNotificationAndDestinationUser(user);
        notification.setSubject("Cobro de oferta ID: " + contract.getId());

        StringBuilder sb = new StringBuilder();
        sb.append("Hola " + user + ",\n\n");
        sb.append("Le informamos que se ha realizado el pago del importe de la actuación con ID: " + contract.getId() + ".\n\n");
        sb.append(buildContractDetails(contract));
        sb.append(buildGreetings());
        notification.setMessage(sb.toString());

        sendEmail(notification);
    }

    @Async("asyncExecutor")
    public void sendPayBackEmail(String user, Contract contract){
        Notification notification = buildBaseNotificationAndDestinationUser(user);
        notification.setSubject("Reintegro de oferta ID: " + contract.getId());

        StringBuilder sb = new StringBuilder();
        sb.append("Hola " + user + ",\n\n");
        sb.append("Debido a que la actuación con ID: " + contract.getId());
        sb.append(" no se ha realizado, le informamos que se ha realizado el reintegro del importe de la misma.\n\n");
        sb.append(buildContractDetails(contract));
        sb.append(buildGreetings());
        notification.setMessage(sb.toString());

        sendEmail(notification);
    }

    private void saveNotification(Notification n){
        user.getNotifications().add(n);
        notificationRepository.save(n);
        userRepository.save(user);
    }

    private Notification buildBaseNotificationAndDestinationUser(String user){
        Notification notification = new Notification();
        notification.setDestinationUser(user);
        notification.setDate(new Date());
        this.user = userRepository.findOneByUsername(user);
        this.destinationEmail = this.user.getEmail();
        return notification;
    }

    private String buildContractDetails(Contract contract){
        StringBuilder sb = new StringBuilder();
        sb.append("Detalles de oferta: \n");
        sb.append("\t-ID: " + contract.getId() + "\n");
        sb.append("\t-Organizador: " + contract.getOrganizerUsername() + "\n");
        sb.append("\t-Artista: " + contract.getArtisticUsername() + "\n");
        sb.append("\t-Descripción: " + contract.getComments() + "\n");
        sb.append("\t-Lugar: " + contract.getLocation() + ", " + contract.getZone() + "\n");
        sb.append("\t-Fecha: " + new Date(contract.getDate()).toString() + "\n\n");
        return sb.toString();
    }

    private String buildGreetings(){
        StringBuilder sb = new StringBuilder();
        sb.append("Gracias por confiar en nosotros,\n");
        sb.append("BookAnArtist.");
        return sb.toString();
    }


    private void sendEmail(Notification notification){
        Security.addProvider(new com.sun.net.ssl.internal.ssl.Provider());

        Properties props = System.getProperties();
        props.setProperty("mail.smtps.host", "smtp.gmail.com");
        props.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.setProperty("mail.smtp.socketFactory.fallback", "false");
        props.setProperty("mail.smtp.port", "465");
        props.setProperty("mail.smtp.socketFactory.port", "465");
        props.setProperty("mail.smtps.auth", "true");
        props.put("mail.smtps.quitwait", "false");

        Session session = Session.getInstance(props, null);

        final MimeMessage message = new MimeMessage(session);

        try{
            String BNA_EMAIL = "noreply.bookanartist@gmail.com";
            String BNA_PASS = "bookanartist@2019";
            message.setFrom(new InternetAddress(BNA_EMAIL));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(destinationEmail, false));
            message.setRecipients(Message.RecipientType.CC, InternetAddress.parse("", false));

            message.setSubject(notification.getSubject());
            message.setText(notification.getMessage());
            message.setSentDate(notification.getDate());

            SMTPTransport transport = (SMTPTransport)session.getTransport("smtps");
            transport.connect("smtp.gmail.com", BNA_EMAIL, BNA_PASS);
            transport.sendMessage(message, message.getAllRecipients());
            System.out.println("Email enviado");
            transport.close();
        }catch(Exception e){
            e.printStackTrace();
            System.out.println("Error al enviar el email");
        }
    }

}
