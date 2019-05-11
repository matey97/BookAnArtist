package com.ei104550.BookAnArtist.controller;

import com.ei104550.BookAnArtist.model.User;
import com.ei104550.BookAnArtist.model.Valoracion;
import com.ei104550.BookAnArtist.repositories.ArtistValorationRepository;
import com.ei104550.BookAnArtist.repositories.UserRepository;
import org.apache.tomcat.util.codec.binary.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Base64.*;

@RestController
@RequestMapping("api/")
public class UserController {

    private UserRepository userRepository;
    private ArtistValorationRepository valorationRepository;


    public UserController(UserRepository userRepository,
                          ArtistValorationRepository valorationRepository){
        this.userRepository = userRepository;
        this.valorationRepository = valorationRepository;

    }

    @GetMapping("users")
    public Collection<User> users(){
        return userRepository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping("user/{username}")
    public User userByUsername(HttpServletResponse httpServletResponse, @PathVariable String username){
        User user = userRepository.findById(username).orElse(null);
        return user;
    }

    @GetMapping(value = "user-image/{username}")
    public Map<String, String> userImage(@PathVariable String username){
        User user = userRepository.findById(username).orElse(null);
        Map<String, String> jsonMap = new HashMap<>();
        jsonMap.put("raw", getEncoder().encodeToString(user.getImage()));
        return jsonMap;
    }

    @PostMapping("{username}/uploadusrimg")
    public Map<String, String> uploadUserImage(@PathVariable("username") String username, @RequestParam("myFile") MultipartFile image) throws IOException {
        User user = userRepository.findById(username).orElse(null);
        user.setImage(image.getBytes());
        userRepository.save(user);
        Map<String, String> jsonMap = new HashMap<>();
        jsonMap.put("raw", Base64.getEncoder().encodeToString(user.getImage()));
        return jsonMap;

    }


    @PostMapping("user/{username}/valoration")
    public void saveArtistValoration(@PathVariable String username,
                                     @RequestBody Valoracion valoration){

        if(userRepository.findById(username).isPresent()){
            User user = userRepository.findById(username).get();
            user.addValoracion(valoration);
            user.setPuntuation(user.getPuntuation());
            valorationRepository.save(valoration);
            userRepository.save(user);
        }

    }

    @DeleteMapping("user/valoration/{id}")
    public void deleteArtistValoration(@PathVariable String id){

        if(valorationRepository.findById(Long.parseLong(id)).isPresent()){

            Valoracion valoracion = valorationRepository.findById(Long.parseLong(id)).get();
            User user = userRepository.findById(valoracion.getValorado()).get();
            user.deleteValoracion(id);
            user.updatePuntuacion();
            userRepository.save(user);
            valorationRepository.deleteById(Long.parseLong(id));

        }
    }

    @PostMapping("user/valoration/{id}")
    public void updateArtistValoration(@PathVariable String id,
                                       @RequestBody Valoracion valorationNew){
        //Borramos
        if(valorationRepository.findById(Long.parseLong(id)).isPresent()){



            Valoracion valoracion = valorationRepository.findById(Long.parseLong(id)).get();
            valoracion.setComentario(valorationNew.getComentario());
            valoracion.setPuntuacion(valorationNew.getPuntuacion());


            valorationRepository.save(valoracion);


            //Para que se actualice la puntuacion del uuario al actualizar la puntuacion de la valoracion
            User user = userRepository.findById(valoracion.getValorado()).get();
            user.updatePuntuacion();
            userRepository.save(user);
        }

    }



}
