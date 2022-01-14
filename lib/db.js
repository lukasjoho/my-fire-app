import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
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

export const deletePost = async (id) => {
	const docRef = doc(firestore, 'posts', id);
	return await deleteDoc(docRef);
};

export const updatePost = async (data, id) => {
	const postRef = doc(firestore, 'posts', id);
	await updateDoc(postRef, { title: data.title, description: data.description, lastUpdatedAt: serverTimestamp() });
};
