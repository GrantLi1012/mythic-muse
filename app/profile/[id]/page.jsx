"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
  const [myPosts, setMyPosts] = useState([]);
  const username = useSearchParams().get('name');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={username + "'s"}
      desc="Welcome to your personalized profile page"
      data={myPosts}
    />
  )
}

export default UserProfile