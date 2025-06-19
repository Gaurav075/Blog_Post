import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Upload image to Cloudinary
export const uploadImage = async (file) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      return {
        success: false,
        message: 'Authentication required'
      };
    }

    // Create FormData
    const formData = new FormData();
    formData.append('image', file);

    // Upload to backend
    const response = await axios.post(`${API_URL}/upload/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      success: true,
      imageUrl: response.data.imageUrl,
      publicId: response.data.publicId,
      message: response.data.message
    };

  } catch (error) {
    console.error('Upload error:', error);
    
    if (error.response?.data?.message) {
      return {
        success: false,
        message: error.response.data.message
      };
    }
    
    return {
      success: false,
      message: 'Failed to upload image. Please try again.'
    };
  }
};

// Delete image from Cloudinary (for future use)
export const deleteImage = async (publicId) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return {
        success: false,
        message: 'Authentication required'
      };
    }

    const response = await axios.delete(`${API_URL}/upload/image`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: { publicId }
    });

    return {
      success: true,
      message: response.data.message
    };

  } catch (error) {
    console.error('Delete error:', error);
    
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete image'
    };
  }
};
