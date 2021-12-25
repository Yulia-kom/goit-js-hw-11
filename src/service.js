import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api";
const API_KEY = "24753689-56dc21f0a68faf374c919d39f";

export const PER_PAGE = 40;

export const searchApi = async (query, page) => {
    const params = new URLSearchParams({
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE,
        page: page,
        q: query,
        key: API_KEY
    });

    const res = await axios.get('', { params });
    return res.data;
}
