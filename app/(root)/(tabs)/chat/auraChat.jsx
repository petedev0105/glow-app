import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";

const auraChat = () => {
  //   const { title, tips, description, category } = useLocalSearchParams();
  const { details } = useLocalSearchParams();
  const { user } = useUser();
  const router = useRouter();
  const userId = user?.id; // Replace with actual user ID logic
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(details);

  const prompt = `You are an AI assistant. This is some data about an activity the user did or something that happened to the user. ${details} Based on the data, tailor your responses specifically to the topic in the template, ensuring they are helpful and actionable. Give responses as text. Use gen z terminology, give responses in all lowercase.`;

  console.log(prompt);
  const parsed = JSON.parse(details);

  const handleSend = async (message) => {
    if (message.trim()) {
      const userMessage = { text: message, user: true };
      setMessages((prev) => [...prev, userMessage]);
      setInputText("");
      setLoading(true);

      try {
        const response = await fetch("/(api)/(openai)/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
            name: "chat",
            prompt: prompt,
            userId: userId,
          }),
        });

        const data = await response.json();
        if (data.response) {
          setMessages((prev) => [
            ...prev,
            { text: data.response, user: false },
          ]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setMessages([]);
    handleSend("Give me advice");
  }, [details]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => router.replace(`chat`)}
          className="mr-4"
        >
          <Ionicons name="arrow-back" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Ionicons name="person" size={15} color="#4B5563" className="mr-5" />
        <Text className="ml-2 font-JakartaBold">Aura Coach</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <FlatList
          data={[...messages].reverse()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              className={`p-2 m-2 rounded-lg ${item.user ? "bg-blue-500 self-end" : "bg-gray-200 self-start"}`}
            >
              <Text
                className={`${item.user ? "text-white" : "text-black"} text-lg`}
              >
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          inverted
        />
        <View className="flex-row items-center p-4 border-t border-gray-200 mb-[60px]">
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2 text-lg"
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity
            onPress={() => handleSend(inputText)}
            className="bg-blue-500 rounded-full p-3"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Ionicons name="send" size={15} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default auraChat;
