package com.klef.dev.controller;

import com.klef.dev.model.Hotel;
import com.klef.dev.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "http://localhost:5173") // React frontend
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping
    public List<Hotel> getAllHotels() { return hotelService.getAllHotels(); }

    @GetMapping("/{id}")
    public Hotel getHotelById(@PathVariable Long id) {
        return hotelService.getHotelById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
    }

    @PostMapping
    public Hotel createHotel(@RequestBody Hotel hotel) { return hotelService.createHotel(hotel); }

    @PutMapping("/{id}")
    public Hotel updateHotel(@PathVariable Long id, @RequestBody Hotel hotel) {
        return hotelService.updateHotel(id, hotel);
    }

    @DeleteMapping("/{id}")
    public void deleteHotel(@PathVariable Long id) { hotelService.deleteHotel(id); }
}
