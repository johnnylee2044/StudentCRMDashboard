package com.demo.dashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import com.demo.dashboard.service.*;

import com.demo.dashboard.DTO.ChatRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api")
public class ChatController {
    @Autowired
    private ConsultantService consultantService;

    @RequestMapping("/chat")
    public String chat(@RequestParam String message) {

        String result = consultantService.chat(message);
        System.out.println("this is response from llm" + result.toString());
        return result;
    }

    @PostMapping("/chatStream")
    public Flux<String> chatStream(@RequestBody ChatRequest request) {
        return consultantService.chatStream(request.getMessage());
    }

}