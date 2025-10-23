import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, 
  Send, 
  RefreshCw, 
  Copy, 
  AlertTriangle, 
  CheckCircle, 
  User,
  Target,
  MessageSquare,
  Zap
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const CreateDraft = () => {
  const [selectedPersona, setSelectedPersona] = useState("1");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVariants, setGeneratedVariants] = useState<string[]>([]);

  const personas = [
    { id: "1", name: "Serena Williams", type: "Sportsperson" },
    { id: "2", name: "Dr. Sarah Chen", type: "Healthcare Professional" },
    { id: "3", name: "Health Influencer Mike", type: "Social Media Influencer" },
    { id: "4", name: "Nurse Practitioner Amy", type: "Healthcare Professional" }
  ];

  const sampleVariants = [
    "Managing type 2 diabetes isn’t just about tracking numbers—it’s about reclaiming your life and stepping into a new chapter of health and confidence. With Ozempic, paired with healthy habits, I feel supported every day to make choices that empower me. It’s not just treatment; it’s the start of my next era of strength, balance, and wellbeing. This journey is about living fully, on my terms, and celebrating every step forward.",
    
    "Taking control of type 2 diabetes shouldn’t mean facing barriers or impossible costs. Ozempic helps me manage my health while fitting into my busy life, and with new affordability options like the $499 cash-pay program, it’s now within reach for more people than ever. It’s a way to prioritize your health, feel empowered, and take action today, without compromise. Everyone deserves access to care that works for them.",
    
    "Obesity is a disease, not a matter of willpower or aesthetics, and it deserves compassion, understanding, and evidence-based care. With Ozempic, guided by my doctor, I can focus on my health, protect my heart and kidneys, and feel confident in the choices I make every day. This journey is about more than numbers—it’s about strength, resilience, and living fully without stigma."
  ];

  const riskFlags = [
    { type: "critical", message: "Potential off-label claim detected", details: "Review indication language" },
    { type: "major", message: "Missing fair balance statement", details: "Add required safety information" },
    { type: "minor", message: "Consider adding dosing information", details: "Enhance clinical context" }
  ];

  const brandGuardrails = [
    { name: "Tone Guidelines", status: "pass", details: "Professional and empathetic tone maintained" },
    { name: "Claim Validation", status: "warning", details: "Verify all efficacy claims with approved language" },
    { name: "Fair Balance", status: "fail", details: "Missing required risk information" }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedVariants(sampleVariants);
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getRiskColor = (type: string) => {
    switch (type) {
      case "critical": return "text-destructive";
      case "major": return "text-warning";
      case "minor": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const getGuardrailColor = (status: string) => {
    switch (status) {
      case "pass": return "text-success";
      case "warning": return "text-warning";
      case "fail": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Create New Draft</h1>
          <p className="text-muted-foreground">
            Generate AI-powered content using digital twin personas
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Submit to MLR
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Persona Selection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedPersona} onValueChange={setSelectedPersona}>
                <SelectTrigger>
                  <SelectValue placeholder="Select persona" />
                </SelectTrigger>
                <SelectContent>
                  {personas.map((persona) => (
                    <SelectItem key={persona.id} value={persona.id}>
                      <div className="flex flex-col">
                        <span>{persona.name}</span>
                        <span className="text-xs text-muted-foreground">{persona.type}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Campaign Context</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ozempic">Ozempic®</SelectItem>
                    <SelectItem value="rybelsus">Wegovy®</SelectItem>
                    <SelectItem value="victoza">Rybelsus®</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="channel">Channel</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="email">Email Campaign</SelectItem>
                    <SelectItem value="website">Website Content</SelectItem>
                    <SelectItem value="print">Print Materials</SelectItem>
                    <SelectItem value="clinical">Clinical Trials</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input placeholder="e.g., Adults with Type 2 Diabetes" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cta">Call to Action</Label>
                <Input placeholder="e.g., Talk to your doctor" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="disclaimers" />
                <Label htmlFor="disclaimers" className="text-sm">
                  Include required disclaimers
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Content Prompt</span>
              </CardTitle>
              <CardDescription>
                Describe the content you want to generate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Example: Create a social media post about the benefits of Ozempic for type 2 diabetes management, focusing on A1C reduction and weight management benefits..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          {generatedVariants.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Variants</CardTitle>
                <CardDescription>
                  Review and select your preferred content version
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="variant-1" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="variant-1">Variant A</TabsTrigger>
                    <TabsTrigger value="variant-2">Variant B</TabsTrigger>
                    <TabsTrigger value="variant-3">Variant C</TabsTrigger>
                  </TabsList>
                  
                  {generatedVariants.map((variant, index) => (
                    <TabsContent key={index} value={`variant-${index + 1}`} className="space-y-4">
                      <div className="bg-accent/50 p-4 rounded-md">
                        <p className="text-sm leading-relaxed">{variant}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(variant)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit Inline
                        </Button>
                        <Button size="sm">
                          Use This Version
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span>Risk Flags</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {riskFlags.map((flag, index) => (
                <div key={index} className="p-3 border border-border rounded-md">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 ${getRiskColor(flag.type)}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{flag.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{flag.details}</p>
                      <Badge 
                        variant={flag.type === "critical" ? "destructive" : flag.type === "major" ? "secondary" : "outline"}
                        className="text-xs mt-2"
                      >
                        {flag.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Brand Guardrails</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {brandGuardrails.map((guardrail, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-md">
                  <div>
                    <p className="text-sm font-medium">{guardrail.name}</p>
                    <p className="text-xs text-muted-foreground">{guardrail.details}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    guardrail.status === "pass" ? "bg-success" :
                    guardrail.status === "warning" ? "bg-warning" : "bg-destructive"
                  }`} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Required Elements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">Product name included</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="text-sm">Fair balance statement</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm">Indication statement</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="text-sm">Important safety information</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateDraft;