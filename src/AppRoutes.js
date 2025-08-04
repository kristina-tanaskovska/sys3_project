import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import LessonDetails from './components/LessonDetails';
import App from './App';
import CreateNews from './components/news/CreateNews';
import SuccessPage from './components/shared/SuccessPage';
import Home from './components/home/Home';
import Counter from './components/counter/Counter';
import Register from './components/Register';
import Login from './components/Login';
import Garden from './components/Garden';



class AppRoutes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />} />
                        <Route path="lesson" element={<LessonDetails />} />
                        <Route path='news-create' element={<CreateNews />} />
                        <Route path='success/:id' element={<SuccessPage />} />
                        <Route path='counter' element={<Counter />} />
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/garden' element={<Garden />} /> 
          
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRoutes;