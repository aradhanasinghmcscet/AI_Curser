import { useState } from 'react';

const usePostSubmit = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState(null);

  const submitData = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setResponse(result);
      setSuccess(true);
      return { success: true, data: result };

    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };

    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setResponse(null);
  };

  return {
    submitData,
    loading,
    error,
    success,
    response,
    reset
  };
};

export default usePostSubmit; 