"use client";

import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Calculator, X } from "lucide-react";

interface EmiCalculatorModalProps {
  open: boolean;
  onClose: () => void;
  initialPrice?: number;
}

const formatIndianCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
};

export default function EmiCalculatorModal({
  open,
  onClose,
  initialPrice = 0,
}: EmiCalculatorModalProps) {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentType, setDownPaymentType] = useState<"percent" | "amount">("percent");
  const [downPaymentValue, setDownPaymentValue] = useState<number>(20); // default 20%
  const [interestRate, setInterestRate] = useState<number>(8.5); // default 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // default 20 years

  const [emiResult, setEmiResult] = useState<{
    monthlyEmi: number;
    totalInterest: number;
    totalPayable: number;
    loanAmount: number;
  }>({
    monthlyEmi: 0,
    totalInterest: 0,
    totalPayable: 0,
    loanAmount: 0,
  });

  useEffect(() => {
    if (initialPrice > 0) {
      setPropertyPrice(initialPrice);
    }
  }, [initialPrice]);

  // Calculate Down Payment Amount & Loan Amount
  const downPaymentAmount =
    downPaymentType === "percent"
      ? (propertyPrice * downPaymentValue) / 100
      : downPaymentValue;

  const loanAmount = Math.max(0, propertyPrice - downPaymentAmount);

  // EMI Calculation Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (P <= 0 || r <= 0 || n <= 0) {
      setEmiResult({
        monthlyEmi: 0,
        totalInterest: 0,
        totalPayable: 0,
        loanAmount: P,
      });
      return;
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterestPayable = totalAmount - P;

    setEmiResult({
      monthlyEmi: emi,
      totalInterest: totalInterestPayable,
      totalPayable: totalAmount,
      loanAmount: P,
    });
  };

  useEffect(() => {
    calculateEMI();
  }, [propertyPrice, downPaymentValue, downPaymentType, interestRate, tenureYears]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "1rem",
            padding: 0,
            overflow: "hidden",
          },
        },
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <div className="bg-white p-5 sm:p-7">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/10 text-blue">
                <Calculator className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Calculate Your EMI</h3>
                <p className="text-xs text-gray-500">Estimate your home loan monthly instalments</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Input Form Fields */}
          <div className="mt-5 space-y-4">
            {/* Property Price */}
            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Property Price (₹)
              </label>
              <input
                type="number"
                value={propertyPrice || ""}
                onChange={(e) => setPropertyPrice(Number(e.target.value) || 0)}
                placeholder="Enter property price"
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-blue focus:ring-1 focus:ring-blue"
              />
            </div>

            {/* Down Payment with ₹ and % toggle */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-gray-700">Down Payment</label>
                <div className="flex items-center rounded-lg bg-gray-100 p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setDownPaymentType("percent");
                      setDownPaymentValue(20);
                    }}
                    className={`rounded-md px-2.5 py-1 font-medium transition ${
                      downPaymentType === "percent" ? "bg-white text-blue shadow-xs" : "text-gray-600"
                    }`}
                  >
                    %
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDownPaymentType("amount");
                      setDownPaymentValue((propertyPrice * 20) / 100);
                    }}
                    className={`rounded-md px-2.5 py-1 font-medium transition ${
                      downPaymentType === "amount" ? "bg-white text-blue shadow-xs" : "text-gray-600"
                    }`}
                  >
                    ₹
                  </button>
                </div>
              </div>
              <div className="mt-1.5 flex gap-2">
                <input
                  type="number"
                  value={downPaymentValue || ""}
                  onChange={(e) => setDownPaymentValue(Number(e.target.value) || 0)}
                  placeholder={downPaymentType === "percent" ? "e.g. 20" : "e.g. 500000"}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                />
              </div>
              <p className="mt-1 text-right text-[11px] text-gray-500">
                Down Payment Amount: ₹ {formatIndianCurrency(downPaymentAmount)}
              </p>
            </div>

            {/* Auto Calculated Loan Amount */}
            <div>
              <label className="block text-xs font-semibold text-gray-700">Loan Amount (Auto-Calculated)</label>
              <div className="mt-1.5 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm font-bold text-[#05085E]">
                ₹ {formatIndianCurrency(loanAmount)}
              </div>
            </div>

            {/* Interest Rate & Loan Tenure Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate || ""}
                  onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700">Loan Tenure (Years)</label>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-blue focus:ring-1 focus:ring-blue bg-white cursor-pointer"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((yr) => (
                    <option key={yr} value={yr}>
                      {yr} {yr === 1 ? "Year" : "Years"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="mt-6 rounded-2xl bg-[#05085E] p-4 sm:p-5 text-white shadow-md">
            <div className="border-b border-white/15 pb-3">
              <p className="text-xs uppercase tracking-wider text-white/70">Monthly EMI</p>
              <p className="mt-1 text-2xl sm:text-3xl font-bold text-emerald-400">
                ₹ {formatIndianCurrency(emiResult.monthlyEmi)}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-white/70">Total Interest</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  ₹ {formatIndianCurrency(emiResult.totalInterest)}
                </p>
              </div>
              <div>
                <p className="text-white/70">Total Amount Payable</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  ₹ {formatIndianCurrency(emiResult.totalPayable)}
                </p>
              </div>
            </div>
          </div>

          {/* <button
            type="button"
            onClick={calculateEMI}
            className="mt-5 w-full rounded-full bg-blue py-3 text-sm font-semibold text-white transition hover:bg-blue/90"
          >
            Recalculate EMI
          </button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}