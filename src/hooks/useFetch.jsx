import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

// This custom hook helps to fetch data from Supabase
const useFetch = (cb, option = {}) => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(undefined);

    const { session } = useSession();

    const fn = async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const supaBaseAccessToken = await session.getToken({
                template: "supabase",
            });

            const response = await cb(supaBaseAccessToken, option, ...args);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { fn, data, loading, error };
};

export default useFetch;


