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
import CardStatus from './components/CardStatus';
import HistoryPage from './components/HistoryPage';
import SettingsPage from './components/SettingsPage';



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
                        <Route path="/card/:id" element={<CardStatus />} />
                        <Route path="/history/:id" element={<HistoryPage />} />
                        <Route path="/settings/:cardId" element={<SettingsPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRoutes;