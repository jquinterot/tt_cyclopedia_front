import { useEffect, useState } from "react";
import { User } from "../types/User";
import axios from 'axios';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<User[]>('https://ttcyclopediaback-production.up.railway.app/users');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchData();
    }, []);
  
  return { users };
};