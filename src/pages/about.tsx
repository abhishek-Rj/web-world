import React from "react";

export default function About() {
    React.useEffect(() => {
        const ws = new WebSocket("http://localhost:3000/api/websocket");

        ws.onopen = () => {
            console.log("WebSocket connection established");
            ws.send("Hello from the client!");
        };

        ws.onmessage = (event) => {
            console.log("Message from server:", event.data);
        };

        return () => {
            ws.close();
        };
    }, []);
    return <div>About</div>;
}
