package com.demo.dashboard.config;


import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import dev.langchain4j.model.googleai.GoogleAiGeminiStreamingChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.chat.StreamingChatModel;

@Configuration
public class AiChatConfig {

    private String api_key=System.getenv("GEMINI_API_KEY");
    @Bean
    public ChatModel chatLanguageModel()
    {

        return GoogleAiGeminiChatModel.builder()
                .modelName("gemini-2.0-flash")
                .apiKey(api_key)
                .logRequestsAndResponses(true)
                .build();
    }

    @Bean
    public StreamingChatModel streamingChatLanguageModel()
    {
        return GoogleAiGeminiStreamingChatModel.builder()
                .modelName("gemini-2.0-flash")
                .apiKey(api_key)
                .build();
    }

}
