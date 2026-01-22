import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { 
  Image, 
  LayoutDashboard, 
  LogOut, 
  MessageSquare, 
  Plus, 
  Star, 
  Trash2, 
  Edit, 
  Home,
  Eye,
  EyeOff,
  Mail,
  MailOpen,
  ChevronLeft,
  FileText,
  FileEdit
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ImageUpload";

const categories = ["Industrial", "Automotive", "Marine", "Agriculture", "Infrastructure"];

export default function Admin() {
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1E8]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2C5F7F]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1E8]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#2C5F7F] flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">CSB</span>
            </div>
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>Sign in to manage your gallery content</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.href = getLoginUrl()}
              className="w-full bg-[#2C5F7F] hover:bg-[#1a3d52]"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user is admin
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1E8]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this area.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/">
              <Button variant="outline" className="w-full">
                <Home className="w-4 h-4 mr-2" /> Return to Home
              </Button>
            </Link>
            <Button variant="ghost" onClick={logout} className="w-full text-red-600">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Admin Header */}
      <header className="bg-[#2C5F7F] text-white sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Site</span>
            </Link>
            <div className="h-6 w-px bg-white/20"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/30">
                <span className="text-sm font-bold">CSB</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Admin Dashboard</h1>
                <p className="text-xs text-white/80">Content Management</p>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:bg-white/10 rounded-lg px-3 py-2 transition">
                <Avatar className="h-8 w-8 border border-white/30">
                  <AvatarFallback className="bg-white/10 text-white text-sm">
                    {user.name?.charAt(0).toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm">{user.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="w-4 h-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="pages" className="gap-2">
              <FileEdit className="w-4 h-4" /> Pages
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              <Image className="w-4 h-4" /> Gallery
            </TabsTrigger>
            <TabsTrigger value="blog" className="gap-2">
              <FileText className="w-4 h-4" /> Blog
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2">
              <Star className="w-4 h-4" /> Testimonials
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2">
              <MessageSquare className="w-4 h-4" /> Contacts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="pages">
            <PagesTab />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryTab />
          </TabsContent>

          <TabsContent value="blog">
            <BlogTab />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsTab />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function OverviewTab() {
  const { data: galleryItems } = trpc.gallery.list.useQuery();
  const { data: testimonials } = trpc.testimonials.list.useQuery();
  const { data: contacts } = trpc.contact.list.useQuery();

  const stats = [
    { label: "Gallery Projects", value: galleryItems?.length || 0, icon: Image, color: "bg-blue-500" },
    { label: "Testimonials", value: testimonials?.length || 0, icon: Star, color: "bg-yellow-500" },
    { label: "Contact Submissions", value: contacts?.length || 0, icon: MessageSquare, color: "bg-green-500" },
    { label: "Unread Messages", value: contacts?.filter(c => c.status === "new").length || 0, icon: Mail, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Dashboard Overview
        </h2>
        <p className="text-gray-600">Manage your website content from here</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Contact Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {contacts && contacts.length > 0 ? (
              <div className="space-y-3">
                {contacts.slice(0, 5).map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {contact.status !== "new" ? (
                        <MailOpen className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Mail className="w-4 h-4 text-[#2C5F7F]" />
                      )}
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No contact submissions yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/gallery">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" /> View Public Gallery
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full justify-start">
                <Home className="w-4 h-4 mr-2" /> View Homepage
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function GalleryTab() {
  const utils = trpc.useUtils();
  const { data: galleryItems, isLoading } = trpc.gallery.listAll.useQuery();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<typeof galleryItems extends (infer T)[] | undefined ? T | null : null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    beforeImage: "",
    afterImage: "",
    isActive: true,
  });

  const createMutation = trpc.gallery.create.useMutation({
    onSuccess: () => {
      toast.success("Gallery item created successfully");
      utils.gallery.list.invalidate();
      setIsAddOpen(false);
      resetForm();
    },
    onError: (error) => toast.error(error.message),
  });

  const updateMutation = trpc.gallery.update.useMutation({
    onSuccess: () => {
      toast.success("Gallery item updated successfully");
      utils.gallery.list.invalidate();
      setEditItem(null);
      resetForm();
    },
    onError: (error) => toast.error(error.message),
  });

  const deleteMutation = trpc.gallery.delete.useMutation({
    onSuccess: () => {
      toast.success("Gallery item deleted successfully");
      utils.gallery.list.invalidate();
      setDeleteId(null);
    },
    onError: (error) => toast.error(error.message),
  });

  const resetForm = () => {
    setFormData({ title: "", category: "", description: "", beforeImage: "", afterImage: "", isActive: true });
  };

  const toggleActiveMutation = trpc.gallery.update.useMutation({
    onSuccess: () => {
      toast.success("Gallery item updated");
      utils.gallery.listAll.invalidate();
    },
    onError: (error) => toast.error(error.message),
  });

  const toggleActive = (item: NonNullable<typeof galleryItems>[0]) => {
    toggleActiveMutation.mutate({ id: item.id, isActive: !item.isActive });
  };

  // Filter gallery items
  const filteredItems = galleryItems?.filter((item) => {
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "active" && item.isActive) || 
      (filterStatus === "inactive" && !item.isActive);
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  }) || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      updateMutation.mutate({ id: editItem.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const openEdit = (item: NonNullable<typeof galleryItems>[0]) => {
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || "",
      beforeImage: item.beforeImage,
      afterImage: item.afterImage,
      isActive: item.isActive,
    });
    setEditItem(item);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Gallery Management
          </h2>
          <p className="text-gray-600">Add, edit, or remove gallery projects ({filteredItems.length} items)</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#2C5F7F] hover:bg-[#1a3d52]" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Gallery Project</DialogTitle>
              <DialogDescription>Fill in the details for the new project</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Industrial Steel Framework"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the project..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ImageUpload
                  label="Before Image"
                  value={formData.beforeImage}
                  onChange={(url) => setFormData({ ...formData, beforeImage: url })}
                  folder="gallery/before"
                />
                <ImageUpload
                  label="After Image"
                  value={formData.afterImage}
                  onChange={(url) => setFormData({ ...formData, afterImage: url })}
                  folder="gallery/after"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="isActive">Active (visible on website)</Label>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#2C5F7F] hover:bg-[#1a3d52]" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Creating..." : "Create Project"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Gallery Project</DialogTitle>
            <DialogDescription>Update the project details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Project Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImageUpload
                label="Before Image"
                value={formData.beforeImage}
                onChange={(url) => setFormData({ ...formData, beforeImage: url })}
                folder="gallery/before"
              />
              <ImageUpload
                label="After Image"
                value={formData.afterImage}
                onChange={(url) => setFormData({ ...formData, afterImage: url })}
                folder="gallery/after"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="edit-isActive">Active (visible on website)</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditItem(null)}>Cancel</Button>
              <Button type="submit" className="bg-[#2C5F7F] hover:bg-[#1a3d52]" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Gallery Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={() => deleteId && deleteMutation.mutate({ id: deleteId })}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Gallery Items Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-40 bg-gray-200"></div>
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className={`overflow-hidden transition-opacity ${!item.isActive ? 'opacity-60' : ''}`}>
              <div className="relative h-40 bg-gray-100">
                <img src={item.beforeImage} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className="bg-[#2C5F7F] text-white text-xs px-2 py-1 rounded">{item.category}</span>
                  {!item.isActive && (
                    <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <EyeOff className="w-3 h-3" /> Hidden
                    </span>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-7 w-7 p-0 bg-white/90 hover:bg-white"
                    onClick={() => toggleActive(item)}
                    title={item.isActive ? "Hide from website" : "Show on website"}
                  >
                    {item.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#2C2C2C]">{item.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => openEdit(item)}>
                    <Edit className="w-3 h-3 mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => setDeleteId(item.id)}>
                    <Trash2 className="w-3 h-3 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : galleryItems && galleryItems.length > 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Image className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="font-semibold text-gray-600">No Matching Projects</h3>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search query</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Image className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="font-semibold text-gray-600">No Gallery Projects Yet</h3>
            <p className="text-sm text-gray-500 mt-1">Click "Add Project" to create your first gallery item</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function TestimonialsTab() {
  const utils = trpc.useUtils();
  const { data: testimonials, isLoading } = trpc.testimonials.list.useQuery();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<typeof testimonials extends (infer T)[] | undefined ? T | null : null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    rating: 5,
    text: "",
    project: "",
    isNew: false,
  });

  const createMutation = trpc.testimonials.create.useMutation({
    onSuccess: () => {
      toast.success("Testimonial created successfully");
      utils.testimonials.list.invalidate();
      setIsAddOpen(false);
      resetForm();
    },
    onError: (error) => toast.error(error.message),
  });

  const updateMutation = trpc.testimonials.update.useMutation({
    onSuccess: () => {
      toast.success("Testimonial updated successfully");
      utils.testimonials.list.invalidate();
      setEditItem(null);
      resetForm();
    },
    onError: (error) => toast.error(error.message),
  });

  const deleteMutation = trpc.testimonials.delete.useMutation({
    onSuccess: () => {
      toast.success("Testimonial deleted successfully");
      utils.testimonials.list.invalidate();
      setDeleteId(null);
    },
    onError: (error) => toast.error(error.message),
  });

  const resetForm = () => {
    setFormData({ name: "", company: "", rating: 5, text: "", project: "", isNew: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      updateMutation.mutate({ id: editItem.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const openEdit = (item: NonNullable<typeof testimonials>[0]) => {
    setFormData({
      name: item.name,
      company: item.company || "",
      rating: item.rating,
      text: item.text,
      project: item.project || "",
      isNew: item.isNew || false,
    });
    setEditItem(item);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Testimonials Management
          </h2>
          <p className="text-gray-600">Manage customer reviews and testimonials</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#2C5F7F] hover:bg-[#1a3d52]" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" /> Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
              <DialogDescription>Add a customer review</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Title</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project">Project Type</Label>
                  <Input
                    id="project"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    placeholder="e.g., Beam Restoration"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select value={formData.rating.toString()} onValueChange={(v) => setFormData({ ...formData, rating: parseInt(v) })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map((r) => (
                        <SelectItem key={r} value={r.toString()}>{"⭐".repeat(r)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="text">Review Text</Label>
                <Textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isNew"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="isNew">Mark as "NEW"</Label>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#2C5F7F] hover:bg-[#1a3d52]" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Creating..." : "Create Testimonial"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Company/Title</Label>
                <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Type</Label>
                <Input value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <Select value={formData.rating.toString()} onValueChange={(v) => setFormData({ ...formData, rating: parseInt(v) })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((r) => (
                      <SelectItem key={r} value={r.toString()}>{"⭐".repeat(r)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Review Text</Label>
              <Textarea value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })} rows={4} required />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="edit-isNew" checked={formData.isNew} onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })} className="rounded" />
              <Label htmlFor="edit-isNew">Mark as "NEW"</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditItem(null)}>Cancel</Button>
              <Button type="submit" className="bg-[#2C5F7F] hover:bg-[#1a3d52]" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>Are you sure? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate({ id: deleteId })} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Testimonials List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : testimonials && testimonials.length > 0 ? (
        <div className="space-y-4">
          {testimonials.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{item.name}</span>
                      {item.company && <span className="text-gray-500">• {item.company}</span>}
                      {item.isNew && <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">NEW</span>}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">"{item.text}"</p>
                    {item.project && <p className="text-xs text-[#2C5F7F] mt-2">Project: {item.project}</p>}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => openEdit(item)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600" onClick={() => setDeleteId(item.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Star className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="font-semibold text-gray-600">No Testimonials Yet</h3>
            <p className="text-sm text-gray-500 mt-1">Click "Add Testimonial" to add your first review</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function BlogTab() {
  const { data: posts, isLoading, refetch } = trpc.blog.listAll.useQuery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "",
    isPublished: true,
  });

  const createMutation = trpc.blog.create.useMutation({
    onSuccess: () => {
      toast.success("Blog post created successfully");
      refetch();
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create blog post");
    },
  });

  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Blog post updated successfully");
      refetch();
      setIsDialogOpen(false);
      setEditingPost(null);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update blog post");
    },
  });

  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => {
      toast.success("Blog post deleted");
      refetch();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete blog post");
    },
  });

  const resetForm = () => {
    setFormData({
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      category: "",
      isPublished: true,
    });
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      category: post.category || "",
      isPublished: post.isPublished,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content || !formData.featuredImage) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Blog Posts
          </h2>
          <p className="text-gray-600">Manage your blog content</p>
        </div>
        <Button onClick={() => { setIsDialogOpen(true); setEditingPost(null); resetForm(); }} className="bg-[#2C5F7F] hover:bg-[#1a3d52]">
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) { setEditingPost(null); resetForm(); } }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
            <DialogDescription>Fill in the details for your blog post</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title *</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Post title" />
              </div>
              <div>
                <Label>Slug *</Label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} placeholder="post-slug" />
              </div>
            </div>
            <div>
              <Label>Excerpt *</Label>
              <Textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Brief description..." rows={2} />
            </div>
            <div>
              <Label>Content *</Label>
              <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Full blog post content (supports Markdown)..." rows={8} />
            </div>
            <div>
              <Label>Featured Image URL *</Label>
              <Input value={formData.featuredImage} onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <Label>Category</Label>
              <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Shot Blasting" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="published" checked={formData.isPublished} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} className="rounded" />
              <Label htmlFor="published" className="cursor-pointer">Published</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsDialogOpen(false); setEditingPost(null); resetForm(); }}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending} className="bg-[#2C5F7F] hover:bg-[#1a3d52]">
              {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : (editingPost ? "Update" : "Create")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>Are you sure? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate({ id: deleteId })} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Posts List */}
      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {post.featuredImage && (
                    <img src={post.featuredImage} alt={post.title} className="w-32 h-24 object-cover rounded" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{post.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>/{post.slug}</span>
                          {post.category && <span className="px-2 py-1 bg-gray-100 rounded">{post.category}</span>}
                          <span className={post.isPublished ? "text-green-600" : "text-gray-400"}>
                            {post.isPublished ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600" onClick={() => setDeleteId(post.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="font-semibold text-gray-600">No Blog Posts Yet</h3>
            <p className="text-sm text-gray-500 mt-1">Create your first blog post to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function PagesTab() {
  const [selectedPage, setSelectedPage] = useState<string>("home");
  
  const availablePages = [
    { slug: "home", name: "Home Page" },
    { slug: "about", name: "About Page" },
    { slug: "services", name: "Services Page" },
    { slug: "gallery", name: "Gallery Page" },
    { slug: "contact", name: "Contact Page" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Page Content Management
        </h2>
        <p className="text-gray-600">Edit content for each page on your website</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Page Selector Sidebar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Pages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {availablePages.map((page) => (
              <Button
                key={page.slug}
                variant={selectedPage === page.slug ? "default" : "outline"}
                className={`w-full justify-start ${selectedPage === page.slug ? "bg-[#2C5F7F]" : ""}`}
                onClick={() => setSelectedPage(page.slug)}
              >
                {page.name}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Page Editor */}
        <div className="md:col-span-3">
          {selectedPage === "home" && <HomePageEditor />}
          {selectedPage === "about" && (
            <Card>
              <CardContent className="py-12 text-center">
                <FileEdit className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h3 className="font-semibold text-gray-600">Coming Soon</h3>
                <p className="text-sm text-gray-500 mt-1">About page editor will be available soon</p>
              </CardContent>
            </Card>
          )}
          {selectedPage === "services" && (
            <Card>
              <CardContent className="py-12 text-center">
                <FileEdit className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h3 className="font-semibold text-gray-600">Coming Soon</h3>
                <p className="text-sm text-gray-500 mt-1">Services page editor will be available soon</p>
              </CardContent>
            </Card>
          )}
          {selectedPage === "gallery" && (
            <Card>
              <CardContent className="py-12 text-center">
                <FileEdit className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h3 className="font-semibold text-gray-600">Coming Soon</h3>
                <p className="text-sm text-gray-500 mt-1">Gallery page editor will be available soon</p>
              </CardContent>
            </Card>
          )}
          {selectedPage === "contact" && (
            <Card>
              <CardContent className="py-12 text-center">
                <FileEdit className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h3 className="font-semibold text-gray-600">Coming Soon</h3>
                <p className="text-sm text-gray-500 mt-1">Contact page editor will be available soon</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function HomePageEditor() {
  const utils = trpc.useUtils();
  const { data: sections, isLoading } = trpc.pageContent.getPageSections.useQuery({ pageSlug: "home" });
  const [editingSection, setEditingSection] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const upsertMutation = trpc.pageContent.upsertSection.useMutation({
    onSuccess: () => {
      toast.success("Section updated successfully");
      utils.pageContent.getPageSections.invalidate();
      setIsDialogOpen(false);
      setEditingSection(null);
    },
    onError: (error) => toast.error(error.message),
  });

  const initializeMutation = trpc.pageContent.initializeHomePage.useMutation({
    onSuccess: () => {
      toast.success("Home page content initialized successfully");
      utils.pageContent.getPageSections.invalidate();
    },
    onError: (error) => toast.error(error.message),
  });

  const handleEdit = (section: any) => {
    setEditingSection(section);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingSection) return;

    upsertMutation.mutate({
      pageSlug: editingSection.pageSlug,
      sectionKey: editingSection.sectionKey,
      sectionType: editingSection.sectionType,
      content: editingSection.content,
      sortOrder: editingSection.sortOrder || 0,
      isActive: editingSection.isActive ?? true,
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Home Page Sections</CardTitle>
              <CardDescription>Edit each section of the home page</CardDescription>
            </div>
            {(!sections || sections.length === 0) && (
              <Button
                onClick={() => initializeMutation.mutate()}
                disabled={initializeMutation.isPending}
                className="bg-[#2C5F7F] hover:bg-[#1a3d52]"
              >
                {initializeMutation.isPending ? "Initializing..." : "Initialize Content"}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : sections && sections.length > 0 ? (
            <div className="space-y-3">
              {sections.map((section) => (
                <Card key={section.id} className="border-l-4 border-l-[#2C5F7F]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg capitalize">{section.sectionKey.replace(/-/g, " ")}</h3>
                        <p className="text-sm text-gray-500 mt-1">Type: {section.sectionType}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(section)}>
                        <Edit className="w-3 h-3 mr-2" /> Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <FileEdit className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="font-semibold text-gray-600">No Sections Found</h3>
              <p className="text-sm text-gray-500 mt-1">Content sections will appear here once initialized</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Section Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Section: {editingSection?.sectionKey?.replace(/-/g, " ")}</DialogTitle>
            <DialogDescription>Modify the content for this section</DialogDescription>
          </DialogHeader>
          {editingSection && (
            <div className="space-y-4">
              <div>
                <Label>Content (JSON)</Label>
                <Textarea
                  value={editingSection.content}
                  onChange={(e) => setEditingSection({ ...editingSection, content: e.target.value })}
                  rows={15}
                  className="font-mono text-sm"
                  placeholder='{"title": "...", "description": "..."}'
                />
                <p className="text-xs text-gray-500 mt-1">Edit the JSON content for this section</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editingSection.isActive ?? true}
                  onChange={(e) => setEditingSection({ ...editingSection, isActive: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="isActive" className="cursor-pointer">Section Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsDialogOpen(false); setEditingSection(null); }}>Cancel</Button>
            <Button onClick={handleSave} disabled={upsertMutation.isPending} className="bg-[#2C5F7F] hover:bg-[#1a3d52]">
              {upsertMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ContactsTab() {
  const utils = trpc.useUtils();
  const { data: contacts, isLoading } = trpc.contact.list.useQuery();
  const [selectedContact, setSelectedContact] = useState<typeof contacts extends (infer T)[] | undefined ? T | null : null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const toggleReadMutation = trpc.contact.toggleRead.useMutation({
    onSuccess: () => {
      utils.contact.list.invalidate();
    },
  });

  const deleteMutation = trpc.contact.delete.useMutation({
    onSuccess: () => {
      toast.success("Contact deleted successfully");
      utils.contact.list.invalidate();
      setDeleteId(null);
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Contact Submissions
        </h2>
        <p className="text-gray-600">View and manage contact form submissions</p>
      </div>

      {/* View Contact Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">Name</Label>
                  <p className="font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Email</Label>
                  <p className="font-medium">{selectedContact.email}</p>
                </div>
              </div>
              {selectedContact.phone && (
                <div>
                  <Label className="text-gray-500">Phone</Label>
                  <p className="font-medium">{selectedContact.phone}</p>
                </div>
              )}
              <div>
                <Label className="text-gray-500">Message</Label>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedContact.message}</p>
              </div>
              <div>
                <Label className="text-gray-500">Submitted</Label>
                <p className="font-medium">{new Date(selectedContact.createdAt).toLocaleString()}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedContact(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Contact</DialogTitle>
            <DialogDescription>Are you sure? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate({ id: deleteId })} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contacts List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : contacts && contacts.length > 0 ? (
        <div className="space-y-3">
          {contacts.map((contact) => {
            const isRead = contact.status !== "new";
            return (
              <Card key={contact.id} className={`transition ${!isRead ? "border-l-4 border-l-[#2C5F7F]" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 cursor-pointer" onClick={() => {
                      setSelectedContact(contact);
                      if (!isRead) {
                        toggleReadMutation.mutate({ id: contact.id, isRead: true });
                      }
                    }}>
                      <div className="flex items-center gap-2 mb-1">
                        {isRead ? (
                          <MailOpen className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Mail className="w-4 h-4 text-[#2C5F7F]" />
                        )}
                        <span className={`font-semibold ${!isRead ? "text-[#2C5F7F]" : ""}`}>{contact.name}</span>
                        <span className="text-gray-500 text-sm">{contact.email}</span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-1 ml-6">{contact.message}</p>
                      <p className="text-xs text-gray-400 mt-1 ml-6">{new Date(contact.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => toggleReadMutation.mutate({ id: contact.id, isRead: !isRead })}
                        title={isRead ? "Mark as unread" : "Mark as read"}
                      >
                        {isRead ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600" onClick={() => setDeleteId(contact.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="font-semibold text-gray-600">No Contact Submissions Yet</h3>
            <p className="text-sm text-gray-500 mt-1">Contact form submissions will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
