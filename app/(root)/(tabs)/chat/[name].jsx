import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons"; // Import the icon library

const ChatbotConversation = () => {
  const { name, prompt } = useLocalSearchParams();
  const { user } = useUser();
  const router = useRouter();
  const userId = user; // Replace with actual user ID logic
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    setMessages([
      { text: `This is ${name}, how can I help you?`, user: false },
      ...messages,
    ]);
  }, []);

  const handleSend = async () => {
    if (inputText.trim()) {
      const markdownText = parseMarkdown(inputText); // Parse input text to Markdown
      setMessages([...messages, { text: markdownText, user: true }]);
      setInputText("");
      setLoading(true); // Set loading to true

      console.log("called chat api");

      try {
        console.log("calling chat api...");
        const response = await fetch("/(api)/(openai)/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: inputText,
            name: name,
            prompt: prompt,
            userId: userId, // Include user ID
          }),
        });

        const data = await response.json();
        console.log(data);
        if (data.response) {
          setMessages((prev) => [
            ...prev,
            { text: data.response, user: false },
          ]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    }
  };

  // Function to parse text to Markdown (simple example)
  const parseMarkdown = (text) => {
    return text
      .replace(/__(.+?)__/g, "<strong>$1</strong>") // Bold
      .replace(/_(.+?)_/g, "<em>$1</em>") // Italics
      .replace(/`(.+?)`/g, "<code>$1</code>"); // Inline code
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#4B5563" />
        </TouchableOpacity>
        <MaterialIcons name="chat" size={20} color="#4B5563" className="" />
        <Text className="ml-2 text-xl font-JakartaBold text-white">{name}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0} // Adjusted offset
      >
        <FlatList
          data={[...messages].reverse()} // Reverse the messages for correct order
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              className={` p-2 m-2 rounded-lg ${item.user ? "bg-blue-500 self-end" : "bg-gray-200 self-start"}`}
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
            onPress={handleSend}
            className="bg-blue-500 rounded-full p-3"
            disabled={loading} // Disable button when loading
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

export default ChatbotConversation;
