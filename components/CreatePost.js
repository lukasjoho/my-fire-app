import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createPost } from '../lib/db';
import { auth } from '../lib/firebase';

const CreatePost = () => {
	const [user] = useAuthState(auth);
	const [formvalues, setFormvalues] = useState({ title: '', description: '' });
	const handleChange = (e) => {
		setFormvalues({ ...formvalues, [e.target.name]: e.target.value });
	};
	const handleClick = async (e) => {
		if (formvalues.title == '' || formvalues.description == '') {
			e.preventDefault();
			alert('Please fill out all fields!');
		} else {
			e.preventDefault();
			const newPost = {
				...formvalues,
				avatar: user.photoURL,
				uid: user.uid,
			};
			createPost(newPost);
			setFormvalues({ title: '', description: '' });
		}
	};
	return (
		<div>
			<h2>Create Post</h2>
			<form onSubmit={handleClick} className='createpost'>
				<input value={formvalues.title} onChange={handleChange} type='text' placeholder='Title' name='title' />
				<input value={formvalues.description} onChange={handleChange} type='text' placeholder='Description' name='description' />
				<button className='create'>Create Post</button>
			</form>
		</div>
	);
};

export default CreatePost;
