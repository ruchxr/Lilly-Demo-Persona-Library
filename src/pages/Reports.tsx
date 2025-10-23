import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  FileText,
  Download
} from "lucide-react";

const Reports = () => {
  const dashboardMetrics = [
    {
      title: "Avg. Generation Time",
      value: "2.3s",
      change: "-12%",
      description: "Time to generate content",
      icon: Clock,
      trend: "down"
    },
    {
      title: "First-Pass Approval Rate",
      value: "78%",
      change: "+5%",
      description: "Content approved on first review",
      icon: CheckCircle,
      trend: "up"
    },
    {
      title: "Drafts per Persona",
      value: "4.2",
      change: "+8%",
      description: "Average drafts created per persona",
      icon: Users,
      trend: "up"
    },
    {
      title: "Compliance Issues",
      value: "23",
      change: "-18%",
      description: "Critical flags this month",
      icon: AlertTriangle,
      trend: "down"
    }
  ];

  const usageByPersona = [
    { name: "Dr. Sarah Chen", drafts: 45, approvals: 38, riskFlags: 7 },
    { name: "Health Influencer Mike", drafts: 32, approvals: 28, riskFlags: 12 },
    { name: "Nurse Practitioner Amy", drafts: 28, approvals: 26, riskFlags: 3 },
    { name: "Celebrity Chef Maria", drafts: 19, approvals: 14, riskFlags: 8 }
  ];

  const complianceIssues = [
    { issue: "Missing Fair Balance", count: 8, severity: "Critical" },
    { issue: "Off-label Claims", count: 6, severity: "Critical" },
    { issue: "Incomplete Indication", count: 4, severity: "Major" },
    { issue: "Missing Citations", count: 12, severity: "Minor" },
    { issue: "Tone Violations", count: 3, severity: "Minor" }
  ];

  const approvalTimes = [
    { month: "Jan", avgTime: 2.8 },
    { month: "Feb", avgTime: 2.3 },
    { month: "Mar", avgTime: 2.1 },
    { month: "Apr", avgTime: 1.9 },
    { month: "May", avgTime: 2.0 },
    { month: "Jun", avgTime: 1.8 }
  ];

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-success" : "text-destructive";
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? "↗" : "↘";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "destructive";
      case "Major": return "secondary";
      case "Minor": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Track platform adoption, compliance metrics, and performance insights
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.title} className="hover:shadow-hover transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{metric.value}</div>
              <div className="flex items-center space-x-1 mt-1">
                <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                  {getTrendIcon(metric.trend)} {metric.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage by Persona */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Usage by Persona</span>
            </CardTitle>
            <CardDescription>
              Content creation and approval metrics for each digital twin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageByPersona.map((persona) => (
                <div key={persona.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{persona.name}</h4>
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {persona.drafts} drafts
                      </Badge>
                      <Badge variant="default" className="text-xs">
                        {persona.approvals} approved
                      </Badge>
                      {persona.riskFlags > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {persona.riskFlags} flags
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="flex-1 bg-accent rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(persona.approvals / persona.drafts) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((persona.approvals / persona.drafts) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Top Compliance Issues</span>
            </CardTitle>
            <CardDescription>
              Most frequently flagged compliance violations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complianceIssues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{issue.issue}</p>
                    <p className="text-xs text-muted-foreground">
                      {issue.count} occurrences this month
                    </p>
                  </div>
                  <Badge variant={getSeverityColor(issue.severity)}>
                    {issue.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approval Cycle Times */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Approval Cycle Times</span>
          </CardTitle>
          <CardDescription>
            Average time from submission to MLR approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Month</span>
              <span>Avg. Days to Approval</span>
            </div>
            {approvalTimes.map((data) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="font-medium">{data.month}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-accent rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(data.avgTime / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">
                    {data.avgTime} days
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">1,247</div>
            <p className="text-sm text-muted-foreground">
              Total drafts created this quarter
            </p>
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-success font-medium">+23%</span>
              <span className="text-xs text-muted-foreground">vs last quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">89</div>
            <p className="text-sm text-muted-foreground">
              Users active in the last 30 days
            </p>
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-success font-medium">+12%</span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">94.2%</div>
            <p className="text-sm text-muted-foreground">
              Content meeting compliance standards
            </p>
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-success font-medium">+2.1%</span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;