package com.elliam.phonebook.controller;


import com.elliam.phonebook.entity.Contact;
import com.elliam.phonebook.service.ContactService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/phonebook")
public class ContactController {
    @Autowired
    ContactService contactService;

    @CrossOrigin(origins ="*")
    @GetMapping("/all")
    public ResponseEntity<?> findAllContact(){
        log.info("Request for all contacts");
        return new ResponseEntity<>(contactService.allPhoneNumbers(), HttpStatus.OK);
    }

    @CrossOrigin(origins ="*")
    @GetMapping("/single/{phone-number}")
    public ResponseEntity<?> oneContact(@PathVariable("phone-number") String phoneNumber){
        log.info("Get single contact with phone number :"+phoneNumber);
        return new ResponseEntity<>(contactService.oneContact(phoneNumber), HttpStatus.OK);
    }

    @CrossOrigin(origins ="*")
    @GetMapping("/search/{lastname}")
    public ResponseEntity<?> searchContact(@PathVariable("lastname") String lastname){
        log.info("Search contact with lastname like :"+lastname);
        return new ResponseEntity<>(contactService.searchWithLastName(lastname), HttpStatus.OK);
    }

    @CrossOrigin(origins ="*")
    @GetMapping("/search/")
    public ResponseEntity<?> searchAll(){
        log.info("Load all contacts");
        return new ResponseEntity<>(contactService.allPhoneNumbers(), HttpStatus.OK);
    }

    @CrossOrigin(origins ="*")
    @PostMapping
    public ResponseEntity<?> saveContact(@RequestBody Contact contact){
        log.info("Save contact with details:"+contact);
        return new ResponseEntity<>(contactService.saveContact(contact), HttpStatus.OK);
    }

    @CrossOrigin(origins ="*")
    @DeleteMapping("/delete/{phone-number}")
    public ResponseEntity<?> deleteContact(@PathVariable("phone-number") String phoneNumber){
        log.info("Delete contact with phone :"+phoneNumber);
        return new ResponseEntity<>(contactService.deleteContact(phoneNumber), HttpStatus.OK);
    }


}
