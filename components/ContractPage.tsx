import React, { useState } from 'react';
import { PlanOption, MerchantFormData } from '../types';
import PlanCard from './PlanCard';
import SignaturePad from './SignaturePad';
import { Building2, User, Mail, Phone, FileCheck, AlertCircle, Loader2 } from 'lucide-react';

// Data Definition based on user request
const PLAN_OPTIONS: PlanOption[] = [
  {
    id: 'early_bird',
    name: '1. 早鳥優惠價',
    badge: '限2025/12/31前',
    priceDisplay: '月費 $1 + 交易費 3%',
    details: [
      {
        title: '1-1. 交易服務費',
        description: '乙方每筆交易需向甲方支付交易服務費為交易金額的 [3%]（含稅），未含金融支付手續費，每月[1800]元上限。若平台交易營業額為一萬以下，免收交易服務費。'
      },
      {
        title: '1-2. 平台使用費',
        description: '乙方需向甲方支付平台使用費，內容包含訂餐、訂位等功能，每月[1]元整。'
      }
    ]
  },
  {
    id: 'economic',
    name: '2. 經濟型',
    priceDisplay: '月費 $600 + 交易費 3%',
    details: [
      {
        title: '2-1. 交易服務費',
        description: '乙方每筆交易需向甲方支付交易服務費為交易金額的 [3%]（含稅），未含金融支付手續費，每月[1800]元上限。'
      },
      {
        title: '2-2. 平台使用費',
        description: '乙方需向甲方支付平台使用費，內容包含訂餐、訂位等功能，每月[600]元整。'
      }
    ]
  },
  {
    id: 'buffet_monthly',
    name: '3. 吃到飽月費制',
    priceDisplay: '月費 $1,500',
    details: [
      {
        title: '3-1. 吃到飽專案',
        description: '每月[1500]元整。無需支付額外交易服務費（金融手續費另計）。'
      }
    ]
  },
  {
    id: 'buffet_yearly',
    name: '4. 吃到飽年費制',
    priceDisplay: '年費 $15,000',
    details: [
      {
        title: '4-1. 吃到飽專案',
        description: '每年[15000]元整。無需支付額外交易服務費（金融手續費另計）。'
      }
    ]
  }
];

const ContractPage: React.FC = () => {
  const [formData, setFormData] = useState<MerchantFormData>({
    companyName: '',
    taxId: '',
    representative: '',
    phone: '',
    email: '',
    selectedPlanId: '',
    signature: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlanSelect = (id: string) => {
    setFormData(prev => ({ ...prev, selectedPlanId: id }));
    setError(null);
  };

  const handleSignatureEnd = (dataUrl: string | null) => {
    setFormData(prev => ({ ...prev, signature: dataUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!formData.selectedPlanId) {
      setError("請選擇一個合作方案");
      return;
    }
    if (!formData.signature) {
      setError("請完成簽名");
      return;
    }
    if (!formData.companyName || !formData.taxId || !formData.representative) {
      setError("請填寫完整的商家基本資料");
      return;
    }

    setIsSubmitting(true);

    // Simulate API Call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError("提交失敗，請稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-10 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileCheck className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">簽約成功！</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          感謝您選擇與我們合作。<br/>
          合約副本已發送至您的電子信箱：<span className="font-semibold text-slate-900">{formData.email}</span>
        </p>
        
        <div className="bg-slate-50 rounded-xl p-6 text-left border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">合約摘要</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm">
            <div>
              <dt className="text-slate-500">商家名稱</dt>
              <dd className="font-medium text-slate-900">{formData.companyName}</dd>
            </div>
            <div>
              <dt className="text-slate-500">統一編號</dt>
              <dd className="font-medium text-slate-900">{formData.taxId}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-slate-500">選擇方案</dt>
              <dd className="font-medium text-indigo-600 text-lg mt-1">
                {PLAN_OPTIONS.find(p => p.id === formData.selectedPlanId)?.name}
              </dd>
            </div>
          </dl>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors font-medium"
        >
          返回首頁
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          服務合作備忘錄
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          請填寫基本資料並選擇適合您的合作方案 (四擇一)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Merchant Info */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800">1. 商家基本資料 (乙方)</h3>
          </div>
          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="companyName" className="text-sm font-medium text-slate-700">公司/商號名稱</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none"
                placeholder="請輸入公司名稱"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="taxId" className="text-sm font-medium text-slate-700">統一編號</label>
              <input
                type="text"
                id="taxId"
                name="taxId"
                required
                maxLength={8}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none"
                placeholder="例如: 12345678"
                value={formData.taxId}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="representative" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                <User className="w-4 h-4 text-slate-400" /> 代表人姓名
              </label>
              <input
                type="text"
                id="representative"
                name="representative"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none"
                placeholder="請輸入負責人姓名"
                value={formData.representative}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                <Phone className="w-4 h-4 text-slate-400" /> 聯絡電話
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none"
                placeholder="09xx-xxx-xxx"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                <Mail className="w-4 h-4 text-slate-400" /> 電子信箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none"
                placeholder="contract@example.com (將發送合約副本至此)"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Plan Selection */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800">2. 選擇合作方案 (四擇一)</h3>
          </div>
          <div className="p-6 sm:p-8 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PLAN_OPTIONS.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={formData.selectedPlanId === plan.id}
                  onSelect={handlePlanSelect}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Signature */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <span className="font-serif italic text-xl font-bold text-indigo-600">Sign</span>
            <h3 className="text-lg font-bold text-slate-800">3. 簽署確認</h3>
          </div>
          <div className="p-6 sm:p-8">
            <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-200 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-1">簽署聲明：</p>
                <p>本人已詳閱上述合作條款，確認選擇之方案無誤，並同意遵守相關規範。</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Read-only fields for context */}
               <div className="space-y-4">
                  <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 h-full">
                     <h4 className="font-medium text-slate-700 mb-3">簽約摘要</h4>
                     <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                           <span className="text-slate-500">日期：</span>
                           <span className="font-medium">{new Date().toLocaleDateString('zh-TW')}</span>
                        </li>
                        <li className="flex justify-between">
                           <span className="text-slate-500">甲方：</span>
                           <span className="font-medium">平台服務股份有限公司</span>
                        </li>
                        <li className="flex justify-between">
                           <span className="text-slate-500">乙方：</span>
                           <span className="font-medium">{formData.companyName || '(尚未填寫)'}</span>
                        </li>
                        <li className="flex justify-between">
                           <span className="text-slate-500">選擇方案：</span>
                           <span className={`font-bold ${formData.selectedPlanId ? 'text-indigo-600' : 'text-slate-400'}`}>
                             {PLAN_OPTIONS.find(p => p.id === formData.selectedPlanId)?.name || '(尚未選擇)'}
                           </span>
                        </li>
                     </ul>
                  </div>
               </div>
               
               {/* Signature Canvas */}
               <div>
                  <SignaturePad onEnd={handleSignatureEnd} />
               </div>
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <div className="flex flex-col items-center gap-4 pt-4 pb-12">
          {error && (
             <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg animate-bounce">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
             </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[300px] bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-indigo-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                處理中...
              </>
            ) : (
              '確認簽署並送出'
            )}
          </button>
          <p className="text-sm text-slate-400">點擊送出即代表具有法律效力之數位簽署</p>
        </div>

      </form>
    </div>
  );
};

export default ContractPage;