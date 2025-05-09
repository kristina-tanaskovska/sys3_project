import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import LessonDetails from './components/LessonDetails';
import App from './App';
import CreateNews from './components/news/CreateNews';
import SuccessPage from './components/shared/SuccessPage';
import Home from './components/home/Home';

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
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRoutes;