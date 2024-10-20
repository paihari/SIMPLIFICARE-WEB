import axios from 'axios';


// First check process.env for environment variables, then fallback to window.env

const BASE_URL = process.env.REACT_APP_BASE_URL || window.env.REACT_APP_BASE_URL || 'default-url';
const TOKEN = process.env.REACT_APP_API_TOKEN || window.env.REACT_APP_API_TOKEN || 'default-token';
  

  // POST: Trigger the job
export const runJob = async () => {

  // console.log('API Token:', TOKEN);
  // console.log('Base URL:', BASE_URL);

  const url = `${BASE_URL}/jobs/run/p/f/simplificare/magical_script`;

  const body = {};

  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`
      }
    });

    console.log('The response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error running job:', error);
    throw error;
  }
};

// GET: Poll the job result until it's completed
export const getJobResult = async (uuid) => {
  console.log("Polling job result for UUID:", uuid);
  const url = `${BASE_URL}/jobs_u/completed/get_result_maybe/${uuid}`;
  console.log("URL:", url);

  while (true) {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      });

      const { completed, result } = response.data;

      if (completed) {
        console.log('Job completed:', result);
        return result;  // Return the result once the job is completed
      } else {
        console.log('Job still in progress...');
        await new Promise((resolve) => setTimeout(resolve, 1000));  // Wait for 1 second before polling again
      }
    } catch (error) {
      console.error('Error checking job status:', error);
      throw error;
    }
  }
};
