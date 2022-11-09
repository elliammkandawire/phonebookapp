package com.elliam.phonebook.entity;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class Contact {
    @Id
    private String phoneNumber;
    private String firstname;
    private String lastname;

    @Column(nullable = true)
    private Date created_at;

    @PrePersist
    void preInsert() {
        if (this.created_at == null)
            this.created_at = new Date();
    }
}
