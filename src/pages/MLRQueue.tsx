import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  MessageSquare,
  Download,
  User,
  Calendar
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const MLRQueue = () => {
  const [selectedDraft, setSelectedDraft] = useState<number | null>(null);

  const queueItems = [
    {
      id: 1,
      title: "Mounjaro Social Media Campaign",
      marketer: "Sarah Johnson",
      persona: "Dr. Sarah Chen",
      submittedAt: "2 hours ago",
      priority: "high",
      riskLevel: "medium",
      wordCount: 125,
      flaggedIssues: 3,
      content: "Managing diabetes doesn't have to be overwhelming. With the right tools and support, you can maintain excellent blood sugar control while living life to the fullest. Mounjaro® has been shown to help adults with type 2 diabetes achieve better A1C levels. Talk to your healthcare provider about whether Mounjaro® is right for you."
    },
    {
      id: 2,
      title: "Diabetes Awareness Tweet Series",
      marketer: "Mike Rodriguez",
      persona: "Health Influencer Mike",
      submittedAt: "4 hours ago",
      priority: "medium",
      riskLevel: "low",
      wordCount: 89,
      flaggedIssues: 1,
      content: "Just like any journey, managing diabetes is about taking it one step at a time! 🌟 The latest research shows that medications like Mounjaro® can make a real difference in your health journey. Always consult your doctor first! #DiabetesAwareness"
    },
    {
      id: 3,
      title: "Recipe-Based Diabetes Management",
      marketer: "Lisa Chen",
      persona: "Celebrity Chef Maria",
      submittedAt: "1 day ago",
      priority: "high",
      riskLevel: "high",
      wordCount: 203,
      flaggedIssues: 7,
      content: "Diabetes doesn't mean sacrificing flavor! Today I'm sharing my secret to creating meals that are both delicious and diabetes-friendly. Combined with proper medication like Mounjaro®, you can enjoy amazing food while managing your condition effectively."
    }
  ];

  const findings = [
    {
      type: "critical",
      category: "Off-label Claim",
      description: "Potential off-label indication mentioned",
      reference: "Line 2-3",
      suggestion: "Remove or modify weight loss claim language"
    },
    {
      type: "major",
      category: "Missing Element",
      description: "Fair balance statement not included",
      reference: "End of content",
      suggestion: "Add required safety information and contraindications"
    },
    {
      type: "minor",
      category: "Claim Validation",
      description: "A1C reduction claim needs citation",
      reference: "Line 1",
      suggestion: "Add reference to clinical trial data"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-destructive-light text-destructive";
      case "medium": return "bg-warning-light text-warning";
      case "low": return "bg-success-light text-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getFindingIcon = (type: string) => {
    switch (type) {
      case "critical": return <XCircle className="w-4 h-4 text-destructive" />;
      case "major": return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "minor": return <CheckCircle className="w-4 h-4 text-primary" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">MLR Review Queue</h1>
          <p className="text-muted-foreground">
            Medical, Legal, and Regulatory review of submitted content
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Queue
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Queue List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Pending Review ({queueItems.length})</span>
              </CardTitle>
              <CardDescription>
                Content awaiting MLR approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queueItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedDraft(item.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedDraft === item.id 
                        ? "border-primary bg-primary-light" 
                        : "border-border hover:bg-accent/50"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)} bg-current`} />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getRiskColor(item.riskLevel)}>
                          {item.riskLevel} risk
                        </Badge>
                        {item.flaggedIssues > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {item.flaggedIssues} issues
                          </Badge>
                        )}
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{item.marketer}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{item.submittedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Panel */}
        <div className="lg:col-span-2">
          {selectedDraft ? (
            (() => {
              const draft = queueItems.find(item => item.id === selectedDraft);
              if (!draft) return null;

              return (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{draft.title}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline">
                            Request Changes
                          </Button>
                          <Button>
                            Approve & Lock
                          </Button>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        Persona: {draft.persona} • Submitted by {draft.marketer} • {draft.submittedAt}
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="content">Content Review</TabsTrigger>
                      <TabsTrigger value="findings">Findings ({findings.length})</TabsTrigger>
                      <TabsTrigger value="comments">Comments</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="content" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Draft Content</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-accent/50 p-4 rounded-lg">
                            <p className="leading-relaxed">{draft.content}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="findings" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Compliance Findings</CardTitle>
                          <CardDescription>
                            Issues flagged by automated compliance checking
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {findings.map((finding, index) => (
                              <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                                {getFindingIcon(finding.type)}
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium text-sm">{finding.category}</h4>
                                    <Badge 
                                      variant={
                                        finding.type === "critical" ? "destructive" :
                                        finding.type === "major" ? "secondary" : "outline"
                                      }
                                      className="text-xs"
                                    >
                                      {finding.type.toUpperCase()}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{finding.description}</p>
                                  <p className="text-xs text-primary font-medium">Reference: {finding.reference}</p>
                                  <p className="text-xs text-success">Suggestion: {finding.suggestion}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="comments" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Reviewer Comments</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Textarea 
                            placeholder="Add your review comments and feedback for the marketer..."
                            className="min-h-[120px]"
                          />
                          <div className="flex space-x-2">
                            <Button size="sm">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Add Comment
                            </Button>
                            <Button variant="outline" size="sm">
                              Save as Draft
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              );
            })()
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Draft to Review</h3>
                <p>Choose a submission from the queue to begin your MLR review</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MLRQueue;