import { Button, Result } from 'antd';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';

const Notfound = () => {
    const {  navigate } = useContext(AppContext)
    return (
        <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={()=>navigate("/")} type="primary">Back Home</Button>}
    />
    )
};
export default Notfound;