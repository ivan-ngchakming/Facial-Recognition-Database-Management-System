import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  const fetch = useCallback(() => {
    axios
      .get('/api/tasks/status')
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return [tasks, fetch];
}
