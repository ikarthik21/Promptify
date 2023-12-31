'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Profile from '@components/Profile';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (session?.user?.id) {
      (
        async () => {
          try {
            const response = await axios.get(`/api/users/${session?.user.id}/posts`);
            setPosts(response.data.prompts);
          } catch (error) {
            console.log(error)
          }
        }
      )();
    }
  }, [session?.user?.id])



  const handleEdit = (post) => {

    router.push(`/update-prompt?id=${post._id}`)

  }

  const handleDelete = async (post) => {

    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await axios.delete(`/api/prompt/${post._id.toString()}`);
        const filteredPosts = posts.filter((item) => item._id !== post._id);
        setPosts(filteredPosts);
        toast.success("Prompt deleted successfully");
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    }

  }
  return (
    <Profile name="My" desc="Welcome to your profile page" data={posts} handleEdit={handleEdit} handleDelete={handleDelete}>
    </Profile>
  )
}

export default MyProfile