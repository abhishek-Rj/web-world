import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileType, CheckCircle, ShieldAlert } from "lucide-react";

export default function CharacterUpload() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.username !== process.env.VITE_ADMIN_NAME) {
      navigate("/");
    }
  }, [user, navigate]);

  if (user?.username !== process.env.VITE_ADMIN_NAME) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-neutral-100">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>
        <p className="text-neutral-400 mt-2">
          You are not authorized to view this page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors font-medium border border-neutral-700"
        >
          Return Home
        </button>
      </div>
    );
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", fileName);
    if (!file) {
      setError("Please select a file");
      window.alert(error);
      return;
    }
    formData.append("image", file);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/s3/upload-character`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl shadow-black/50">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 mb-4">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Upload Character
          </h1>
          <p className="text-neutral-400 mt-2 text-sm">
            Add a new character asset to the game
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-300"
            >
              Character Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
              placeholder="e.g. Hero, Villager, Enemy"
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-neutral-100 placeholder:text-neutral-600"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">
              Character Spritesheet
            </label>
            <div className="relative group cursor-pointer">
              <input
                type="file"
                name="image"
                required
                accept="image/png, image/jpeg, image/webp"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <div
                className={`w-full p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${fileName ? "border-blue-500 bg-blue-500/5" : "border-neutral-700 bg-neutral-950 group-hover:border-neutral-500 group-hover:bg-neutral-900"}`}
              >
                {fileName ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
                    <p className="text-sm font-medium text-blue-400 break-all text-center px-4">
                      {fileName}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Click to change file
                    </p>
                  </>
                ) : (
                  <>
                    <FileType className="w-8 h-8 text-neutral-500 mb-3 group-hover:text-neutral-400 transition-colors" />
                    <p className="text-sm font-medium text-neutral-300">
                      Choose a file or drag & drop
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <UploadCloud className="w-5 h-5" />
            Upload Character
          </button>
        </form>
      </div>
    </div>
  );
}
