
const API_URL = 'https://api.cassini-org.info/api';

const getApiUrl = () => {
  // Using the production API URL for all platforms
  return API_URL;
};

async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const url = `${getApiUrl()}${endpoint}`;
    console.log('API Request:', {
      url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('API Error Response:', text);
      throw new Error(`Error ${response.status}: ${text || response.statusText}`);
    }

    const data: T = await response.json();
    console.log('API Response Data:', data);
    return data;
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}

export interface Teacher {
  id: string;
  image: string;
  name: string;
  description: string;
  subjects: string[];
}

export async function getBlogPosts() {
  return fetchData('/BlogPost/get');
}

export async function getTeachers(languageCode: string = 'hu'): Promise<Teacher[]> {
  try {
    console.log('Fetching teachers with language:', languageCode);
    const data = await fetchData<Teacher[]>(`/Teacher/list?languageCode=${languageCode}`);
    // Sort teachers by name just like in the web version
    return data.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Failed to fetch teachers:', error);
    throw error;
  }
}