"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Form from "@components/Form";

const UpdatePrompt = () => {
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const { data: session } = useSession();

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tags: [] });

    useEffect(() => {
        (
            async () => {

                const resp = await axios.get(`/api/prompt/${promptId}`);
                console.log(resp.data.prompt);
                setPost(resp.data.prompt);
            }
        )();
    }, [])





    const updatePromptHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const prompt = {
            prompt: post.prompt,
            userId: session?.user.id,
            tags: post.tags,
        }

        if (!promptId) {
            return alert("Prompt Id not found!");
        }

        try {
            const response = await axios.patch(`/api/prompt/${promptId}`, prompt);
            if (response.data.message) {
                alert(response.data.message);
            }
            else {
                alert(response.data.error);
            }
        } catch (error) {
            console.error("Axios request failed:", error);

        } finally {
            setIsSubmitting(false);
        }



    };




    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePromptHandler}
        />
    );
};

export default UpdatePrompt;
