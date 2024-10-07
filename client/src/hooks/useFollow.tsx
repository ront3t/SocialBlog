import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

const useFollow = () => {
    const queryClient = useQueryClient();

    const {mutate:follow, isPending} = useMutation({
        mutationFn: async (userId:string) => {
            const res = await fetch(`/api/user/follow/${userId}`,{
                method: 'POST',
            })
            const data = await res.json();
            if(!res.ok) throw new Error(data.error || 'something went wrong');
            return data;
        },
        onError: (err) => toast.error(err?.message || 'sucks'),
        onSuccess: () => {
            Promise.all([
                queryClient.invalidateQueries({queryKey:['suggestedUsers']}),
                queryClient.invalidateQueries({queryKey:['authUser']}),
            ])
        }
    })

    return {follow,isPending};
}

export default useFollow;