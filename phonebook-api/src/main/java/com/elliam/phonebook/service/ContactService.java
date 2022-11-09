package com.elliam.phonebook.service;


import com.elliam.phonebook.entity.Contact;
import com.elliam.phonebook.entity.ResponseTemplate;
import com.elliam.phonebook.repository.ContactRepository;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ContactService {

    @Autowired
    ContactRepository contactRepository;

    ResponseTemplate response =new ResponseTemplate();

     public List<Contact> allPhoneNumbers(){
         return contactRepository.findAllOrderByCreatedAtDesc();
     }

     public Contact oneContact(String phoneNumber){
          return contactRepository.findById(phoneNumber).get();
     }

     public Object saveContact(Contact contact){
         try {
             return contactRepository.save(contact);
         }catch(Exception e){
             e.printStackTrace();
         }
         response.setStatus(false);
         response.setMessage("Save failed");
         return response;
     }

     public ResponseTemplate deleteContact(String phoneNumber){
          contactRepository.deleteById(phoneNumber);
          response.setStatus(true);
          response.setMessage("Contact deleted successfully");
          if(contactRepository.findById(phoneNumber).isPresent()){
              response.setStatus(false);
              response.setMessage("Contact deleted failed!");
          }
         return response;
     }

    public List<Contact> searchWithLastName(String lastname) {
        return contactRepository.searchWithLastName(lastname);
    }
}
