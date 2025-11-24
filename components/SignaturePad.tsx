import React, { useRef, useState, useEffect } from 'react';
import { Eraser, PenLine } from 'lucide-react';

interface SignaturePadProps {
  onEnd: (dataUrl: string | null) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const getCoordinates = (event: MouseEvent | TouchEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;

    if ((event as TouchEvent).touches) {
      clientX = (event as TouchEvent).touches[0].clientX;
      clientY = (event as TouchEvent).touches[0].clientY;
    } else {
      clientX = (event as MouseEvent).clientX;
      clientY = (event as MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling on touch
    setIsDrawing(true);
    const { x, y } = getCoordinates(e.nativeEvent);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); 
    if (!isDrawing || !canvasRef.current) return;
    const { x, y } = getCoordinates(e.nativeEvent);
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setHasSignature(true);
      if (canvasRef.current) {
        onEnd(canvasRef.current.toDataURL());
      }
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
      onEnd(null);
    }
  };

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        // Save current content
        const dataUrl = canvas.toDataURL();
        
        // Resize
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = 200; // Fixed height

        // Restore content (optional - simplest is to just clear, but user exp is better if we try to keep it, 
        // usually easier to ask to re-sign on major resize)
        // For simplicity and correctness in this demo, we will reset if resized to avoid distortion
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
        onEnd(null);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init

    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
          <PenLine className="w-4 h-4" />
          乙方簽名區域
        </label>
        <button
          type="button"
          onClick={clearSignature}
          className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50 transition-colors"
          disabled={!hasSignature}
        >
          <Eraser className="w-3 h-3" />
          清除重簽
        </button>
      </div>
      <div className="border-2 border-dashed border-slate-300 rounded-lg bg-white touch-none overflow-hidden relative group">
        {!hasSignature && !isDrawing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-slate-300 text-lg font-medium">請在此處簽名</span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[200px] cursor-crosshair active:cursor-crosshair"
        />
      </div>
      <p className="text-xs text-slate-400 mt-2">
        請使用滑鼠、觸控板或手指在上方框框內簽名。
      </p>
    </div>
  );
};

export default SignaturePad;