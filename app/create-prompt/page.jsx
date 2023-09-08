"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Form from "@components/Form";

const CreatePrompt = () => {
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
        alert(response.data.message);
      }
      else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Axios request failed:", error);
      // Show a general error message to the user
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
