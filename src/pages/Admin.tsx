import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Users, 
  Shield, 
  User, 
  Plus, 
  Edit, 
  Trash2,
  Save,
  History
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Admin = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@procdna..com",
      role: "Marketer",
      department: "Diabetes Marketing",
      lastActive: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      name: "Dr. Michael Brown",
      email: "michael.brown@procdna.com",
      role: "Reviewer",
      department: "Medical Affairs",
      lastActive: "1 day ago",
      status: "active"
    },
    {
      id: 3,
      name: "Lisa Chen",
      email: "lisa.chen@procdna.com",
      role: "Admin",
      department: "Digital Marketing",
      lastActive: "3 hours ago",
      status: "active"
    },
    {
      id: 4,
      name: "Robert Wilson",
      email: "robert.wilson@procdna.com",
      role: "Marketer",
      department: "Obesity Marketing",
      lastActive: "1 week ago",
      status: "inactive"
    }
  ];

  const personas = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      type: "Healthcare Professional",
      traits: ["Empathetic", "Educational", "Professional"],
      sources: ["Twitter", "YouTube", "Medical Journals"],
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      name: "Health Influencer Mike",
      type: "Social Media Influencer",
      traits: ["Motivational", "Relatable", "Energetic"],
      sources: ["Instagram", "TikTok", "Podcasts"],
      lastUpdated: "1 day ago"
    }
  ];

  const auditLogs = [
    {
      id: 1,
      action: "Content Approved",
      user: "Dr. Michael Brown",
      target: "Mounjaro Social Media Campaign",
      timestamp: "2 hours ago",
      details: "MLR review completed - approved with minor changes"
    },
    {
      id: 2,
      action: "Draft Created",
      user: "Sarah Johnson",
      target: "Diabetes Awareness Tweet Series",
      timestamp: "4 hours ago",
      details: "New draft created using Dr. Sarah Chen persona"
    },
    {
      id: 3,
      action: "User Added",
      user: "Lisa Chen",
      target: "Robert Wilson",
      timestamp: "1 day ago",
      details: "New marketer added to Obesity Marketing team"
    },
    {
      id: 4,
      action: "Persona Updated",
      user: "Lisa Chen",
      target: "Health Influencer Mike",
      timestamp: "2 days ago",
      details: "Voice traits and data sources updated"
    }
  ];

  const guardrails = [
    {
      id: 1,
      name: "Indication Language",
      type: "Required",
      description: "Must include approved indication statement",
      active: true
    },
    {
      id: 2,
      name: "Fair Balance",
      type: "Required",
      description: "Include safety information and contraindications",
      active: true
    },
    {
      id: 3,
      name: "Off-label Claims",
      type: "Prohibited",
      description: "No mentions of unapproved uses or indications",
      active: true
    },
    {
      id: 4,
      name: "Comparative Claims",
      type: "Restricted",
      description: "Only head-to-head comparisons with approved data",
      active: true
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "default";
      case "Reviewer": return "secondary";
      case "Marketer": return "outline";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "success" : "destructive";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Administration</h1>
          <p className="text-muted-foreground">
            Manage users, personas, brand guardrails, and system settings
          </p>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="personas">Persona Management</TabsTrigger>
          <TabsTrigger value="guardrails">Brand Guardrails</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Users List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span>User Management</span>
                      </CardTitle>
                      <CardDescription>Manage user access and roles</CardDescription>
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => setSelectedUser(user.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedUser === user.id 
                            ? "border-primary bg-primary-light" 
                            : "border-border hover:bg-accent/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{user.name}</h4>
                              <Badge variant={getRoleColor(user.role)}>
                                {user.role}
                              </Badge>
                              <Badge 
                                variant={getStatusColor(user.status) as any}
                                className="text-xs"
                              >
                                {user.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.department} • Last active {user.lastActive}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Details */}
            <div className="lg:col-span-1">
              {selectedUser ? (
                (() => {
                  const user = users.find(u => u.id === selectedUser);
                  if (!user) return null;

                  return (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Edit User</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="userName">Full Name</Label>
                          <Input id="userName" defaultValue={user.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="userEmail">Email</Label>
                          <Input id="userEmail" defaultValue={user.email} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="userRole">Role</Label>
                          <Select defaultValue={user.role.toLowerCase()}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="reviewer">Reviewer</SelectItem>
                              <SelectItem value="marketer">Marketer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="userDepartment">Department</Label>
                          <Input id="userDepartment" defaultValue={user.department} />
                        </div>
                        <Button className="w-full">
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })()
              ) : (
                <Card className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <User className="w-12 h-12 mx-auto mb-4" />
                    <p>Select a user to edit details</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="personas" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Persona Management</CardTitle>
                  <CardDescription>Configure digital twin personas and their characteristics</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Persona
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {personas.map((persona) => (
                  <div key={persona.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{persona.name}</h4>
                        <p className="text-sm text-muted-foreground">{persona.type}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium mb-1">Voice Traits:</p>
                        <div className="flex flex-wrap gap-1">
                          {persona.traits.map((trait) => (
                            <Badge key={trait} variant="secondary" className="text-xs">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Data Sources:</p>
                        <p className="text-muted-foreground">{persona.sources.join(", ")}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Last updated: {persona.lastUpdated}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guardrails" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Brand Guardrails</span>
              </CardTitle>
              <CardDescription>Configure compliance rules and content requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {guardrails.map((guardrail) => (
                  <div key={guardrail.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{guardrail.name}</h4>
                        <Badge variant={
                          guardrail.type === "Required" ? "default" :
                          guardrail.type === "Prohibited" ? "destructive" : "secondary"
                        }>
                          {guardrail.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{guardrail.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={guardrail.active ? "default" : "outline"}>
                        {guardrail.active ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-5 h-5" />
                <span>Audit Logs</span>
              </CardTitle>
              <CardDescription>Track system activity and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{log.action}</h4>
                        <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {log.user} • {log.target}
                      </p>
                      <p className="text-xs text-muted-foreground">{log.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;