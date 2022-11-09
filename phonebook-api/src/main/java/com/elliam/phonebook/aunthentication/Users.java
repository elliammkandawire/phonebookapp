package com.elliam.phonebook.aunthentication;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
public class Users
{
    private String username;
    private String token;
    private String pwd;
}
