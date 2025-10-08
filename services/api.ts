
const API_BASE = 'https://api.cassini-org.info';

// Mock data for development
const MOCK_DATA = {
  teachers: [
    {
      "id": "19ceeff4-c5d0-4d6d-8627-855215ef3702",
      "name": "Luca Dalma",
      "image": "../assets/images/partial-react-logo.png",
      "description": "<p>Jelenleg a Babes-Bolyai Tudományegyetemen vagyok Bölcsészettudományi karon hallgató, angol-román nyelv és irodalom szakon.</p>",
      "subjects": ["Román"]
    },
    {
      "id": "273b6e04-8ac3-4027-9d40-82d18356d833",
      "name": "Keresztessi Csilla",
      "image": "../assets/images/partial-react-logo.png",
      "description": "<p>Keresztessi Csilla vagyok, 20 éves. Középiskolai tanulmányaimat a Mihai Eminescu Pedagógiai Főgimnázium óvó-tanítóképző szakán végeztem.</p>",
      "subjects": ["Földrajz"]
    }
  ],
  subjects: ["Román", "Földrajz", "Magyar", "Matematika", "Angol", "Informatika", "Fizika", "Kémia", "Biológia", "Történelem"],
  blogPosts: [
    {
      "id": 1,
      "title": "Szeptember kezdés",
      "summary": "Az új tanév elkezdődött! Sok sikert kívánunk minden diákunknak az új tanévhez.",
      "date": "2023-09-01",
      "tag": "Hírek"
    },
    {
      "id": 2,
      "title": "Őszi szünet",
      "summary": "Az őszi szünet október 23-tól november 3-ig tart. Kellemes pihenést kívánunk!",
      "date": "2023-10-01",
      "tag": "Események"
    }
  ]
};

const isDevelopment = process.env.NODE_ENV === 'development';
const isWeb = Platform.OS === 'web';

const getApiUrl = (endpoint: string) => {
  return `${API_BASE}${endpoint}`;
};
import { Platform } from 'react-native';

const DEFAULT_TIMEOUT = 7000; // ms

async function tryFetch(url: string, timeout = DEFAULT_TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    console.log('[api] Making request to:', url);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // For web, don't include credentials unless specifically needed
      credentials: 'omit',
      signal: controller.signal,
      mode: 'cors',
    });
    clearTimeout(id);
    console.log('[api] Response status:', res.status, 'headers:', JSON.stringify(Object.fromEntries(res.headers.entries())));
    return res;
  } catch (err) {
    clearTimeout(id);
    console.error('[api] Network error:', err);
    if (err instanceof Error) {
      console.error('[api] Error name:', err.name, 'message:', err.message);
    }
    throw err;
  }
}

async function fetchData<T>(endpoint: string): Promise<T> {
  const url = getApiUrl(endpoint);
  console.log('[api] Attempting', url);
  
  try {
    const res = await tryFetch(url);
    console.log('[api] Response status', res.status, res.statusText, 'from', url);

    if (!res.ok) {
      const text = await res.text().catch(() => '<<no body>>');
      console.warn('[api] Non-ok response', { url, status: res.status, body: text });
      throw new ApiError(`HTTP ${res.status}: ${text || res.statusText}`);
    }

    // Try parse JSON
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      // If the response is plain text but contains JSON, attempt parse
      try {
        return JSON.parse(text) as T;
      } catch (e) {
        throw new ApiError(`Invalid JSON response (content-type: ${contentType})`);
      }
    }

    const data = (await res.json()) as T;
    console.log('[api] Success from', url);
    return data;
  } catch (err: any) {
    // network error, timeout, CORS, DNS, etc.
    const msg = err?.name === 'AbortError' ? 'timeout' : (err?.message || String(err));
    console.error('[api] Request failed for', url, msg);
    throw new ApiError(msg);
  }
}

export interface Teacher {
  id: string;
  image: string;
  name: string;
  description: string;
  subjects: string[];
}

export interface TeacherResponse {
  success: boolean;
  data: Teacher[];
  error?: string;
}

export class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function getSubjects(languageCode: string): Promise<string[]> {
  try {
    console.log('Fetching subjects with language:', languageCode);
    return fetchData<string[]>(`/Subject/list?languageCode=${languageCode}`);
  } catch (error) {
    console.error('Failed to fetch subjects:', error);
    throw error;
  }
}

export interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  tag: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    if (isDevelopment) {
      // In development, return mock data
      return MOCK_DATA.blogPosts;
    }

    return await fetchData<BlogPost[]>('/Blog/list');
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    throw error;
  }
}

export async function getTeachers(languageCode: string = 'hu'): Promise<Teacher[]> {
  try {
    console.log('Fetching teachers with language:', languageCode);

    const endpoint = `/Teacher/list?languageCode=${languageCode}`;
    const url = getApiUrl(endpoint);
    console.log('Making request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new ApiError('Invalid response format from server');
    }

    // Validate and transform the data
    const validatedData = data.map(teacher => ({
      ...teacher,
      image: teacher.image?.trim() || '',
      subjects: Array.isArray(teacher.subjects) ? teacher.subjects : [],
      description: teacher.description || '',
    }));

    // Sort teachers by name
    return validatedData.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Failed to fetch teachers:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error instanceof Error ? error.message : 'Failed to fetch teachers');
  }
}