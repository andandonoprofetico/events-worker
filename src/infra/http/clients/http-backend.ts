import { API } from '@/utils/constants';
import axios from 'axios';
import http from 'http';
import https from 'https';

const AgentOptions = {
  keepAlive: true,
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 120000,
};

export const httpBackendClient = axios.create({
  baseURL: API.BACKEND_APP,
  httpAgent: new http.Agent(AgentOptions),
  httpsAgent: new https.Agent(AgentOptions),
});
