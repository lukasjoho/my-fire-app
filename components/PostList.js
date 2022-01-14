import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../lib/firebase';
import Post from './Post';

const PostList = () => {
	const [user] = useAuthState(auth);
	const [posts, setPosts] = useState([]);

	const postsRef = collection(firestore, 'posts');
	const q = query(postsRef, orderBy('createdAt', 'desc'));
	useEffect(() => {
		onSnapshot(q, (snapshot) => {
			setPosts(
				snapshot.docs.map((doc) => {
					const id = doc.id;
					console.log(doc.data());
					return { id, ...doc.data() };
				})
			);
		});
	}, []);
	return (
		<div>
			<h2>Feed</h2>
			<ul>
				{posts.map((post, postIdx) => {
					return <Post post={post} key={postIdx} user={user} />;
				})}
			</ul>
		</div>
	);
};

export default PostList;
