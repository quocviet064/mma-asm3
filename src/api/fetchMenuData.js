const API_URL = "https://66fa9024afc569e13a9c3a86.mockapi.io/menu";

export const fetchMenuData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi lấy dữ liệu:", error);
    return [];
  }
};

export const deleteProductFromAPI = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error);
  }
};

export const updateProductInAPI = async (id, updatedProduct) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    return await response.json();
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error);
    throw error;
  }
};

export const addProductToAPI = async (newProduct) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    return await response.json();
  } catch (error) {
    console.error("Lỗi thêm sản phẩm:", error);
    throw error;
  }
};
