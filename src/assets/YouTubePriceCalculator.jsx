import React, { useState } from 'react';
import { Calculator, CalendarDays, Clock, DollarSign } from 'lucide-react';

export default function App() {
  const [oldMonthlyPrice, setOldMonthlyPrice] = useState('');
  const [newMonthlyPrice, setNewMonthlyPrice] = useState('');
  const [remainingDays, setRemainingDays] = useState('');
  const [months, setMonths] = useState(1);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const oldMonthly = parseFloat(oldMonthlyPrice);
    const newMonthly = parseFloat(newMonthlyPrice);
    const daysLeft = parseInt(remainingDays);

    if (isNaN(oldMonthly) || isNaN(newMonthly) || isNaN(daysLeft)) {
      setResult(null);
      return;
    }

    const oldPerDay = oldMonthly / 30;
    const newPerDay = newMonthly / 30;
    const oldRemaining = oldPerDay * daysLeft;
    const newRemaining = newPerDay * daysLeft;
    const difference = newRemaining - oldRemaining;

    setResult({ oldRemaining, newRemaining, difference });
  };

  const handleReset = () => {
    setOldMonthlyPrice('');
    setNewMonthlyPrice('');
    setRemainingDays('');
    setMonths(1);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Calculator className="text-red-500" /> คำนวณส่วนต่าง YouTube
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          ระบบคำนวณส่วนต่างที่ต้องจ่ายเพิ่มเมื่อเปลี่ยนแพ็กเกจ
        </p>

        <div className="grid gap-4">
          <label className="block text-sm font-medium">
            <CalendarDays className="inline mr-2" /> จำนวนเดือน (แพ็กเกจเดิม)
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
            >
              {[1, 2, 3, 6, 12].map((m) => (
                <option key={m} value={m}>
                  {m} เดือน
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium">
            <DollarSign className="inline mr-2" /> ราคา (แพ็กเกจเดิม)
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm"
              placeholder="ใส่ราคาเป็นบาท"
              value={oldMonthlyPrice}
              onChange={(e) => setOldMonthlyPrice(e.target.value)}
            />
          </label>

          <label className="block text-sm font-medium">
            <Clock className="inline mr-2" /> เหลือวันใช้งาน
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm"
              placeholder="ใส่จำนวนวัน"
              value={remainingDays}
              onChange={(e) => setRemainingDays(e.target.value)}
            />
          </label>

          <label className="block text-sm font-medium">
            <DollarSign className="inline mr-2" /> เพิ่มเป็นเดือนละ (แพ็กเกจใหม่)
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm"
              placeholder="ใส่ราคาเดือนละ"
              value={newMonthlyPrice}
              onChange={(e) => setNewMonthlyPrice(e.target.value)}
            />
          </label>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCalculate}
              className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            >
              <Calculator className="inline mr-2" /> คำนวณ
            </button>
            <button
              onClick={handleReset}
              className="bg-white border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100"
            >
              รีเซ็ต
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto mt-6 bg-white rounded-2xl shadow p-6">
        <h2 className="font-bold text-lg mb-4">ผลการคำนวณ</h2>
        {result ? (
          <ul className="text-sm space-y-2">
            <li>มูลค่าสิทธิเดิมที่เหลือ: {result.oldRemaining.toFixed(2)} บาท</li>
            <li>มูลค่าสิทธิใหม่ที่ต้องจ่าย: {result.newRemaining.toFixed(2)} บาท</li>
            <li>
              ส่วนต่างที่ต้องจ่ายเพิ่ม:{' '}
              <span className="font-bold text-red-500">{result.difference.toFixed(2)} บาท</span>
            </li>
          </ul>
        ) : (
          <p className="text-gray-400 text-sm text-center">ยังไม่มีข้อมูล</p>
        )}
      </div>
    </div>
  );
}
