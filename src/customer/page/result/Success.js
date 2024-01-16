import React, { useContext, useEffect } from 'react';
import { Button, Result } from "antd";
import { AppContext } from "../../../Context/AppContext";
import { useParams } from "react-router-dom";

const Success = () => {
    const {navigate} = useContext(AppContext)

    return (
        <Result
            status="success"
            title="Đặt hàng thành công"
            extra={[
                <Button onClick={()=>navigate('/shop')} type="primary" key="console">
                    Quay lại mua hàng
                </Button>
            ]}
        />
    );
};

export default Success;