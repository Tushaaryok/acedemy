
import api from './lib/api.js';

async function test() {
  try {
    const res = await api.get('/batches');
    console.log('STATUS:', res.status);
    console.log('DATA:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.error('ERROR STATUS:', err.response.status);
      console.error('ERROR DATA:', err.response.data);
    } else {
      console.error('ERROR:', err.message);
    }
  }
}

test();
