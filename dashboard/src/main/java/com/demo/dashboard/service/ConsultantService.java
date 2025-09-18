package com.demo.dashboard.service;


import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.spring.AiService;
import dev.langchain4j.service.spring.AiServiceWiringMode;
import reactor.core.publisher.Flux;

@AiService(
    wiringMode = AiServiceWiringMode.EXPLICIT,
        chatModel = "chatLanguageModel",
        streamingChatModel = "streamingChatLanguageModel"
)
public interface ConsultantService {

    @SystemMessage("""
    You are an expert academic advisor at a major university.
    Your purpose is to assist students with course selection, major exploration, and fulfilling graduation requirements.
    Provide accurate, clear, and supportive guidance. If you are unsure about specific program details,
    always advise the student to confirm with their official departmental advisor.
    Be encouraging and help them navigate their academic options.
    """)
    String chat(String message);
    Flux<String> chatStream(String message);
}
