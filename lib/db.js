import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';

export const createUser = async (data) => {
	const user = await setDoc(doc(firestore, 'users', data.uid), { ...data, lastLoginAt: serverTimestamp() });
	return user;
};
