package com.elliam.phonebook.aunthentication;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/phonebook")
@RestController
public class UserController {
    @Value("${email}")
    private String email;

    @Value("${password}")
    private String password;

    @PostMapping("/token")
    public ResponseEntity login(@RequestBody Users user) {

        String token = getJWTToken(user.getUsername());
        TokenResponse response= new TokenResponse();
        response.setUsername(user.getUsername());
        boolean status=false;
        try{
//            System.out.println(user.getUsername());
//            System.out.println(user.getPwd());
//
//            System.out.println("System password "+password);
//            System.out.println("System username "+email);
            if(email.equalsIgnoreCase(user.getUsername()) && password.equals(user.getPwd())){
                status=true;
            }
            response.setToken(token);
        }catch(Exception e){
            return new ResponseEntity<Error>(HttpStatus.BAD_REQUEST);
        }
        if (status){
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            return new ResponseEntity<Error>(HttpStatus.FORBIDDEN);
        }
    }

    private  Boolean verifyUser(String entered_password, String password_in_db) throws InvalidKeySpecException, NoSuchAlgorithmException {
        boolean status=false;
        if(PasswordManager.validatePassword(entered_password, password_in_db)){
           status=true;
        }
        return status;
    }

    public String createYear(int years){
        Calendar year = Calendar.getInstance();
        year.add(Calendar.YEAR, years);
        SimpleDateFormat isoFormat = new SimpleDateFormat("dd-MMM-yyyy");
        return isoFormat.format(year.getTime());
    }

    private String getJWTToken(String username) {
        String secretKey = "26d2f5ad-4eb9-4575-a005-4383158df6dd-26d2f5ad-4eb9-4575-a005-4383158df6dd-26d2f5ad-4eb9-4575-a005-4383158df6dd";
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER");


        String token = Jwts
                .builder()
                .setId("softtekJWT")
                .setSubject(username)
                .claim("authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(createYear(1)))
                .signWith(SignatureAlgorithm.HS512,
                        secretKey.getBytes()).compact();

        return "Bearer " + token;
    }
}