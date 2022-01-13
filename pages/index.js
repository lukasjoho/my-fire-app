import { auth, firestore } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
	const [user] = useAuthState(auth);
	const SignInButton = () => {
		const provider = new GoogleAuthProvider();
		const signInWithGoogle = async () => {
			await signInWithPopup(auth, provider).then((result) => {
				const { user } = result;
				console.log(user);
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
