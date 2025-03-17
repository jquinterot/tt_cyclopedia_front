import { useEffect, useState } from "react";
import { User } from "../types/User";
import { apiClient } from "../config/apiClient";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get<User[]>('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    return { users };
};