
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, MapPin, CheckCircle, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useState, useEffect } from "react";

interface BookingData {
  turfId: string;
  turfName: string;
  turfLocation: string;
  turfImage: string;
  turfSport: string;
  price: number;
  date: Date;
  time: string;
}

interface BookingConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingData;
}

export function BookingConfirmationDialog({
  isOpen,
  onClose,
  bookingData,
}: BookingConfirmationDialogProps) {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Reset states when dialog opens
      setAnimationFinished(false);
      setShowConfetti(true);
      
      // Create confetti effect
      if (typeof window !== "undefined") {
        const confettiCount = 150;
        const container = document.querySelector('.confetti-container');
        
        if (container) {
          container.innerHTML = '';
          
          for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const size = Math.random() * 10 + 5; // 5-15px
            const color = `hsl(${Math.random() * 360}, 80%, 60%)`;
            
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `-10px`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.opacity = `${Math.random() * 0.5 + 0.5}`;
            
            // Animation
            const animationDuration = Math.random() * 3 + 2; // 2-5s
            const animationDelay = Math.random() * 1.5;
            
            confetti.style.animation = `confettiDrop ${animationDuration}s ease-out ${animationDelay}s forwards`;
            
            container.appendChild(confetti);
          }
        }
      }
      
      // Show success animation after a delay
      const timer = setTimeout(() => {
        setAnimationFinished(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleViewBookings = () => {
    onClose();
    navigate("/bookings");
  };
  
  return (
    <>
      {/* CSS for confetti animation */}
      <style>
        {`
          .confetti-container {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            overflow: hidden;
            z-index: 50;
          }
          
          .confetti {
            position: absolute;
            border-radius: 3px;
            z-index: 50;
          }
          
          @keyframes confettiDrop {
            0% {
              transform: translateY(0) rotate(0deg);
            }
            100% {
              transform: translateY(1000px) rotate(720deg);
            }
          }
          
          @keyframes iconBounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-20px);
            }
            60% {
              transform: translateY(-10px);
            }
          }
          
          .success-icon {
            animation: iconBounce 1.5s ease-out;
          }
        `}
      </style>
    
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md fade-in">
          {showConfetti && <div className="confetti-container"></div>}
          
          <DialogHeader>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              {animationFinished ? (
                <CheckCircle className="h-8 w-8 text-green-600 success-icon" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-green-200 animate-pulse"></div>
              )}
            </div>
            <DialogTitle className={`text-center text-xl ${animationFinished ? 'slide-in-bottom' : 'opacity-0'}`}>
              Booking Confirmed!
            </DialogTitle>
            <DialogDescription className={`text-center ${animationFinished ? 'slide-in-bottom delay-100' : 'opacity-0'}`}>
              Your booking has been successfully confirmed
            </DialogDescription>
          </DialogHeader>
          
          <div className={`p-4 border rounded-lg mt-2 ${animationFinished ? 'zoom-in delay-200' : 'opacity-0'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded overflow-hidden">
                <img 
                  src={bookingData.turfImage} 
                  alt={bookingData.turfName}
                  className="h-full w-full object-cover" 
                />
              </div>
              <div>
                <h3 className="font-semibold">{bookingData.turfName}</h3>
                <p className="text-sm text-muted-foreground">{bookingData.turfSport}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center slide-in-left delay-300">
                <MapPin className="h-4 w-4 mr-1 text-primary" />
                <span className="line-clamp-1">{bookingData.turfLocation}</span>
              </div>
              <div className="flex items-center slide-in-right delay-300">
                <Clock className="h-4 w-4 mr-1 text-primary" />
                <span>{bookingData.time}</span>
              </div>
              <div className="flex items-center slide-in-left delay-400">
                <CalendarIcon className="h-4 w-4 mr-1 text-primary" />
                <span>
                  {bookingData.date ? format(new Date(bookingData.date), 'PPP') : 'Today'}
                </span>
              </div>
              <div className="font-semibold slide-in-right delay-400">
                ₹{bookingData.price}
              </div>
            </div>
            
            {animationFinished && (
              <div className="mt-4 text-center">
                <Trophy className="h-6 w-6 mx-auto text-primary animate-bounce" />
                <p className="text-sm text-primary font-medium mt-1">Ready to play!</p>
              </div>
            )}
          </div>
          
          <DialogFooter className={`flex-col gap-2 sm:flex-row ${animationFinished ? 'fade-in delay-600' : 'opacity-0'}`}>
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Close
            </Button>
            <Button onClick={handleViewBookings} className="w-full sm:w-auto hover-scale">
              View My Bookings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
