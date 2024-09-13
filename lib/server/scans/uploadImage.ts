// Assume you have a function to upload the image to your backend
export const uploadImageToNeonDB = async (imageUri: string) => {
  try {
    const imageResponse = await fetch(imageUri);
    const blob = await imageResponse.blob();
    const formData = new FormData();
    formData.append('file', blob, 'selfie.jpg');

    const uploadResponse = await fetch('https:///....com/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return await uploadResponse.json();
  } catch (error) {
    console.error('Error uploading image', error);
    return { success: false };
  }
};
