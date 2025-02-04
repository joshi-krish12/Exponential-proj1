import React from 'react';
import Clicker from './components/Clicker';

function App() {
    const userId = 'fetchPoints';
    return (
        <div>
            <Clicker userId={userId} />
        </div>
    );
}

export default App;