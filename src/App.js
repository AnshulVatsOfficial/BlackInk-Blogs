import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';
import ReadBlog from './pages/ReadBlog';
import Navbar from './components/Navbar';
import './Style.css';
import './Responsive.css';
import { MantineProvider } from '@mantine/core';

function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/createblog" element={<CreateBlog />}></Route>
                <Route exact path="/readblog/:id" element={<ReadBlog />}></Route>
                <Route exact path="/login" element={<Login />}></Route>
            </Routes>
        </Router>
        </MantineProvider>
    );
}

export default App;
