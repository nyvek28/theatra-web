import { Settings } from '@/lib/settings'

const settings = Settings.getInstance();

interface RequestOptions {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: BodyInit;
}

class HttpClient {
  private uri: string;

  constructor(uri: string) {
    console.log("Initializing API Client");
    console.log({ uri })
    
    // if (!uri) throw Error('cannot initialize api client. uri not provided')
    this.uri = uri;
  }

  private async request(url: string, options: RequestOptions) {
    console.log('Fetching to: ', url);
    
    return fetch(url, {
      method: options.method,
      body: options.body
    }).then(res => res.json())
  }

  private buildURL(resource: string) {
    return `${this.uri}${resource}`;
  }

  async get(resource: string) {
    const url = this.buildURL(resource);
    return this.request(url, {
      method: 'GET',
    })
  }

  async post(resource: string, body?: BodyInit) {
    const url = this.buildURL(resource);
    return this.request(url, {
      method: 'POST',
      body,
    })
  }
}

export const coreApiClient = new HttpClient(settings.CORE_API_URI)

