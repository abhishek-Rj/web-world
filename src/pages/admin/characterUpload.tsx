import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileType, CheckCircle, ShieldAlert } from "lucide-react";
import { toast } from "react-toastify";

export default function CharacterUpload() {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [characterName, setCharacterName] = useState("");
  const [faceFile, setFaceFile] = useState<File | null>(null);
  const [characterFile, setCharacterFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.username !== import.meta.env.VITE_ADMIN_NAME) {
      navigate("/");
    }
  }, [user, navigate]);

  if (user?.username !== import.meta.env.VITE_ADMIN_NAME) {
    return (
      <main className="font-departure relative min-h-screen overflow-hidden bg-[#0a0612] text-[#f7f0ff] flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#ff000040_0%,transparent_50%),radial-gradient(ellipse_at_0%_100%,#ff00ff30_0%,transparent_40%),radial-gradient(ellipse_at_100%_100%,#ff6b0040_0%,transparent_40%)] animate-[flicker_3s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:linear-gradient(transparent_2px,#000_2px),linear-gradient(90deg,transparent_2px,#000_2px)] [bg-size:4px_4px]" />
        <div className="pointer-events-none absolute inset-0 animate-pulse opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff000010_2px,#ff000010_4px)]" />

        <div
          className="relative z-10 flex flex-col items-center justify-center p-8 border-4 border-[#ff0000] bg-[#0d0618]"
          style={{ boxShadow: "0 0 0 2px #ff00ff, 0 0 30px #ff000080" }}
        >
          <ShieldAlert
            className="w-16 h-16 text-[#ff0000] mb-4"
            style={{ filter: "drop-shadow(0 0 10px #ff0000)" }}
          />
          <h1
            className="text-3xl font-black uppercase tracking-widest text-[#ffffff] mb-2"
            style={{ textShadow: "3px 3px 0 #ff0000, -1px -1px 0 #ff00ff" }}
          >
            Access Denied
          </h1>
          <p className="text-xs text-[#b8a4cc] mb-6 tracking-widest uppercase">
            UNAUTHORIZED ACCESS DETECTED
          </p>
          <button
            onClick={() => navigate("/")}
            className="group relative px-8 py-3 bg-[#0a1520] border-2 border-[#ff0000] text-[#ff0000] font-bold uppercase tracking-widest hover:bg-[#ff000020] transition-colors"
            style={{ boxShadow: "4px 4px 0 #ff000040" }}
          >
            RETURN HOME
          </button>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!characterName.trim()) {
      setError("ENTER CHARACTER NAME");
      return;
    }
    if (!faceFile) {
      setError("SELECT A FACE FILE");
      return;
    }
    if (!characterFile) {
      setError("SELECT A CHARACTER FILE");
      return;
    }

    try {
      const files = [
        faceFile && { fileName: "face", type: faceFile.type, file: faceFile },
        characterFile && {
          fileName: "avatar",
          type: characterFile.type,
          file: characterFile,
        },
      ].filter(Boolean);

      if (files.length != 2) {
        setError("Please upload both face and character files");
        return;
      }

      const getUrls = await fetch(
        `${import.meta.env.VITE_BASE_URL}/s3/upload-character`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            characterName,
            files: files.map((file: any) => ({
              fileName: file.fileName,
              type: file.type,
            })),
          }),
        },
      );

      if (!getUrls.ok) {
        throw new Error("Failed to get URLs");
      }

      const { urls } = await getUrls.json();

      await Promise.all(
        urls.map(async (url: any) => {
          const file = files.find(
            (file: any) => file.fileName === url.fileName,
          );
          const response = await fetch(url.url, {
            method: "PUT",
            headers: {
              "Content-Type": file!.type,
            },
            body: file!.file,
          });
          if (!response.ok) {
            throw new Error("Failed to upload character");
          }
        }),
      );

      const dbUpload = await fetch(
        `${import.meta.env.VITE_BASE_URL}/avatar/uploadCharacter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            characterName,
            key: `characters/${characterName}`,
          }),
        },
      );

      if (!dbUpload.ok) {
        throw new Error("Failed to upload character");
      }
      setCharacterFile(null);
      setFaceFile(null);
      setCharacterName("");
      toast.success("Character uploaded successfully");
    } catch (e) {
      console.log(e);
      toast.error("Failed to upload character");
    }
  };

  return (
    <main className="font-departure relative min-h-screen overflow-hidden bg-[#0a0612] text-[#f7f0ff]">
      {/* Radial gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#ff00ff40_0%,transparent_50%),radial-gradient(ellipse_at_0%_100%,#00ffff30_0%,transparent_40%),radial-gradient(ellipse_at_100%_100%,#ff6b0040_0%,transparent_40%)] animate-[flicker_3s_ease-in-out_infinite]" />

      {/* Pixel grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:linear-gradient(transparent_2px,#000_2px),linear-gradient(90deg,transparent_2px,#000_2px)] [bg-size:4px_4px]" />

      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 animate-pulse opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff00ff10_2px,#ff00ff10_4px)]" />

      {/* Decorative dots */}
      <div className="absolute left-1/2 top-[5%] -translate-x-1/2">
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 animate-pulse"
              style={{
                backgroundColor: i % 2 === 0 ? "#ff00ff" : "#00ffff",
                animationDelay: `${i * 0.15}s`,
                boxShadow:
                  i % 2 === 0
                    ? "0 0 10px #ff00ff, 0 0 20px #ff00ff"
                    : "0 0 10px #00ffff, 0 0 20px #00ffff",
              }}
            />
          ))}
        </div>
      </div>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#664488] transition-colors hover:text-[#00ffff] bg-transparent border-none p-0 cursor-pointer"
            style={{ textShadow: "0 0 8px #66448840" }}
          >
            ◀ BACK TO HOME
          </button>

          <div
            className="relative rounded-none border-4 border-[#00ffff] bg-[#0d0618] p-1"
            style={{
              boxShadow:
                "0 0 0 2px #ff00ff, 0 0 30px #00ffff80, inset 0 0 30px #00ffff20",
            }}
          >
            {/* Header badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0d0618] px-3">
              <span
                className="inline-block whitespace-nowrap text-xs font-bold leading-none tracking-[0.25em] text-[#00ffff]"
                style={{ textShadow: "0 0 10px #00ffff" }}
              >
                ★ ADMIN UPLOAD ★
              </span>
            </div>

            <div className="bg-[#1a0a2e] p-6 pt-10 sm:p-10 sm:pt-12">
              {/* Corner accents */}
              <div className="absolute -left-1 -top-1 h-3 w-3 bg-[#00ffff]" />
              <div className="absolute -right-1 -bottom-1 h-3 w-3 bg-[#00ffff]" />
              <div className="absolute -right-1 -top-1 h-3 w-3 bg-[#ff00ff]" />
              <div className="absolute -left-1 -bottom-1 h-3 w-3 bg-[#ff00ff]" />

              <div className="flex justify-center mb-4">
                <UploadCloud
                  className="w-12 h-12 text-[#00ffff]"
                  style={{ filter: "drop-shadow(0 0 10px #00ffff)" }}
                />
              </div>

              <h1
                className="mb-2 text-center text-3xl sm:text-4xl font-black uppercase tracking-widest text-[#ffffff]"
                style={{ textShadow: "3px 3px 0 #00ffff, -1px -1px 0 #ff00ff" }}
              >
                Asset Database
              </h1>
              <p className="mb-10 text-center text-xs text-[#b8a4cc]">
                INITIALIZE NEW CHARACTER DATA
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Character Name */}
                <div>
                  <label
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#00ffff]"
                    style={{ textShadow: "0 0 6px #00ffff" }}
                  >
                    Character Name
                  </label>
                  <input
                    type="text"
                    value={characterName}
                    onChange={(e) => {
                      setCharacterName(e.target.value);
                      setError("");
                    }}
                    placeholder="ENTER DESIGNATION"
                    className="w-full border-2 border-[#00ffff80] bg-[#050a10] px-4 py-4 text-sm font-bold tracking-widest text-[#00ffff] placeholder-[#00ffff30] outline-none transition-all duration-200 focus:border-[#00ffff] focus:shadow-[0_0_20px_#00ffff40,inset_0_0_20px_#00ffff10]"
                    style={{
                      textShadow: "0 0 8px #00ffff60",
                      boxShadow: "inset 0 0 15px #00ffff08",
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Face Upload */}
                  <div>
                    <label
                      className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff00ff]"
                      style={{ textShadow: "0 0 6px #ff00ff" }}
                    >
                      Face Portrait
                    </label>
                    <div className="relative group cursor-pointer h-40">
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                          setFaceFile(e.target.files?.[0] || null);
                          setError("");
                        }}
                      />
                      <div
                        className={`absolute inset-0 flex flex-col items-center justify-center p-4 border-2 transition-all duration-200 ${
                          faceFile
                            ? "border-[#ff00ff] bg-[#ff00ff10]"
                            : "border-[#ff00ff40] bg-[#100510] group-hover:border-[#ff00ff80]"
                        }`}
                        style={{
                          boxShadow: faceFile
                            ? "inset 0 0 20px #ff00ff20"
                            : "inset 0 0 10px #ff00ff08",
                        }}
                      >
                        {faceFile ? (
                          <>
                            <CheckCircle
                              className="w-8 h-8 text-[#ff00ff] mb-2"
                              style={{ filter: "drop-shadow(0 0 8px #ff00ff)" }}
                            />
                            <p className="text-xs font-bold text-[#ff00ff] break-all text-center tracking-widest">
                              {faceFile.name}
                            </p>
                          </>
                        ) : (
                          <>
                            <FileType className="w-8 h-8 text-[#ff00ff60] mb-2 group-hover:text-[#ff00ff] transition-colors" />
                            <p className="text-[10px] font-bold text-[#ff00ff80] tracking-widest text-center">
                              SELECT FACE FILE
                            </p>
                            <p className="text-[8px] text-[#ff00ff50] mt-1 tracking-widest">
                              PNG, JPG, WEBP
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Character Upload */}
                  <div>
                    <label
                      className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffff00]"
                      style={{ textShadow: "0 0 6px #ffff00" }}
                    >
                      Character Spritesheet
                    </label>
                    <div className="relative group cursor-pointer h-40">
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                          setCharacterFile(e.target.files?.[0] || null);
                          setError("");
                        }}
                      />
                      <div
                        className={`absolute inset-0 flex flex-col items-center justify-center p-4 border-2 transition-all duration-200 ${
                          characterFile
                            ? "border-[#ffff00] bg-[#ffff0010]"
                            : "border-[#ffff0040] bg-[#0a0a05] group-hover:border-[#ffff0080]"
                        }`}
                        style={{
                          boxShadow: characterFile
                            ? "inset 0 0 20px #ffff0020"
                            : "inset 0 0 10px #ffff0008",
                        }}
                      >
                        {characterFile ? (
                          <>
                            <CheckCircle
                              className="w-8 h-8 text-[#ffff00] mb-2"
                              style={{ filter: "drop-shadow(0 0 8px #ffff00)" }}
                            />
                            <p className="text-xs font-bold text-[#ffff00] break-all text-center tracking-widest">
                              {characterFile.name}
                            </p>
                          </>
                        ) : (
                          <>
                            <FileType className="w-8 h-8 text-[#ffff0060] mb-2 group-hover:text-[#ffff00] transition-colors" />
                            <p className="text-[10px] font-bold text-[#ffff0080] tracking-widest text-center">
                              SELECT SPRITESHEET
                            </p>
                            <p className="text-[8px] text-[#ffff0050] mt-1 tracking-widest">
                              PNG, JPG, WEBP
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-[#ff444420] border border-[#ff4444] p-3 text-center">
                    <p
                      className="text-xs font-bold text-[#ff4444] tracking-widest"
                      style={{ textShadow: "0 0 8px #ff4444" }}
                    >
                      ⚠ {error}
                    </p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="group relative mt-4 w-full rounded-none border-2 border-[#00ffff] bg-[#0a1520] py-5 text-center font-black uppercase tracking-widest text-white transition-all duration-100 hover:bg-[#00ffff20] active:scale-[0.98]"
                  style={{
                    boxShadow: "4px 4px 0 #00ffff80, inset 0 0 20px #00ffff10",
                  }}
                >
                  <div className="absolute -left-1 -top-1 h-3 w-3 bg-[#00ffff]" />
                  <div className="absolute -right-1 -bottom-1 h-3 w-3 bg-[#00ffff]" />
                  <span
                    className="flex items-center justify-center gap-3 text-lg"
                    style={{ textShadow: "0 0 10px #00ffff" }}
                  >
                    UPLOAD ASSETS
                    <span className="inline-block animate-pulse text-xl">
                      ↑
                    </span>
                  </span>
                </button>
              </form>

              {/* Pulsing dots bottom */}
              <div className="mt-10 flex justify-center gap-4">
                <div
                  className="h-2 w-2 animate-pulse bg-[#ff00ff]"
                  style={{ boxShadow: "0 0 8px #ff00ff" }}
                />
                <div
                  className="h-2 w-2 animate-pulse bg-[#00ffff]"
                  style={{
                    boxShadow: "0 0 8px #00ffff",
                    animationDelay: "0.3s",
                  }}
                />
                <div
                  className="h-2 w-2 animate-pulse bg-[#ffff00]"
                  style={{
                    boxShadow: "0 0 8px #ffff00",
                    animationDelay: "0.6s",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom HUD */}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex justify-between text-[10px] text-[#332244] font-bold tracking-widest">
        <span>STATUS: SYS_ADMIN</span>
        <span>UPLINK: SECURE</span>
        <span>ACCESS: ROOT</span>
      </div>
    </main>
  );
}
