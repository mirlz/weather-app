import { observer } from 'mobx-react-lite';
import { Result } from 'antd';

const Error = observer(() => {
    return (
        <Result
            className="error"
            status={500}
            title={500}
            subTitle={"Sorry, something went wrong."}
        />
    )
});

export default Error;