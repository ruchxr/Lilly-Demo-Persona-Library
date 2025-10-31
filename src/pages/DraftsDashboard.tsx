import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Copy, 
  MoreVertical,
  Calendar,
  User,
  FileText
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DraftsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const drafts = [
    {
      id: 1,
      title: "Mounjaro Social Media Campaign",
      persona: "Dr. Sarah Chen",
      status: "In Review",
      lastEdited: "2 hours ago",
      created: "2024-01-15",
      wordCount: 125,
      riskLevel: "low",
      reviewerComments: 2
    },
    {
      id: 2,
      title: "Diabetes Awareness Tweet Series",
      persona: "Health Influencer Mike",
      status: "Draft",
      lastEdited: "1 day ago",
      created: "2024-01-14",
      wordCount: 89,
      riskLevel: "medium",
      reviewerComments: 0
    },
    {
      id: 3,
      title: "Patient Education Instagram Post",
      persona: "Nurse Practitioner Amy",
      status: "Approved",
      lastEdited: "2 days ago",
      created: "2024-01-13",
      wordCount: 156,
      riskLevel: "low",
      reviewerComments: 1
    },
    {
      id: 4,
      title: "Recipe-Based Diabetes Management",
      persona: "Celebrity Chef Maria",
      status: "Needs Changes",
      lastEdited: "3 days ago",
      created: "2024-01-12",
      wordCount: 203,
      riskLevel: "high",
      reviewerComments: 5
    },
    {
      id: 5,
      title: "Mounjaro Benefits Infographic Text",
      persona: "Dr. Sarah Chen",
      status: "Draft",
      lastEdited: "1 week ago",
      created: "2024-01-08",
      wordCount: 67,
      riskLevel: "medium",
      reviewerComments: 0
    }
  ];

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "draft", label: "Draft" },
    { value: "in-review", label: "In Review" },
    { value: "approved", label: "Approved" },
    { value: "needs-changes", label: "Needs Changes" }
  ];

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved": return "default";
      case "in review": return "secondary";
      case "needs changes": return "destructive";
      case "draft": return "outline";
      default: return "outline";
    }
  };

  const getRiskVariant = (level: string) => {
    switch (level) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const filteredDrafts = drafts.filter(draft => {
    const matchesSearch = draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         draft.persona.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         draft.status.toLowerCase().replace(" ", "-") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">My Drafts</h1>
          <p className="text-muted-foreground">
            Manage your content drafts and track their approval status
          </p>
        </div>
        <Button>
          Create New Draft
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search drafts by title or persona..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={statusFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(option.value)}
              className="whitespace-nowrap"
            >
              <Filter className="w-4 h-4 mr-2" />
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Drafts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Draft Content ({filteredDrafts.length})</CardTitle>
          <CardDescription>
            Your content drafts organized by status and last modification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDrafts.map((draft) => (
              <div
                key={draft.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-lg">{draft.title}</h3>
                    <Badge variant={getStatusVariant(draft.status)}>
                      {draft.status}
                    </Badge>
                    <Badge variant={getRiskVariant(draft.riskLevel)}>
                      {draft.riskLevel} risk
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Persona: {draft.persona}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Last edited: {draft.lastEdited}</span>
                    </div>
                    <span>{draft.wordCount} words</span>
                    {draft.reviewerComments > 0 && (
                      <span className="text-primary font-medium">
                        {draft.reviewerComments} comment{draft.reviewerComments > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {filteredDrafts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No drafts found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Create your first draft to get started"
                }
              </p>
              <Button>Create New Draft</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DraftsDashboard;