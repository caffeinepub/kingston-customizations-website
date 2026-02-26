import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile, useIsCallerAdmin, useUploadHomepageImage, useUploadLogo, useGetHomepageImage, useGetLogoImage } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Upload, Home, LogOut, ImageIcon, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPage() {
  const navigate = useNavigate();
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { mutate: saveProfile, isPending: savingProfile } = useSaveCallerUserProfile();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: currentHomepageImage } = useGetHomepageImage();
  const { data: currentLogoImage } = useGetLogoImage();
  const { mutate: uploadHomepage, isPending: uploadingHomepage } = useUploadHomepageImage();
  const { mutate: uploadLogo, isPending: uploadingLogo } = useUploadLogo();

  const [userName, setUserName] = useState('');
  const [homepageFile, setHomepageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [homepagePreview, setHomepagePreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;
  const isLoading = isInitializing || adminLoading || profileLoading;

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    await clear();
    navigate({ to: '/' });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      saveProfile(
        { name: userName.trim() },
        {
          onSuccess: () => {
            toast.success('Profile created successfully!');
          },
          onError: () => {
            toast.error('Failed to create profile. Please try again.');
          },
        }
      );
    }
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload a JPEG, PNG, or WebP image.');
      return false;
    }

    if (file.size > maxSize) {
      toast.error('File size exceeds 10MB limit.');
      return false;
    }

    return true;
  };

  const handleHomepageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setHomepageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setHomepagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      e.target.value = '';
    }
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      e.target.value = '';
    }
  };

  const handleUploadHomepage = async () => {
    if (!homepageFile) {
      toast.info('Please select a homepage image to upload.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
      
      uploadHomepage(
        { bytes: uint8Array, filename: homepageFile.name },
        {
          onSuccess: () => {
            toast.success('Homepage image updated successfully! The changes are now live.');
            setHomepageFile(null);
            setHomepagePreview(null);
            // Reset file input
            const input = document.getElementById('homepage-upload') as HTMLInputElement;
            if (input) input.value = '';
          },
          onError: (error) => {
            console.error('Upload error:', error);
            toast.error('Failed to upload homepage image. Please try again.');
          },
        }
      );
    };
    reader.readAsArrayBuffer(homepageFile);
  };

  const handleUploadLogo = async () => {
    if (!logoFile) {
      toast.info('Please select a logo image to upload.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
      
      uploadLogo(
        { bytes: uint8Array, filename: logoFile.name },
        {
          onSuccess: () => {
            toast.success('Logo image updated successfully! The changes are now live.');
            setLogoFile(null);
            setLogoPreview(null);
            // Reset file input
            const input = document.getElementById('logo-upload') as HTMLInputElement;
            if (input) input.value = '';
          },
          onError: (error) => {
            console.error('Upload error:', error);
            toast.error('Failed to upload logo image. Please try again.');
          },
        }
      );
    };
    reader.readAsArrayBuffer(logoFile);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-yellow-400 mx-auto mb-4" />
          <p className="text-slate-300 text-lg">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-yellow-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Admin Access</CardTitle>
            <CardDescription className="text-slate-300">
              Please log in to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleLogin}
              disabled={loginStatus === 'logging-in'}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold"
            >
              {loginStatus === 'logging-in' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login with Internet Identity'
              )}
            </Button>
            <Button
              onClick={() => navigate({ to: '/' })}
              variant="outline"
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Profile setup dialog
  if (showProfileSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Dialog open={true}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Welcome!</DialogTitle>
              <DialogDescription className="text-slate-300">
                Please enter your name to complete your profile setup.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleProfileSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={savingProfile || !userName.trim()}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold"
              >
                {savingProfile ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Access Denied</CardTitle>
            <CardDescription className="text-slate-300">
              You do not have permission to access this page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate({ to: '/' })}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-yellow-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Admin Panel</h1>
            </div>
            <p className="text-slate-300 mt-1">Manage your website images - changes appear live immediately</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate({ to: '/' })}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Image Upload Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Homepage Image */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Homepage Hero Image</CardTitle>
              <CardDescription className="text-slate-300">
                Upload a new background image for the homepage hero section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Image Preview */}
              {currentHomepageImage && !homepagePreview && (
                <div className="space-y-2">
                  <Label className="text-slate-300">Current Image</Label>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-700">
                    <img
                      src={currentHomepageImage.getDirectURL()}
                      alt="Current homepage"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* No Image Placeholder */}
              {!currentHomepageImage && !homepagePreview && (
                <div className="space-y-2">
                  <Label className="text-slate-300">Current Image</Label>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-700 flex items-center justify-center">
                    <div className="text-center text-slate-400">
                      <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No image uploaded yet</p>
                      <p className="text-xs mt-1">Using default image</p>
                    </div>
                  </div>
                </div>
              )}

              {/* New Image Preview */}
              {homepagePreview && (
                <div className="space-y-2">
                  <Label className="text-slate-300">New Image Preview</Label>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-700">
                    <img
                      src={homepagePreview}
                      alt="Homepage preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* File Input */}
              <div className="space-y-2">
                <Label htmlFor="homepage-upload" className="text-white">
                  Select New Image
                </Label>
                <Input
                  id="homepage-upload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleHomepageFileChange}
                  className="bg-slate-700 border-slate-600 text-white file:bg-yellow-400 file:text-slate-900 file:font-semibold file:border-0 file:mr-4 file:py-2 file:px-4 hover:file:bg-yellow-500"
                />
                <p className="text-xs text-slate-400">Accepted formats: JPEG, PNG, WebP (max 10MB)</p>
              </div>

              {/* Upload Button */}
              <Button
                onClick={handleUploadHomepage}
                disabled={uploadingHomepage || !homepageFile}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold"
              >
                {uploadingHomepage ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Homepage Image
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Logo Image */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Logo Image</CardTitle>
              <CardDescription className="text-slate-300">
                Upload a new logo for the header and hero section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Image Preview */}
              {currentLogoImage && !logoPreview && (
                <div className="space-y-2">
                  <Label className="text-slate-300">Current Logo</Label>
                  <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden bg-white flex items-center justify-center p-4">
                    <img
                      src={currentLogoImage.getDirectURL()}
                      alt="Current logo"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* No Image Placeholder */}
              {!currentLogoImage && !logoPreview && (
                <div className="space-y-2">
                  <Label className="text-slate-300">Current Logo</Label>
                  <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden bg-slate-700 flex items-center justify-center">
                    <div className="text-center text-slate-400">
                      <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No logo uploaded yet</p>
                      <p className="text-xs mt-1">Using default logo</p>
                    </div>
                  </div>
                </div>
              )}

              {/* New Image Preview */}
              {logoPreview && (
                <div className="space-y-2">
                  <Label className="text-slate-300">New Logo Preview</Label>
                  <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden bg-white flex items-center justify-center p-4">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* File Input */}
              <div className="space-y-2">
                <Label htmlFor="logo-upload" className="text-white">
                  Select New Logo
                </Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleLogoFileChange}
                  className="bg-slate-700 border-slate-600 text-white file:bg-yellow-400 file:text-slate-900 file:font-semibold file:border-0 file:mr-4 file:py-2 file:px-4 hover:file:bg-yellow-500"
                />
                <p className="text-xs text-slate-400">Accepted formats: JPEG, PNG, WebP (max 10MB)</p>
              </div>

              {/* Upload Button */}
              <Button
                onClick={handleUploadLogo}
                disabled={uploadingLogo || !logoFile}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold"
              >
                {uploadingLogo ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo Image
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
