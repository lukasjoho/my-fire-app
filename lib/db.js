import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';

const postsRef = collection(firestore, 'posts');

export const createUser = async (data) => {
	const user = await setDoc(doc(firestore, 'users', data.uid), { ...data, lastLoginAt: serverTimestamp() });
	return user;
};

export const createPost = async (data) => {
	const post = await addDoc(postsRef, { ...data, createdAt: serverTimestamp() });
	return post;
};
