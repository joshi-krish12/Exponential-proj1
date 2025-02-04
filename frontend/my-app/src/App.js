import React from 'react';
import Clicker from './components/Clicker';

function App() {
    const userId = 'user123';
    return (
        <div>
            <Clicker userId={userId} />
        </div>
    );
}

export default App;