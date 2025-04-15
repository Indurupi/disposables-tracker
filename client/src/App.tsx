import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import StatusBar from "@/components/layout/StatusBar";
import TabBar from "@/components/layout/TabBar";
import CameraFab from "@/components/layout/CameraFab";
import AddItemFab from "@/components/layout/AddItemFab";
import HomeScreen from "@/components/screens/HomeScreen";
import ListScreen from "@/components/screens/ListScreen";
import CameraScreen from "@/components/screens/CameraScreen";
import ResultsScreen from "@/components/screens/ResultsScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import AddItemForm from "@/components/forms/AddItemForm";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [identifiedItem, setIdentifiedItem] = useState<any | null>(null);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  const showTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  const showCamera = () => {
    setActiveTab("camera");
  };
  
  const openAddItemForm = () => {
    setIsAddItemOpen(true);
  };

  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc);
    // In a real app, we would send the image to a backend for processing
    // For now, we'll simulate a response after a delay
    setTimeout(() => {
      setActiveTab("results");
      setIdentifiedItem({
        name: "Plastic Straw",
        category: "Drink",
        imageUrl: imageSrc,
        nonBiodegradable: true,
        decompositionTime: "200 years",
        usageCount: 12
      });
    }, 1000);
  };

  const handleAddItem = () => {
    if (identifiedItem) {
      // In a real app, we would save the item to the backend
      // For now, we'll just show a success message and go to the list
      setActiveTab("list");
      setCapturedImage(null);
      setIdentifiedItem(null);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app h-screen flex flex-col bg-[#F2F2F7]">
        <StatusBar />
        
        <div className="tab-content flex-1 relative">
          {activeTab === "home" && <HomeScreen onViewAll={() => showTab("list")} />}
          {activeTab === "list" && <ListScreen />}
          {activeTab === "camera" && <CameraScreen onCapture={handleCapture} onClose={() => showTab("home")} />}
          {activeTab === "results" && (
            <ResultsScreen 
              item={identifiedItem} 
              onAddItem={handleAddItem} 
              onReset={() => showTab("camera")} 
              onBack={() => showTab("home")}
            />
          )}
          {activeTab === "profile" && <ProfileScreen />}
          
          {activeTab !== "camera" && (
            <>
              <AddItemFab onClick={openAddItemForm} />
              <CameraFab onClick={showCamera} />
            </>
          )}
          
          <AddItemForm 
            open={isAddItemOpen} 
            onOpenChange={setIsAddItemOpen} 
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['/api/items'] });
              queryClient.invalidateQueries({ queryKey: ['/api/items/recent'] });
              queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
            }}
          />
        </div>
        
        <TabBar activeTab={activeTab} onTabChange={showTab} />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
