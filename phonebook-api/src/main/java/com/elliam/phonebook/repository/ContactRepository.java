package com.elliam.phonebook.repository;


import com.elliam.phonebook.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, String> {
    @Query(nativeQuery = true, value = "SELECT * FROM contact ORDER BY firstname ASC")
    List<Contact> findAllOrderByCreatedAtDesc();

    @Query(nativeQuery = true, value = "SELECT * FROM contact WHERE lastname LIKE %:lastname% ORDER BY firstname ASC")
    List<Contact> searchWithLastName(String lastname);
}
