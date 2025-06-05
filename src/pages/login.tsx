import { useRef } from "react";

export default function Login() {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <div className="bg-black text-white font-pixel">Hello</div>
            <input type="text" ref={inputRef} />
        </>
    );
}
