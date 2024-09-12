import { StyleSheet } from "react-native";

export const onboardingQuestionsList = [
  {
    id: 0,
    title: "Get started on your glow-up journey today with Glow",
    subtitle: "",
    continueButton: "Continue", // You can specify button text here.
  },
  {
    id: 1,
    title: "Do you have a referral code?",
    subtitle: "Enter your code here, or skip",
    inputs: [
      { label: "Referral Code", placeholder: "Enter your code here, or skip" },
    ],
    continueButton: "Continue",
  },
  {
    id: 2,
    title: "Create your account",
    subtitle: "Get started on your glow-up journey today with Glow",
    showGoogleButton: true, // Add a flag to show the Google sign-in button.
  },
  {
    id: 3,
    title: "Enter your age",
    subtitle:
      "We'll use this information to personalize your recommendations and help you get the best results",
    inputs: [{ label: "Age", placeholder: "Enter your age" }],
    continueButton: "Continue",
  },
  {
    id: 4,
    title: "Beauty Goals",
    subtitle: "Select all that apply",
    options: ["Find the best products for me", "Goal 2", "Goal 3", "Goal 4"],
    continueButton: "Continue",
  },
  {
    id: 5,
    title: "Skin Concerns",
    subtitle: "Select all that apply",
    options: ["Oily", "Dry", "Sensitive", "Combination"],
    continueButton: "Continue",
  },
  {
    id: 6,
    title: "Product Preferences",
    subtitle: "Select all that apply",
    options: ["Oily", "Dry", "Sensitive", "Combination"],
    continueButton: "Continue",
  },
  {
    id: 7,
    title: "Makeup Preferences",
    subtitle: "Select all that apply",
    options: [
      "Find the best products for me0",
      "Find the best products for me1",
      "Find the best products for me2",
      "Find the best products for me3",
      "Find the best products for me4",
      "Find the best products for me5",
    ],
    continueButton: "Continue",
  },
  {
    id: 8,
    title: "Leave a rating",
    subtitle:
      "Support us so that we could build the best glow up experience for you.",
    continueButton: "Continue", // You can specify button text here.
  },
];

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
  },
  headerContainer: {
    flex: 0.7, // Logo and progress bar section gets 15% of the screen
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 0.5,
    paddingHorizontal: 40,
    overflow: "auto",
  },
  logo: {
    // width: 150,
    height: 35,
    resizeMode: "contain",
    marginVertical: 5,
  },
  progressBar: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  activeDot: {
    flex: 1,
    height: 4,
    backgroundColor: "#836E89", // Active color
    borderRadius: 2,
    marginHorizontal: 2,
  },
  inactiveDot: {
    flex: 1,
    height: 4,
    backgroundColor: "#E6D8E1", // Inactive color
    borderRadius: 2,
    marginHorizontal: 2,
  },
  contentContainer: {
    flex: 3, // Content section (title, input fields, placeholders) gets 40% of the screen
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#836E89", // Text color
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitleCaption: {
    fontSize: 12,
    color: "#836E89", // Subtitle color
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#836E89", // Subtitle color
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  imagePlaceholder: {
    width: 260,
    height: 260,
    backgroundColor: "#E6D8E1", // Placeholder color
    borderRadius: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#836E89",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#F9F3F8",
  },
  footerContainer: {
    flex: 1.5, // Button section gets 15% of the screen
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#836E89", // Button color
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  radioButton: {
    borderWidth: 2,
    borderColor: "#836E89",
    borderRadius: 50,
    padding: 15,
    marginVertical: 5,
    width: "100%",
    textAlign: "center",
  },
  radioButtonSelected: {
    borderWidth: 2,
    borderColor: "#836E89",
    // backgroundColor: '#836E89',
    backgroundColor: "white",
    borderRadius: 50,
    padding: 15,
    marginVertical: 5,
    width: "100%",
    textAlign: "center",
  },
  radioActiveDot: {
    width: 16,
    height: 16,
    backgroundColor: "#836E89", // Active color
    borderRadius: 50,
    borderColor: "#836E89",
    borderWidth: 2,
    marginHorizontal: 2,
  },
  radioInactiveDot: {
    width: 16,
    height: 16,
    backgroundColor: "white", // Inactive color
    borderRadius: 50,
    borderColor: "#836E89",
    borderWidth: 2,
    marginHorizontal: 2,
  },
  radioButtonText: {
    color: "#836E89",
  },
});
