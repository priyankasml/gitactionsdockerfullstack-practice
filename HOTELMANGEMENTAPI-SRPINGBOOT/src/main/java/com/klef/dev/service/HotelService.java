package com.klef.dev.service;

import com.klef.dev.model.Hotel;
import com.klef.dev.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public List<Hotel> getAllHotels() { return hotelRepository.findAll(); }

    public Optional<Hotel> getHotelById(Long id) { return hotelRepository.findById(id); }

    public Hotel createHotel(Hotel hotel) { return hotelRepository.save(hotel); }

    public Hotel updateHotel(Long id, Hotel hotelDetails) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotel.setName(hotelDetails.getName());
        hotel.setLocation(hotelDetails.getLocation());
        hotel.setRoomsAvailable(hotelDetails.getRoomsAvailable());
        hotel.setType(hotelDetails.getType());
        hotel.setRating(hotelDetails.getRating());
        return hotelRepository.save(hotel);
    }

    public void deleteHotel(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotelRepository.delete(hotel);
    }
}
