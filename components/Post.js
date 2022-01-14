import { useEffect, useState } from 'react';
import { deletePost, updatePost } from '../lib/db';

const Post = ({ post, user }) => {
	const [editmode, setEditmode] = useState(null);
	const [formvalues, setFormvalues] = useState({});

	const handleEdit = (id) => {
		setEditmode(id);
		console.log('ID', id);
	};

	const handleUpdate = () => {
		const updatedPost = {
			title: formvalues.title,
			description: formvalues.description,
		};
		updatePost(updatedPost, post.id);
		setEditmode(false);
		setFormvalues({});
	};

	const handleChange = (e) => {
		setFormvalues({ ...formvalues, [e.target.name]: e.target.value });
	};
	useEffect(() => {
		setFormvalues({ title: post.title, description: post.description });
	}, [editmode]);

	return (
		<li>
			<div className='main'>
				<img src={post.avatar} alt='' width={40} />
				{editmode == post.id ? (
					<div>
						<div>
							<input type='text' value={formvalues.title} name='title' onChange={handleChange} />
						</div>
						<div>
							<input type='text' value={formvalues.description} name='description' onChange={handleChange} />
						</div>
					</div>
				) : (
					<div>
						<h3>{post.title}</h3>
						<p>{post.description}</p>
					</div>
				)}
			</div>
			<div className='footer'>
				<span>{post.createdAt?.toDate().toDateString()}</span>
				{user.uid == post.uid && (
					<div className='buttons'>
						{editmode ? (
							<button className='update' onClick={() => handleUpdate()}>
								Update
							</button>
						) : (
							<>
								<button className='edit' onClick={() => handleEdit(post.id)}>
									Edit
								</button>
								<button className='delete' onClick={() => deletePost(post.id)}>
									Delete
								</button>
							</>
						)}
					</div>
				)}
			</div>
		</li>
	);
};

export default Post;
