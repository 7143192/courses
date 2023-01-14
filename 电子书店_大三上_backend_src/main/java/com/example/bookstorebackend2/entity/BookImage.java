package com.example.bookstorebackend2.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "images")
public class BookImage {
    @Id
    private int  id;
    private String image;

    public BookImage(int id, String image) {
        this.id = id;
        this.image = image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImage() {
        return this.image;
    }
}
