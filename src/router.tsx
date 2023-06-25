import { createBrowserRouter } from 'react-router-dom';
import { IndexPage } from './pages/index';
import { Result } from './pages/result';


export default createBrowserRouter([
    {
        'path': '/index',
        'element': <IndexPage></IndexPage>
    },
    {
        'path': '/result/:id',
        'element': <Result></Result>
    }
])