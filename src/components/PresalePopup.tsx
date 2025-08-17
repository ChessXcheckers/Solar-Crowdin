import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from './ui/button';

const PresalePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Show popup only if it hasn't been shown before in this session
      if (!sessionStorage.getItem('presalePopupShown')) {
        setIsOpen(true);
        sessionStorage.setItem('presalePopupShown', 'true');
      }
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToPresale = () => {
    const presaleSection = document.getElementById('presale-section'); // We will need to add this ID
    if (presaleSection) {
      presaleSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gradient-to-br from-orange-500 to-orange-700 text-white border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Don't Miss Out on the Future of Energy!
          </DialogTitle>
          <DialogDescription className="text-center text-orange-100 pt-2">
            The SolarCrowdin presale is your chance to invest early in an AI-powered renewable energy revolution.
          </DialogDescription>
        </DialogHeader>
        <div className="text-center py-4">
          <p className="text-lg font-semibold mb-1">Current Token Price: <span className="text-yellow-300">$0.063</span></p>
          <p className="text-lg font-semibold">Listing Price: <span className="text-yellow-300">$0.14</span></p>
          <p className="text-2xl font-bold text-yellow-300 mt-2">Potential 122% Gain! 🚀</p>
        </div>
        <Button
          onClick={handleScrollToPresale}
          className="w-full bg-white text-orange-600 hover:bg-gray-200 py-3 text-lg font-bold"
        >
          Go to Presale
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PresalePopup;
