"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Form from "@components/Form";
import { toast } from 'react-toastify';

const CreatePrompt = () => {
  const notify = () => toast("Wow so easy!");
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tags: [] });



  const createPrompt = async (e) => {

    e.preventDefault();
    setIsSubmitting(true);

    const prompt = {
      prompt: post.prompt,
      userId: session?.user.id,
      tags: post.tags,
    }

    try {
      const response = await axios.post('/api/prompt/new', prompt);
      if (response.data.message) {
        toast.success(response.data.message);
        router.push('/')
      }
      else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Axios request failed:", error);
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }



  };

  return (

    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
