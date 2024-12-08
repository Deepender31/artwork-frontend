import axios from "axios";

const API_URL = "https://artwork-backend-production.up.railway.app/";

// Add axios interceptors
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("currentUser", response.data.user);
    } else {
      throw new Error("Invalid credentials");
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

// Artwork APIs
export const artworkAPI = {
  getAllArtworks: async () => {
    const response = await axios.get(`${API_URL}/artwork`);
    return response.data;
  },

  getArtworksByCategory: async (category) => {
    const response = await axios.get(`${API_URL}/artwork?category=${category}`);
    return response.data;
  },

  createArtwork: async (artworkData) => {
    try {
      const formData = new FormData();

      // If artworkData contains an image file, append it to FormData
      if (artworkData.image) {
        formData.append("image", artworkData.image);
      }

      // Append other artwork data
      Object.keys(artworkData).forEach((key) => {
        if (key !== "image") {
          formData.append(key, artworkData[key]);
        }
      });

      const response = await axios.post(`${API_URL}/artwork`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating artwork:", error);
      throw error;
    }
  },

  updateArtwork: async (id, artworkData) => {
    const response = await axios.put(`${API_URL}/artwork/${id}`, artworkData);
    return response.data;
  },

  deleteArtwork: async (id) => {
    const response = await axios.delete(`${API_URL}/artwork/${id}`);
    return response.data;
  },

  getArtworksByArtist: async (artistId) => {
    const response = await axios.get(`${API_URL}/artwork/artist/${artistId}`);
    return response.data;
  },

  getArtworkById: async (artworkId) => {
    const response = await axios.get(`${API_URL}/artwork/${artworkId}`);
    return response.data;
  },
};

// Order APIs
export const orderAPI = {
  getOrders: async (userId) => {
    const response = await axios.get(`${API_URL}/orders/user/${userId}`);
    return response.data;
  },

  getOrdersByArtist: async (artistId) => {
    const response = await axios.get(`${API_URL}/orders/artist/${artistId}`);
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await axios.put(`${API_URL}/orders/${orderId}`, {
      status,
    });
    return response.data;
  },
};

// User APIs
export const userAPI = {
  getUserProfile: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  },

  updateUserProfile: async (userData) => {
    const response = await axios.put(`${API_URL}/users/profile`, userData);
    return response.data;
  },

  getAllArtist: async () => {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  },
};

// Like APIs
export const likeAPI = {
  likeArtwork: async (artworkId, userId) => {
    const response = await axios.post(`${API_URL}/artwork/${artworkId}/like`, {
      userId,
    });
    console.log(response);
    return response.data;
  },

  unlikeArtwork: async (artworkId, userId) => {
    const response = await axios.post(
      `${API_URL}/artwork/${artworkId}/unlike`,
      { userId }
    );
    console.log(response);
    return response.data;
  },

  getLikesByUser: async (userId) => {
    const response = await axios.get(`${API_URL}/artwork/liked/${userId}`);
    return response.data;
  },
};

// Comment APIs
export const commentAPI = {
  createComment: async (artworkId, commentData) => {
    const response = await axios.post(
      `${API_URL}/artwork/${artworkId}/comment`,
      commentData
    );
    return response.data;
  },
};
