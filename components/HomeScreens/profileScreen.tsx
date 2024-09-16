import { images } from '@/constants'; // Assuming this is the same images object you provided
import React from 'react';
import {
  Image,
  ImageBackground,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../constants/onboarding'; // Assuming this is the same shared styles object

const ProfileScreen = () => {
  return (
    <ImageBackground
      resizeMode='cover'
      source={images.homeBgLarger} // Background image
      style={styles.container}
    >
      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar barStyle='dark-content' backgroundColor='#6a51ae' />

        {/* Logo and Header */}
        <View style={localStyles.logoContainer}>
          <Image source={images.glowTitle} style={styles.logo as ImageStyle} />
        </View>

        {/* Title */}
        <View style={styles.headerContainer}>
          <Text
            style={{
              ...styles.title,
              fontSize: 30,
              fontWeight: '600',
              letterSpacing: -0.8,
              marginTop: 10, // Reduce top margin
            }}
          >
            Profile
          </Text>
        </View>

        {/* Main Content */}
        <View style={{ ...styles.contentContainer, marginTop: 20, flex: 4.5 }}>
          <ScrollView
            style={localStyles.scrollView}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 30,
              width: '100%',
              marginBottom: 10,
            }}
          >
            {/* Face Scans Section */}
            <TouchableOpacity style={localStyles.section}>
              <Text style={localStyles.sectionText}>
                Face Scans - September
              </Text>
            </TouchableOpacity>

            {/* Personal Section */}
            <Text style={localStyles.sectionHeader}>PERSONAL</Text>
            <TouchableOpacity style={localStyles.section}>
              <Text style={localStyles.sectionText}>My SkinID</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.section}>
              <Text style={localStyles.sectionText}>Scan your face</Text>
            </TouchableOpacity>

            {/* Help & Support Section */}
            <Text style={localStyles.sectionHeader}>HELP & SUPPORT</Text>
            <TouchableOpacity style={localStyles.section}>
              <Text style={localStyles.sectionText}>
                Frequently Asked Questions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.section}>
              <Text style={localStyles.sectionText}>Suggest a Feature</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.section}>
              <Text style={localStyles.sectionText}>Contact us</Text>
            </TouchableOpacity>

            {/* Legal Section */}
            <Text style={localStyles.sectionHeader}>LEGAL</Text>
            <TouchableOpacity style={localStyles.section}>
              <Text style={localStyles.sectionText}>Privacy policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.section}>
              <Text style={localStyles.sectionText}>Money-back Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.section}>
              <Text style={localStyles.sectionText}>Terms of Use</Text>
            </TouchableOpacity>

            {/* Log Out & Delete Account Section */}
            <TouchableOpacity style={localStyles.logoutButton}>
              <Text style={localStyles.logoutText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.deleteAccountButton}>
              <Text style={localStyles.deleteAccountText}>Delete Account</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{ ...styles.footerContainer, flex: 0.7 }}></View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginVertical: 20,
  },
  section: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  sectionText: {
    fontSize: 16,
    color: '#000',
  },
  sectionHeader: {
    fontSize: 14,
    color: '#6c757d',
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  deleteAccountButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  deleteAccountText: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
});

export default ProfileScreen;
