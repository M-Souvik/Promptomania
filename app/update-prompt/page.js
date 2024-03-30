'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Suspense } from 'react'; // Import Suspense
import Form from '@components/Form';

const EditPrompt = () => {
    const [submitting, setsubmitting] = useState(false);
    const router = useRouter();
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    // Define a fallback component for Suspense
    const LoadingFallback = () => <div>Loading...</div>;

    return (
        <Suspense fallback={<LoadingFallback />}> {/* Wrap the component in Suspense */}
            <EditPromptContent
                post={post}
                setPost={setPost}
                submitting={submitting}
                setsubmitting={setsubmitting} // Pass setsubmitting as a prop
                router={router}
            />
        </Suspense>
    );
};

const EditPromptContent = ({ post, setPost, submitting, setsubmitting, router }) => {
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };
        if (promptId) getPromptDetails();
    }, [promptId]);

    const UpdatePrompt = async (e) => {
        e.preventDefault();
        setsubmitting(true);
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });
            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setsubmitting(false);
        }
    };

    if (!promptId) return alert('Prompt Id not found');
    
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={UpdatePrompt}
        />
    );
};

export default EditPrompt;
