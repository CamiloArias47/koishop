import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { authChanged } from "firebaseApi/auth/userState"
import { useUI } from 'components/UIcontext'

const withAuth = (WrappedComponent) => {
  return props => {
    const Router = useRouter();
    const { setUser } = useUI()
    const [verified, setVerified] = useState(false);

    useEffect(async () => {
        authChanged( user => {
            if(user){
              console.log({user})
                setUser(user)
                setVerified(true)
            }
            else{
                Router.replace("/");
            }
        })
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;