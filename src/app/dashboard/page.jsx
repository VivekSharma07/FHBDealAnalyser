import ProtectedLayout from "../../components/protected_layout";
import {auth} from '../../../firebase/firebaseConfig';

const Dashboard = () => {
  return <ProtectedLayout>
    {auth.currentUser && <div>Hey {auth.currentUser.email} </div>}
    {!auth.currentUser && <div>Hello</div>}
    
  </ProtectedLayout>;
};

export default Dashboard;
