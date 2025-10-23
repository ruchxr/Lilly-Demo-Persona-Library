import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  User, 
  Star, 
  Twitter, 
  Youtube, 
  Mic, 
  ArrowRight,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";

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

// Seed personas (existing examples)
const seedPersonas: Persona[] = [
  {
    id: 1,
    name: "Serena Williams",
    type: "Celebrity",
    tagline: "Tennis legend promoting strength and wellness.",
    image: "/api/placeholder/150/150",
    voiceTraits: ["Honest", "Empowering", "Graceful"],
    dataSources: ["Twitter", "Youtube", "Social Media"],
    lastUpdated: "1 day ago",
    popularity: 4.7,
    sampleMessage:
      "Every day is a chance to fight, to focus, and to win. With the right care, diabetes is a challenge you can rise above.",
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    type: "Healthcare Professional",
    tagline: "Empathetic diabetes educator and endocrinologist",
    image: "/api/placeholder/150/150",
    voiceTraits: ["Empathetic", "Educational", "Professional"],
    dataSources: ["Twitter", "YouTube", "Medical Journals"],
    lastUpdated: "2 days ago",
    popularity: 4.8,
    sampleMessage:
      "Managing diabetes is a journey, and every small step towards better health counts. Let's explore evidence-based approaches together.",
  },
  {
    id: 3,
    name: "Health Influencer Mike",
    type: "Social Media Influencer",
    tagline: "Fitness enthusiast sharing diabetes management tips",
    image: "/api/placeholder/150/150",
    voiceTraits: ["Motivational", "Relatable", "Energetic"],
    dataSources: ["Instagram", "TikTok", "Podcasts"],
    lastUpdated: "1 day ago",
    popularity: 4.6,
    sampleMessage:
      "Just crushed my morning workout! Remember, staying active with diabetes isn't just possible - it's powerful! 💪 #DiabetesWarrior",
  },
  {
    id: 4,
    name: "Nurse Practitioner Amy",
    type: "Healthcare Professional",
    tagline: "Practical care coordinator with 15+ years experience",
    image: "/api/placeholder/150/150",
    voiceTraits: ["Caring", "Practical", "Supportive"],
    dataSources: ["Medical Forums", "Patient Interviews", "Training Materials"],
    lastUpdated: "3 days ago",
    popularity: 4.9,
    sampleMessage:
      "As someone who sees patients daily, I know how overwhelming a diabetes diagnosis can feel. Let's break it down into manageable steps.",
  }
];

const PersonaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [personas, setPersonas] = useState<Persona[]>([]);

  // Load saved personas from localStorage and merge with seeds (saved first)
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(LIB_KEY) : null;
      const saved: Persona[] = raw ? JSON.parse(raw) : [];
      setPersonas([...saved, ...seedPersonas]);
    } catch {
      setPersonas(seedPersonas);
    }
  }, []);

  const filters = [
    { id: "all", label: "All Personas" },
    { id: "hcp", label: "Healthcare Professionals" },
    { id: "influencer", label: "Social Media Influencers" },
    { id: "celebrity", label: "Celebrities" }
  ];

  const getDataSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case "twitter": return <Twitter className="w-4 h-4" />;
      case "youtube": return <Youtube className="w-4 h-4" />;
      case "instagram": return <User className="w-4 h-4" />;
      case "tiktok": return <User className="w-4 h-4" />;
      case "podcasts": return <Mic className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const filteredPersonas = personas.filter(persona => {
    const matchesSearch =
      persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.tagline.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "hcp" && persona.type === "Healthcare Professional") ||
      (selectedFilter === "influencer" && persona.type === "Social Media Influencer") ||
      (selectedFilter === "celebrity" && persona.type === "Celebrity");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Persona Library</h1>
          <p className="text-muted-foreground">
            Browse and select digital twin personas for your content creation
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search personas by name or expertise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className="whitespace-nowrap"
            >
              <Filter className="w-4 h-4 mr-2" />
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Persona Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersonas.map((persona) => (
          <Card key={persona.id} className="hover:shadow-hover transition-all duration-200 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{persona.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {persona.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-warning fill-current" />
                  <span className="text-sm font-medium">{persona.popularity}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="text-sm">
                {persona.tagline}
              </CardDescription>

              {/* Voice Traits */}
              <div>
                <h4 className="text-sm font-medium mb-2">Voice Traits:</h4>
                <div className="flex flex-wrap gap-2">
                  {persona.voiceTraits.map((trait) => (
                    <Badge key={trait} variant="secondary" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Data Sources */}
              <div>
                <h4 className="text-sm font-medium mb-2">Data Sources:</h4>
                <div className="flex space-x-2">
                  {persona.dataSources.map((source) => (
                    <div
                      key={source}
                      className="flex items-center justify-center w-8 h-8 bg-accent rounded-md"
                      title={source}
                    >
                      {getDataSourceIcon(source)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Message */}
              <div className="bg-accent/50 p-3 rounded-md">
                <h5 className="text-xs font-medium text-muted-foreground mb-1">Sample Message:</h5>
                <p className="text-sm italic">{persona.sampleMessage}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">
                  Updated {persona.lastUpdated}
                </span>
                <Button asChild size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link to={`/create?persona=${persona.id}`}>
                    Use Persona
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPersonas.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No personas found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonaLibrary;
