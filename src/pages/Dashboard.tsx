import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Plus,
  Eye,
  ListChecks
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "My Drafts",
      value: "12",
      description: "Active drafts in progress",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary-light"
    },
    {
      title: "Pending MLR",
      value: "5",
      description: "Awaiting medical review",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning-light"
    },
    {
      title: "Recently Approved",
      value: "8",
      description: "Approved this week",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success-light"
    },
    {
      title: "Risk Flags",
      value: "3",
      description: "Items needing attention",
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive-light"
    }
  ];

  const recentDrafts = [
    {
      id: 1,
      title: "Ozempic Social Media Campaign",
      persona: "Dr. Sarah Chen",
      status: "In Review",
      lastModified: "2 hours ago",
      riskLevel: "low"
    },
    {
      id: 2,
      title: "Diabetes Awareness Tweet Series",
      persona: "Health Influencer Mike",
      status: "Draft",
      lastModified: "1 day ago",
      riskLevel: "medium"
    },
    {
      id: 3,
      title: "Patient Education Instagram Post",
      persona: "Nurse Practitioner Amy",
      status: "Approved",
      lastModified: "2 days ago",
      riskLevel: "low"
    }
  ];

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Approved": return "default";
      case "In Review": return "secondary";
      case "Draft": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back, Abhinay</h1>
          <p className="text-muted-foreground">
            Manage your AI-generated content and compliance workflow
          </p>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link to="/create">
              <Plus className="w-4 h-4 mr-2" />
              Create New Draft
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-hover transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-md ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-hover transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Persona Library</span>
            </CardTitle>
            <CardDescription>
              Browse and select digital twin personas for content creation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/personas">
                <Eye className="w-4 h-4 mr-2" />
                View Personas
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-hover transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ListChecks className="w-5 h-5 text-primary" />
              <span>MLR Queue</span>
            </CardTitle>
            <CardDescription>
              Review pending submissions requiring medical approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/mlr">
                <CheckCircle className="w-4 h-4 mr-2" />
                Review Queue
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-hover transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Track your latest content creation and approvals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/reports">
                <Eye className="w-4 h-4 mr-2" />
                View Reports
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Drafts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Drafts</CardTitle>
          <CardDescription>
            Your latest content drafts and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDrafts.map((draft) => (
              <div
                key={draft.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-1">
                  <h4 className="font-medium">{draft.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Persona: {draft.persona} • {draft.lastModified}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getRiskBadgeVariant(draft.riskLevel)}>
                    {draft.riskLevel} risk
                  </Badge>
                  <Badge variant={getStatusBadgeVariant(draft.status)}>
                    {draft.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button asChild variant="outline">
              <Link to="/drafts">View All Drafts</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;