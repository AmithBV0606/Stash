"use client";

import { useState } from "react";
import { Shield, CreditCard, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function page() {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const params = useParams<{ bankName: string }>();
  const router = useRouter();

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "" || parseInt(value) <= 100000) {
      setAmount(value);
    }
  };

  const handleProceed = async () => {
    if (!amount || parseInt(amount) < 100) return;

    if (!amount || parseInt(amount) > 10000) return;

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowSuccess(true);

    setTimeout(() => {
      router.replace("/dashboard/home");
      setShowSuccess(false);
      setAmount("");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Payment Successful!
              </h3>
              <p className="text-slate-400 mb-1">
                ₹{parseInt(amount).toLocaleString("en-IN")} added to your wallet
              </p>
              <p className="text-sm text-slate-500">
                Redirecting to dashboard...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        <button
          onClick={() => router.replace("/dashboard/home")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Stash</span>
        </button>

        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-[#1447e6] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">
                  Connected to
                </p>
                <h1 className="text-2xl font-bold text-white">
                  {params.bankName.toUpperCase()}
                </h1>
              </div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <label className="block text-slate-400 text-sm font-medium mb-3">
                Enter Amount
              </label>

              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-slate-500">
                  ₹
                </span>

                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl pl-14 pr-6 py-5 text-4xl font-bold text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {amount &&
                (parseInt(amount) < 100 || parseInt(amount) > 10000) && (
                  <p className="text-red-400 text-sm mt-2 ml-1">
                    Minimum: ₹100 • Maximum: ₹10,000
                  </p>
                )}

              {amount &&
                parseInt(amount) >= 100 &&
                parseInt(amount) <= 10000 && (
                  <p className="text-emerald-400 text-sm mt-2 ml-1">
                    Amount to be added: ₹
                    {parseInt(amount).toLocaleString("en-IN")}
                  </p>
                )}
            </div>

            <div className="mb-8">
              <p className="text-slate-400 text-sm font-medium mb-3">
                Quick Select
              </p>
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleQuickAmount(value)}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                      amount === value.toString()
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-slate-900/50 text-slate-300 border border-slate-700 hover:border-slate-600 hover:bg-slate-900"
                    }`}
                  >
                    ₹{value.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl mb-6">
              <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium mb-1">
                  Secure Payment
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Your transaction is protected with bank-level encryption
                </p>
              </div>
            </div>

            <button
              onClick={handleProceed}
              disabled={
                !amount ||
                parseInt(amount) < 100 ||
                parseInt(amount) > 10000 ||
                isProcessing
              }
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                !amount ||
                parseInt(amount) < 100 ||
                parseInt(amount) > 10000 ||
                isProcessing
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Proceed to Pay"
              )}
            </button>

            <p className="text-center text-slate-500 text-xs mt-4">
              By proceeding, you agree to the terms and conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
