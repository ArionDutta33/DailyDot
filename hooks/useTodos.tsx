import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { Todos } from '~/types/todos';
import { supabase } from '~/utils/supabase';
const GetTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAllTodos = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.from('todos').select('*');
      setLoading(false);
      setTodos(data);
      setError('');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);
  return {
    todos,
    loading,
    error,
  };
};

export default GetTodos;