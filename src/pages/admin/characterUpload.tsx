import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function CharacterUpload() {
  const { accessToken } = useAuth();
  useEffect(() => {}, []);
  return (
    <div>
      <form action="/s3/upload" method="post">
        <input type="text" name="name" />
        <input type="file" name="image" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
