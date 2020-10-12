import axios from 'axios';

const baseURL = process.env.REACT_API_URL || 'http://localhost:5000';

export default axios.create({ baseURL });
