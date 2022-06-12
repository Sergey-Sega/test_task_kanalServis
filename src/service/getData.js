import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/'
const axiosInstanse = axios.create({baseURL: BASE_URL});

export const fetchData = async (url) => {
  try {
    const response = await axiosInstanse({
      url,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.log('error');
  }
};

export const deleteData = async (url) => {
  try {
    const response = await axiosInstanse({
      url,
      method: 'DELETE',
    });
    return response.data;
  } catch (error) {
    console.log('error');
  }
};