import React, { useEffect, useState } from 'react';
import skygear from '@skygear/web';
import './Fortune.css';

function Fortune(props) {
    const { username } = props;

    const [fortune, setFortune] = useState({});

    useEffect(() => {
        async function updateFortune() {
            try {
                const resp = await skygear.fetch('/api/fortune');
                const fortune = await resp.json();
                setFortune(fortune);
            } catch (err) {
                alert(err);
            }
        }
        setFortune({});
        updateFortune();
    }, [username]);

    return (
        <div className="Fortune">
            <h1 className="Fortune-headline">{fortune.headline}</h1>
            <p className="Fortune-body">{fortune.body}</p>
        </div>
    );
}

export default Fortune;
