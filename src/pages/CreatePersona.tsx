import React, { useMemo, useState } from "react";
import { Star, Twitter, Youtube, Sparkles, BookOpen } from "lucide-react";

// --- storage types & helpers ---
type Persona = {
  id: number;
  name: string;
  type: string;
  tagline: string;
  image: string;
  voiceTraits: string[];
  dataSources: string[];
  lastUpdated: string;  
  popularity: number;    
  sampleMessage: string;
};

const LIB_KEY = "personaLibrary";

function savePersonaToLibrary(p: Persona) {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(LIB_KEY) : null;
    const arr: Persona[] = raw ? JSON.parse(raw) : [];
    arr.unshift(p); // newest first
    localStorage.setItem(LIB_KEY, JSON.stringify(arr));
  } catch {
    // no-op
  }
}

// --- utilities ---
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const normalizeTwitter = (input: string) => {
  const raw = input.trim();
  if (!raw) return null;
  const urlMatch = raw.match(/(?:https?:\/\/)?(?:www\.)?(?:x\.com|twitter\.com)\/([A-Za-z0-9_]{1,15})/i);
  const handle = urlMatch ? urlMatch[1] : raw.replace(/^@/, "");
  if (!/^[A-Za-z0-9_]{1,15}$/.test(handle)) return null;
  return { handle: `@${handle}`, url: `https://twitter.com/${handle}` };
};

const normalizeYouTube = (input: string) => {
  const raw = input.trim();
  if (!raw) return null;
  const handleUrl = raw.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/@([A-Za-z0-9._-]+)/i);
  const chanIdUrl = raw.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/channel\/([A-Za-z0-9_-]+)/i);
  const userUrl = raw.match(/(?:https?:\/\/)?youtube\.com\/c\/([A-Za-z0-9._-]+)/i);

  if (handleUrl) return { handle: `@${handleUrl[1]}`, url: `https://youtube.com/@${handleUrl[1]}` };
  if (chanIdUrl) return { handle: `Channel ${chanIdUrl[1].slice(0,6)}…`, url: `https://youtube.com/channel/${chanIdUrl[1]}` };
  if (userUrl) return { handle: `@${userUrl[1]}`, url: `https://youtube.com/c/${userUrl[1]}` };

  const plain = raw.replace(/^@/, "");
  if (/^[A-Za-z0-9._-]+$/.test(plain)) return { handle: `@${plain}`, url: `https://youtube.com/@${plain}` };
  return null;
};

const DESIGNATIONS = [
  "General Physician",
  "Cardiologist",
  "Oncologist",
  "Neurologist",
  "Pediatrician",
  "Endocrinologist",
  "Gastroenterologist",
  "Dermatologist",
  "Psychiatrist",
  "Other",
];

export default function PersonaBuilder() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [designation, setDesignation] = useState(DESIGNATIONS[0]);
  const [twitter, setTwitter] = useState("");
  const [youtube, setYouTube] = useState("");
  const [docs, setDocs] = useState<File[]>([]); // NEW: uploaded documents
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const twitterObj = useMemo(() => normalizeTwitter(twitter), [twitter]);
  const youTubeObj = useMemo(() => normalizeYouTube(youtube), [youtube]);

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) e.rating = "Rating must be between 1 and 5.";
    if (twitter.trim() && !twitterObj) e.twitter = "Please enter a valid Twitter/X handle or URL.";
    if (youtube.trim() && !youTubeObj) e.youtube = "Please enter a valid YouTube handle or URL.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setDocs(files);
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const dataSources = [
      twitter.trim() ? "Twitter" : null,
      youtube.trim() ? "YouTube" : null,
      docs.length ? `Documents (${docs.length})` : null, 
    ].filter(Boolean) as string[];

    const persona: Persona = {
      id: Date.now(),
      name: name.trim(),
      type: "Healthcare Professional",
      tagline: `${designation} with a ${clamp(rating, 1, 5)}-star peer rating`,
      image: "/api/placeholder/150/150",
      voiceTraits: ["Professional", "Evidence-based"],
      dataSources,
      lastUpdated: "just now",
      popularity: clamp(rating, 1, 5),
      sampleMessage: `As a ${designation.toLowerCase()}, I focus on practical, evidence-based care. Let’s discuss the latest updates and what they mean for everyday practice.`,
    };

    // NOTE: only metadata is saved (not the files themselves)
    savePersonaToLibrary(persona);
    setSubmitted(true);
    window.location.href = "/personas";
  };

  const filled = Boolean(name.trim());

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white p-4 sm:p-8">
      {/* Title + form centered together */}
      <main className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md">
          <header className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6" />
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Persona Builder</h1>
          </header>

          {/* Form card */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5 w-full">
            <h2 className="text-lg font-medium mb-4">Enter Details</h2>

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Person Name<span className="text-rose-600"> *</span>
                </label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="e.g., Dr. Ananya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-sm text-rose-600 mt-1">{errors.name}</p>}
              </div>

              {/* Rating */}
              {/* <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">Rating (1–5)</label>
                  <div className="text-sm text-slate-500">{clamp(rating, 1, 5)} / 5</div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value, 10))}
                  className="mt-2 w-full"
                />
                {errors.rating && <p className="text-sm text-rose-600 mt-1">{errors.rating}</p>}
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-slate-300"}`} />
                  ))}
                </div>
              </div> */}

              {/* Designation */}
              {/* <div>
                <label className="block text-sm font-medium text-slate-700">Designation</label>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                >
                  {DESIGNATIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div> */}

              {/* Twitter */}
              <div>
                <label className="block text-sm font-medium text-slate-700">Twitter / X</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="@doctor_ananya or twitter.com/doctor_ananya"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
                {errors.twitter && <p className="text-sm text-rose-600 mt-1">{errors.twitter}</p>}
                {twitterObj && (
                  <p className="text-xs text-slate-500 mt-1">
                    Will link to{" "}
                    <a className="underline" href={twitterObj.url} target="_blank" rel="noreferrer">
                      {twitterObj.url}
                    </a>
                  </p>
                )}
              </div>

              {/* YouTube */}
              <div>
                <label className="block text-sm font-medium text-slate-700">YouTube</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="@DoctorAnanya or youtube.com/@DoctorAnanya"
                  value={youtube}
                  onChange={(e) => setYouTube(e.target.value)}
                />
                {errors.youtube && <p className="text-sm text-rose-600 mt-1">{errors.youtube}</p>}
                {youTubeObj && (
                  <p className="text-xs text-slate-500 mt-1">
                    Will link to{" "}
                    <a className="underline" href={youTubeObj.url} target="_blank" rel="noreferrer">
                      {youTubeObj.url}
                    </a>
                  </p>
                )}
              </div>

              {/* Upload documentations for the HCP */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Upload Supporting Documentation
                </label>
                <input
                  type="file"
                  multiple
                  onChange={onDocsChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg,.jpeg"
                  className="mt-1 block w-full text-sm text-slate-700
                             file:mr-4 file:py-2 file:px-3
                             file:rounded-xl file:border-0
                             file:text-sm file:font-medium
                             file:bg-slate-100 file:text-slate-700
                             hover:file:bg-slate-200"
                />
                {docs.length > 0 && (
                  <p className="text-xs text-slate-500 mt-1">
                    {docs.length} file(s) selected: {docs.slice(0, 3).map(f => f.name).join(", ")}
                    {docs.length > 3 ? "…" : ""}
                  </p>
                )}
              </div>

              {/* CTAs */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium bg-slate-900 text-white shadow hover:shadow-md active:scale-[.99]"
                >
                  Submit Persona for Build
                </button>

                <a
                  href="/personas"
                  className="ml-auto inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <BookOpen className="w-4 h-4" /> Persona Library
                </a>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
