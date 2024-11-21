// import { Ionicons } from '@expo/vector-icons';
// import { Tabs } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';

// import { supabase } from '~/utils/supabase';

// const Browse = () => {
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const getAllTodos = async () => {
//     setLoading(true);
//     try {
//       const { data: todos, error } = await supabase.from('todos').select('*');
//       setLoading(false);
//       console.log(JSON.stringify(todos, null, 2));
//     } catch (error) {
//       console.log(JSON.stringify(error, null, 2));
//     }
//   };
//   useEffect(() => {
//     getAllTodos();
//   }, []);
//   return (
//     <>
//       <View>
//         <Text>Browse</Text>
//       </View>
//     </>
//   );
// };

// export default Browse;
import React from 'react';
import { View, Text } from 'react-native';

const Browse = () => {
  return (
    <View>
      <Text>Browse</Text>
    </View>
  );
};

export default Browse;
