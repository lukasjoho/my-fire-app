import { auth, firestore } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUser } from '../lib/db';

export default function Home() {
	const [user] = useAuthState(auth);
	const SignInButton = () => {
		const provider = new GoogleAuthProvider();
		const signInWithGoogle = async () => {
			await signInWithPopup(auth, provider).then((result) => {
				const { user } = result;
				console.log(user);
				const userObj = {
					uid: user.uid,
					displayName: user.displayName,
					photoURL: user.photoURL,
					email: user.email,
				};
				createUser(userObj);
				return user;
			});
		};
		return (
			<button className='login' onClick={signInWithGoogle}>
				Sign In With Google
			</button>
		);
	};

	const LogOutButton = () => {
		const logOut = async () => {
			await signOut(auth);
		};
		return (
			<button className='logout' onClick={logOut}>
				Log Out
			</button>
		);
	};

	return (
		<div>
			{user ? (
				<div>
					You are logged in!
					<LogOutButton />
					<div>FEED</div>
					<pre>{JSON.stringify(user, null, 2)}</pre>
				</div>
			) : (
				<div>
					Please login!
					<SignInButton />
				</div>
			)}
		</div>
	);
}
