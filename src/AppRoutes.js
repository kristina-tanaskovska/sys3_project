import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import LessonDetails from './components/LessonDetails';
import App from './App';
import CreateNews from './components/news/CreateNews';
import SuccessPage from './components/shared/SuccessPage';

class AppRoutes extends Component {
    render() {
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="lesson" element={<LessonDetails />} />
                    <Route path='news-create' element={<CreateNews />} />
                    <Route path='success/:id' element={<SuccessPage />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRoutes;