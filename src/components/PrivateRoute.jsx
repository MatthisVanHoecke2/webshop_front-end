import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSession } from '../contexts/AuthProvider';
import { useMessage } from '../contexts/DialogProvider';

export default function PrivateRoute({ children, errorMessage, requireAdmin }) {
	const { ready, user, loading } = useSession();
	const { setShowMessage, setMessage, setMessageTitle } = useMessage();
	const [child, setChild] = useState((<></>));
	const navigate = useNavigate();

	useEffect(() => {
		if(!loading) {
			if(!ready || (requireAdmin && !user?.isAdmin)) {
				setMessage(errorMessage);
				setMessageTitle('Error');
				setShowMessage(true);
				navigate('/');
			}
			else if((ready && requireAdmin && user?.isAdmin) || (ready && !requireAdmin)) {
				setChild(children);
			}
		}
	}, [children, errorMessage, navigate, ready, requireAdmin, setMessage, setShowMessage, setMessageTitle, user, loading]);

	return (
		 child
			
		
	);
}