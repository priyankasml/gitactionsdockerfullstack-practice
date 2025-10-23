package com.klef.dev.model;

import jakarta.persistence.*;

@Entity
@Table(name = "hotels")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private int roomsAvailable;
    private String type;
    private int rating;

    public Hotel() {}

    public Hotel(String name, String location, int roomsAvailable, String type, int rating) {
        this.name = name;
        this.location = location;
        this.roomsAvailable = roomsAvailable;
        this.type = type;
        this.rating = rating;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public int getRoomsAvailable() { return roomsAvailable; }
    public void setRoomsAvailable(int roomsAvailable) { this.roomsAvailable = roomsAvailable; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
}
