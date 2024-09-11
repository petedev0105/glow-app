export const onboardingQuestionsList = [
  {
    id: 0,
    title: "Trusted by thousands of people.",
    description: "",
    continueButton: "Continue", // You can specify button text here.
  },
  {
    id: 1,
    title: "Do you have a referral code?",
    inputs: [
      { label: "Referral Code", placeholder: "Enter your code here, or skip" },
    ],
    continueButton: "Continue",
  },
  {
    id: 2,
    title: "Create your account",
    description: "Get started on your glow-up journey today with Glow.",
    showGoogleButton: true, // Add a flag to show the Google sign-in button.
  },
  {
    id: 3,
    title: "Age",
    inputs: [{ label: "Age", placeholder: "Enter your age" }],
    continueButton: "Continue",
  },
  {
    id: 4,
    title: "Beauty Goals",
    options: [
      "Find the best products for me",
      "Goal 2",
      "Goal 3",
    ],
    continueButton: "Continue",
  },
  {
    id: 5,
    title: "Skin Concerns",
    options: [
      "Oily",
      "Dry",
      "Sensitive",
      "Combination",
    ],
    continueButton: "Continue",
  },
];

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  progressBar: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  activeDot: {
    width: 50,
    height: 5,
    backgroundColor: '#836E89', // Active color
    borderRadius: 5,
    marginHorizontal: 2,
  },
  inactiveDot: {
    width: 50,
    height: 5,
    backgroundColor: '#E6D8E1', // Inactive color
    borderRadius: 5,
    marginHorizontal: 2,
  },
  title: {
    fontSize: 24,
    color: '#836E89', // Text color
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#836E89', // Subtitle color
    textAlign: 'center',
    marginTop: 10,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#E6D8E1', // Placeholder color
    borderRadius: 20,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#836E89',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#F9F3F8',
  },
  button: {
    backgroundColor: '#836E89', // Button color
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#836E89',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: '100%',
    textAlign: 'center',
  },
  radioButtonSelected: {
    borderWidth: 1,
    borderColor: '#836E89',
    backgroundColor: '#836E89',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: '100%',
    textAlign: 'center',
  },
});
