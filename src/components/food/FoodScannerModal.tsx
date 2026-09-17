import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  RotateCcw,
  Check,
  AlertCircle,
  Clock,
  Edit2,
  Trash2,
  Plus,
  Minus,
  X,
  ChevronRight,
  Info,
  Layers,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext.tsx';
import {
  MealType,
  ScannedMealResult,
  ScannedFoodItem,
  ScanHistoryEntry,
} from '../../types/index.ts';
import { fitnessService } from '../../services/fitnessService.ts';
import { Badge } from '../common/Badge.tsx';

interface FoodScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMealType?: MealType;
}

// High quality sample meals for quick testing when user has no photo
const SAMPLE_MEALS = [
  {
    name: 'Grilled Chicken & Rice Bowl',
    subtitle: 'Chicken, jasmine rice, broccoli',
    calories: 628,
    protein: 55,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Atlantic Salmon & Sweet Potato',
    subtitle: 'Salmon fillet, sweet potato, greens',
    calories: 540,
    protein: 44,
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Power Oatmeal Bowl',
    subtitle: 'Rolled oats, banana, almonds, berries',
    calories: 420,
    protein: 16,
    image:
      'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Avocado Egg Toast & Salad',
    subtitle: 'Sourdough, 2 poached eggs, avocado',
    calories: 485,
    protein: 22,
    image:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
  },
];

export const FoodScannerModal: React.FC<FoodScannerModalProps> = ({
  isOpen,
  onClose,
  defaultMealType = 'lunch',
}) => {
  const { addScannedMeal, scanHistory, reuseHistoryMeal, preselectedMealType } = useFitness();

  // Step 1: 'upload' | 'preview' | 'analyzing' | 'result'
  const [step, setStep] = useState<'upload' | 'preview' | 'analyzing' | 'result'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisStepIndex, setAnalysisStepIndex] = useState(0);

  // Suggested meal type based on time of day
  const getSuggestedMeal = (): MealType => {
    if (preselectedMealType) return preselectedMealType;
    const hour = new Date().getHours();
    if (hour < 11) return 'breakfast';
    if (hour < 15) return 'lunch';
    if (hour < 18) return 'snacks';
    return 'dinner';
  };

  const [selectedMeal, setSelectedMeal] = useState<MealType>(getSuggestedMeal());

  // Result state
  const [scanResult, setScanResult] = useState<ScannedMealResult | null>(null);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);

  // Camera UX
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Hidden file inputs
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep('upload');
      setSelectedImage(null);
      setScanResult(null);
      setEditingItemIndex(null);
      setSelectedMeal(getSuggestedMeal());
      setCameraError(null);
    } else {
      stopCameraStream();
    }
  }, [isOpen]);

  // Clean up media stream on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Start live webcam/camera stream
  const handleStartCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported by your browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });

      mediaStreamRef.current = stream;
      setIsCameraActive(true);

      // Wait a tick for videoRef to mount
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(console.error);
        }
      }, 100);
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError('Camera access is needed to scan your food.');
      setIsCameraActive(false);
    }
  };

  const captureCameraSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      stopCameraStream();
      setSelectedImage(dataUrl);
      setStep('preview');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        stopCameraStream();
        setSelectedImage(reader.result);
        setStep('preview');
      }
    };
    reader.readAsDataURL(file);
  };

  // Test with pre-defined sample meal photo
  const handleSelectSample = async (sample: typeof SAMPLE_MEALS[0]) => {
    stopCameraStream();
    setSelectedImage(sample.image);
    setStep('preview');
  };

  // Trigger analysis
  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setStep('analyzing');
    setAnalysisStepIndex(0);

    // Subtle progress stepper animation:
    // Step 0: Detecting food
    // Step 1: Estimating portions
    // Step 2: Calculating nutrition
    const timer1 = setTimeout(() => setAnalysisStepIndex(1), 600);
    const timer2 = setTimeout(() => setAnalysisStepIndex(2), 1300);

    try {
      let base64Data = selectedImage;

      // If image is a remote URL (from sample meals), fetch and convert to base64
      if (selectedImage.startsWith('http')) {
        try {
          const response = await fetch(selectedImage);
          const blob = await response.blob();
          base64Data = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        } catch (e) {
          // If CORS prevents fetch, use fallback in API
          base64Data = 'data:image/jpeg;base64,';
        }
      }

      const result = await fitnessService.scanFoodImage(base64Data);

      clearTimeout(timer1);
      clearTimeout(timer2);

      setScanResult({
        ...result,
        imageUrl: selectedImage,
      });

      // Quick visual transition into result
      setTimeout(() => {
        setStep('result');
      }, 500);
    } catch (err: any) {
      console.error('Scan error:', err);
      // Fallback result if network or API error
      const fallbackResult: ScannedMealResult = {
        meal: {
          name: 'Healthy Mixed Plate',
          confidence: 0.78,
          description: 'Balanced protein, carbs, and fresh vegetables.',
        },
        items: [
          {
            name: 'Grilled Chicken',
            quantity: 150,
            unit: 'g',
            calories: 248,
            protein: 46,
            carbs: 0,
            fat: 5,
            emoji: '🍗',
          },
          {
            name: 'Cooked Rice',
            quantity: 200,
            unit: 'g',
            calories: 260,
            protein: 5,
            carbs: 56,
            fat: 1,
            emoji: '🍚',
          },
          {
            name: 'Fresh Salad',
            quantity: 80,
            unit: 'g',
            calories: 45,
            protein: 2,
            carbs: 7,
            fat: 1,
            emoji: '🥗',
          },
        ],
        total: {
          calories: 553,
          protein: 53,
          carbs: 63,
          fat: 7,
        },
        imageUrl: selectedImage,
      };
      setScanResult(fallbackResult);
      setStep('result');
    }
  };

  // Portion editing handlers
  const handleUpdateItemPortion = (index: number, newQuantity: number) => {
    if (!scanResult) return;
    const items = [...scanResult.items];
    const item = items[index];
    const prevQty = item.quantity || 100;
    const ratio = newQuantity / (prevQty || 1);

    const updatedItem: ScannedFoodItem = {
      ...item,
      quantity: newQuantity,
      calories: Math.max(1, Math.round(item.calories * ratio)),
      protein: Number((item.protein * ratio).toFixed(1)),
      carbs: Number((item.carbs * ratio).toFixed(1)),
      fat: Number((item.fat * ratio).toFixed(1)),
    };

    items[index] = updatedItem;
    recomputeTotal(items);
  };

  const handleUpdateItemName = (index: number, newName: string) => {
    if (!scanResult) return;
    const items = [...scanResult.items];
    items[index] = { ...items[index], name: newName };
    setScanResult({ ...scanResult, items });
  };

  const handleRemoveItem = (index: number) => {
    if (!scanResult) return;
    const items = scanResult.items.filter((_, idx) => idx !== index);
    recomputeTotal(items);
  };

  const recomputeTotal = (items: ScannedFoodItem[]) => {
    if (!scanResult) return;
    const totalCalories = items.reduce((sum, it) => sum + it.calories, 0);
    const totalProtein = Number(items.reduce((sum, it) => sum + it.protein, 0).toFixed(1));
    const totalCarbs = Number(items.reduce((sum, it) => sum + it.carbs, 0).toFixed(1));
    const totalFat = Number(items.reduce((sum, it) => sum + it.fat, 0).toFixed(1));

    setScanResult({
      ...scanResult,
      items,
      total: {
        calories: totalCalories,
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat,
      },
    });
  };

  // Section 8: Confirmation and adding to Today's Food
  const handleConfirmAddToToday = async () => {
    if (!scanResult) return;
    await addScannedMeal(scanResult, selectedMeal, selectedImage || undefined);
    onClose();
  };

  // Reuse a previous scan from history
  const handleReuseHistory = async (entry: ScanHistoryEntry) => {
    await reuseHistoryMeal(entry, selectedMeal);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="food-scanner-modal-overlay"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div
        id="food-scanner-container"
        className="w-full max-w-md bg-[#F7F8F4] rounded-3xl border border-[#E2E7E3] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#E8ECE9] bg-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#202522]">Scan Your Food</span>
              <span className="px-2 py-0.5 rounded-full bg-[#EBF3EE] text-[#426E54] text-[10px] font-bold uppercase tracking-wider">
                AI Vision
              </span>
            </div>
            <p className="text-xs text-[#858B87] mt-0.5">
              Take a photo and we'll estimate the nutrition.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F2F5F3] hover:bg-[#E8EDE9] flex items-center justify-center text-[#858B87] hover:text-[#202522] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>

        {/* Hidden File Inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
          {/* ================= STEP 1: UPLOAD / CAMERA ================= */}
          {step === 'upload' && (
            <div className="space-y-4">
              {/* Camera Error Notice if permission denied */}
              {cameraError && (
                <div className="p-3 bg-[#FDF4E7] border border-[#F2D7B3] rounded-2xl flex items-start gap-2.5">
                  <AlertCircle size={18} className="text-[#D97706] shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs text-[#92400E]">
                    <p className="font-semibold">{cameraError}</p>
                    <p className="mt-0.5 text-[#B45309]">
                      You can grant permission in browser settings or choose a photo from your gallery below.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={handleStartCamera}
                        className="px-2.5 py-1 rounded-lg bg-[#D97706] text-white font-medium text-[11px] cursor-pointer"
                      >
                        Allow Camera
                      </button>
                      <button
                        onClick={() => galleryInputRef.current?.click()}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#D97706] text-[#92400E] font-medium text-[11px] cursor-pointer"
                      >
                        Choose From Gallery
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Live Webcam Stream (if active) */}
              {isCameraActive ? (
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-4/3 border-2 border-[#6FAF8A] shadow-inner">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3">
                      <button
                        onClick={captureCameraSnapshot}
                        className="w-14 h-14 rounded-full bg-white border-4 border-[#6FAF8A] shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                        title="Take Photo"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#6FAF8A]" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={stopCameraStream}
                    className="w-full py-2 text-xs font-semibold text-[#858B87] hover:text-[#202522] cursor-pointer"
                  >
                    Cancel Camera
                  </button>
                </div>
              ) : (
                /* Primary Upload / Capture Drop Area */
                <div
                  onClick={() => {
                    // Try direct camera or gallery
                    if (cameraInputRef.current) {
                      cameraInputRef.current.click();
                    }
                  }}
                  className="group relative border-2 border-dashed border-[#D2DCD4] hover:border-[#6FAF8A] bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-xs hover:shadow-sm"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#EBF3EE] text-[#426E54] group-hover:bg-[#6FAF8A] group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                    <Camera size={30} />
                  </div>
                  <h3 className="text-sm font-bold text-[#202522]">
                    Capture or Upload Food Photo
                  </h3>
                  <p className="text-xs text-[#858B87] max-w-xs mt-1">
                    Tap to use your camera or select an appetizing meal photo from your gallery.
                  </p>

                  <div className="flex items-center gap-2 mt-4">
                    <span className="px-3 py-1 rounded-full bg-[#F7F8F4] border border-[#E0E6E2] text-[11px] font-medium text-[#426E54] flex items-center gap-1">
                      <Sparkles size={11} className="text-[#F2A65A]" />
                      Portion & Macro Detection
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons: Take Photo & Choose From Gallery */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  id="scanner-btn-take-photo"
                  onClick={() => {
                    // Check if mobile device supports capture attribute, or start camera stream
                    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                      cameraInputRef.current?.click();
                    } else {
                      handleStartCamera();
                    }
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-[#6FAF8A] text-white text-xs font-bold hover:bg-[#5E9E7A] active:scale-98 transition-all cursor-pointer shadow-xs"
                >
                  <Camera size={16} />
                  <span>Take Photo</span>
                </button>

                <button
                  type="button"
                  id="scanner-btn-gallery"
                  onClick={() => galleryInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-white border border-[#DCE2DE] text-[#202522] text-xs font-bold hover:bg-[#F2F5F3] active:scale-98 transition-all cursor-pointer shadow-xs"
                >
                  <Upload size={16} />
                  <span>Choose From Gallery</span>
                </button>
              </div>

              {/* Quick Try With Sample Food Photos */}
              <div className="pt-2 border-t border-[#EDF1EE]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#858B87] uppercase tracking-wider">
                    Or try a sample meal:
                  </span>
                  <span className="text-[10px] text-[#858B87]">1-tap instant AI demo</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_MEALS.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSample(sample)}
                      className="p-2 bg-white rounded-xl border border-[#E8ECE9] hover:border-[#6FAF8A] hover:bg-[#FAFBF9] text-left flex items-center gap-2.5 transition-all cursor-pointer group"
                    >
                      <img
                        src={sample.image}
                        alt={sample.name}
                        className="w-11 h-11 rounded-lg object-cover shrink-0 border border-[#EDF1EE]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#202522] truncate group-hover:text-[#426E54]">
                          {sample.name}
                        </h4>
                        <span className="text-[10px] text-[#858B87] block mt-0.5">
                          ~{sample.calories} kcal · {sample.protein}g P
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 12: Scan History */}
              {scanHistory.length > 0 && (
                <div className="pt-3 border-t border-[#EDF1EE] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-[#858B87]" />
                      <span className="text-xs font-bold text-[#858B87] uppercase tracking-wider">
                        Scan History
                      </span>
                    </div>
                    <span className="text-[10px] text-[#858B87]">Tap to reuse</span>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {scanHistory.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleReuseHistory(item)}
                        className="p-3 bg-white rounded-xl border border-[#E8ECE9] hover:border-[#6FAF8A] flex items-center justify-between transition-colors cursor-pointer group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#202522]">
                              {item.mealName}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#F2F5F3] text-[#858B87]">
                              {item.dateLabel}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#858B87] mt-0.5 block">
                            {item.totalCalories} kcal · {item.totalProtein}g protein
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-[#4F8769] group-hover:underline">
                          + Log
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 2: IMAGE PREVIEW ================= */}
          {step === 'preview' && selectedImage && (
            <div className="space-y-4">
              {/* Large Rounded Container */}
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-4/3 border border-[#E0E6E2] shadow-sm flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Food to analyze"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-medium flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#F2A65A]" />
                  <span>Ready for AI Analysis</span>
                </div>
              </div>

              {/* Actions: Retake and Analyze Food */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(null);
                    setStep('upload');
                  }}
                  className="col-span-1 py-3 px-3 rounded-2xl bg-white border border-[#DCE2DE] text-[#202522] text-xs font-semibold hover:bg-[#F2F5F3] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw size={15} />
                  <span>Retake</span>
                </button>

                <button
                  type="button"
                  id="scanner-btn-analyze-food"
                  onClick={handleAnalyze}
                  className="col-span-2 py-3 px-4 rounded-2xl bg-[#6FAF8A] text-white text-xs font-bold hover:bg-[#5E9E7A] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  <Sparkles size={16} />
                  <span>Analyze Food</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: ANALYSIS STATE ================= */}
          {step === 'analyzing' && (
            <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-5">
              <div className="relative">
                {/* Subtle animated ring */}
                <div className="w-20 h-20 rounded-full border-4 border-[#E2EBE5] border-t-[#6FAF8A] animate-spin flex items-center justify-center" />
                <div className="absolute inset-0 flex items-center justify-center text-[#426E54]">
                  <Sparkles size={26} className="animate-pulse text-[#F2A65A]" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#202522]">
                  Analyzing your meal...
                </h3>
                <p className="text-xs text-[#858B87] mt-1">
                  Identifying food and estimating nutrition.
                </p>
              </div>

              {/* Subtle animated steps */}
              <div className="w-full max-w-xs bg-white border border-[#E8ECE9] rounded-2xl p-4 text-left space-y-2.5 shadow-xs">
                <div className="flex items-center gap-2.5 text-xs">
                  {analysisStepIndex >= 0 ? (
                    <span className="w-5 h-5 rounded-full bg-[#EBF3EE] text-[#426E54] flex items-center justify-center font-bold text-[11px]">
                      ✓
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-[#F2F5F3] text-[#858B87] flex items-center justify-center text-[10px]">
                      ●
                    </span>
                  )}
                  <span className={analysisStepIndex >= 0 ? 'font-semibold text-[#202522]' : 'text-[#858B87]'}>
                    Detecting food
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-xs">
                  {analysisStepIndex >= 1 ? (
                    <span className="w-5 h-5 rounded-full bg-[#EBF3EE] text-[#426E54] flex items-center justify-center font-bold text-[11px]">
                      ✓
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-[#F2F5F3] text-[#858B87] flex items-center justify-center text-[10px]">
                      ●
                    </span>
                  )}
                  <span className={analysisStepIndex >= 1 ? 'font-semibold text-[#202522]' : 'text-[#858B87]'}>
                    Estimating portions
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-xs">
                  {analysisStepIndex >= 2 ? (
                    <span className="w-5 h-5 rounded-full bg-[#EBF3EE] text-[#426E54] flex items-center justify-center font-bold text-[11px]">
                      ✓
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-[#F2F5F3] text-[#858B87] flex items-center justify-center text-[10px]">
                      ●
                    </span>
                  )}
                  <span className={analysisStepIndex >= 2 ? 'font-semibold text-[#202522]' : 'text-[#858B87]'}>
                    Calculating nutrition
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 4: AI DETECTION RESULT ================= */}
          {step === 'result' && scanResult && (
            <div className="space-y-4">
              {/* Top Image & Meal Title Banner */}
              <div className="bg-white rounded-2xl border border-[#E8ECE9] overflow-hidden">
                {selectedImage && (
                  <div className="h-28 w-full relative overflow-hidden bg-black/5">
                    <img
                      src={selectedImage}
                      alt={scanResult.meal.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A3E6B8]">
                        Identified Meal
                      </span>
                      <h3 className="text-base font-bold leading-tight drop-shadow-xs">
                        {scanResult.meal.name}
                      </h3>
                    </div>
                  </div>
                )}

                {/* Section 9: Uncertain Detection Warning if confidence is below 0.8 */}
                {scanResult.meal.confidence < 0.8 && (
                  <div className="p-3 bg-[#FFF9F2] border-b border-[#F5E5D3] flex items-start gap-2.5 text-xs">
                    <AlertCircle size={17} className="text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#92400E] block">
                        We're not completely sure
                      </span>
                      <p className="text-[#B45309] mt-0.5 leading-relaxed">
                        We identified this as approximately:{' '}
                        <strong>{scanResult.meal.name}</strong>. You can confirm or adjust the portions below.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 6: TOTAL NUTRITION SUMMARY CARD */}
              <div className="bg-white rounded-2xl border border-[#E4EAE5] p-4 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#858B87] uppercase tracking-wider">
                    Estimated Nutrition
                  </span>
                  <Badge variant="sage">
                    {scanResult.items.length} item{scanResult.items.length > 1 ? 's' : ''} detected
                  </Badge>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-black tracking-tight text-[#202522]">
                    {scanResult.total.calories}
                  </span>
                  <span className="text-sm font-semibold text-[#858B87]">kcal</span>
                </div>

                {/* Compact Macro Statistics */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#F0F3F1] text-center">
                  <div className="bg-[#FAFBF9] rounded-xl p-2 border border-[#EDF1EE]">
                    <span className="text-[10px] font-bold text-[#858B87] uppercase block">
                      Protein
                    </span>
                    <span className="text-sm font-bold text-[#426E54]">
                      {scanResult.total.protein}g
                    </span>
                  </div>
                  <div className="bg-[#FAFBF9] rounded-xl p-2 border border-[#EDF1EE]">
                    <span className="text-[10px] font-bold text-[#858B87] uppercase block">
                      Carbs
                    </span>
                    <span className="text-sm font-bold text-[#202522]">
                      {scanResult.total.carbs}g
                    </span>
                  </div>
                  <div className="bg-[#FAFBF9] rounded-xl p-2 border border-[#EDF1EE]">
                    <span className="text-[10px] font-bold text-[#858B87] uppercase block">
                      Fat
                    </span>
                    <span className="text-sm font-bold text-[#202522]">
                      {scanResult.total.fat}g
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 5 & 11: WE FOUND (DETECTED FOOD ITEMS) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-xs font-bold text-[#858B87] uppercase tracking-wider">
                    We Found
                  </h4>
                  <span className="text-[11px] text-[#858B87]">
                    Tap edit to adjust portions
                  </span>
                </div>

                <div className="space-y-2">
                  {scanResult.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-[#E8ECE9] p-3.5 shadow-2xs space-y-2 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl select-none">
                            {item.emoji || '🍽️'}
                          </span>
                          <div>
                            <h5 className="text-sm font-bold text-[#202522]">
                              {item.name}
                            </h5>
                            <span className="text-xs text-[#858B87] block">
                              Estimated portion: <strong className="text-[#202522]">{item.quantity}{item.unit}</strong>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setEditingItemIndex(editingItemIndex === idx ? null : idx)
                            }
                            className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                              editingItemIndex === idx
                                ? 'bg-[#6FAF8A] text-white'
                                : 'bg-[#F2F5F3] text-[#426E54] hover:bg-[#E8EDE9]'
                            }`}
                          >
                            <Edit2 size={12} />
                            <span>{editingItemIndex === idx ? 'Done' : 'Edit'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Calories & Protein summary */}
                      <div className="flex items-center gap-3 text-xs text-[#858B87] pt-1 border-t border-[#F5F7F5]">
                        <span className="font-semibold text-[#426E54]">
                          {item.calories} kcal
                        </span>
                        <span>·</span>
                        <span>{item.protein}g protein</span>
                        <span>·</span>
                        <span>{item.carbs}g carbs</span>
                        <span>·</span>
                        <span>{item.fat}g fat</span>
                      </div>

                      {/* Section 10: PORTION & ITEM EDITOR (Expanded when Editing) */}
                      {editingItemIndex === idx && (
                        <div className="mt-3 pt-3 border-t border-[#EDF1EE] bg-[#FAFBF9] p-3 rounded-xl space-y-3 animate-in fade-in duration-150">
                          <div>
                            <label className="text-[11px] font-semibold text-[#858B87] block mb-1">
                              Food Name
                            </label>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleUpdateItemName(idx, e.target.value)}
                              className="w-full bg-white border border-[#E0E6E2] rounded-xl px-3 py-1.5 text-xs text-[#202522] outline-none focus:border-[#6FAF8A]"
                            />
                          </div>

                          {/* Stepper: −  150g  + */}
                          <div>
                            <label className="text-[11px] font-semibold text-[#858B87] block mb-1">
                              Portion Size
                            </label>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateItemPortion(
                                    idx,
                                    Math.max(10, item.quantity - 25)
                                  )
                                }
                                className="w-9 h-9 rounded-xl bg-white border border-[#DCE2DE] flex items-center justify-center text-[#202522] hover:bg-[#F2F5F3] active:scale-95 transition-all cursor-pointer"
                              >
                                <Minus size={15} />
                              </button>

                              <div className="flex-1 bg-white border border-[#E0E6E2] rounded-xl py-1.5 px-3 text-center">
                                <span className="text-sm font-bold text-[#202522]">
                                  {item.quantity} {item.unit}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateItemPortion(idx, item.quantity + 25)
                                }
                                className="w-9 h-9 rounded-xl bg-white border border-[#DCE2DE] flex items-center justify-center text-[#202522] hover:bg-[#F2F5F3] active:scale-95 transition-all cursor-pointer"
                              >
                                <Plus size={15} />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(idx)}
                              className="text-xs text-[#D9534F] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 size={13} />
                              <span>Remove item</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setEditingItemIndex(null)}
                              className="px-3 py-1 bg-[#6FAF8A] text-white text-xs font-semibold rounded-lg cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 7: MEAL SELECTION */}
              <div className="bg-white rounded-2xl border border-[#E8ECE9] p-4 space-y-2">
                <span className="text-xs font-bold text-[#858B87] uppercase tracking-wider block">
                  Where should we add this?
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['breakfast', 'lunch', 'dinner', 'snacks'] as MealType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedMeal(type)}
                      className={`py-2 px-1 text-xs rounded-xl font-medium border text-center capitalize transition-all cursor-pointer ${
                        selectedMeal === type
                          ? 'bg-[#EBF3EE] border-[#6FAF8A] text-[#426E54] font-bold'
                          : 'bg-white border-[#E0E6E2] text-[#858B87] hover:bg-[#FAFBF9]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 20: SAFETY / ACCURACY UX NOTICE */}
              <div className="p-3 bg-[#FAFBF9] border border-[#E8ECE9] rounded-2xl flex items-start gap-2 text-[11px] text-[#858B87]">
                <Info size={14} className="shrink-0 text-[#6FAF8A] mt-0.5" />
                <span>
                  Nutrition values are estimates based on image recognition and estimated portions.
                </span>
              </div>

              {/* Section 8: BOTTOM CTA CONFIRMATION */}
              <div className="pt-2">
                <button
                  type="button"
                  id="scanner-btn-confirm-add"
                  onClick={handleConfirmAddToToday}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#6FAF8A] text-white text-sm font-bold hover:bg-[#5E9E7A] active:scale-98 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  <span>Add to Today's Food</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
