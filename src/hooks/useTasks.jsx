import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  const fetch = () => {
    axios
      .get('/api/tasks/status')
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return [tasks, fetch];
}
