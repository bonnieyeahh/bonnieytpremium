import React, { useState } from 'react';
import { FaCalendarAlt, FaMoneyBillWave, FaPlusCircle, FaStopwatch } from 'react-icons/fa';

const YouTubePriceCalculator = () => {
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [remainingMonths, setRemainingMonths] = useState('');
  const [oldPackageMonths, setOldPackageMonths] = useState('12');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const oldPriceNum = parseFloat(oldPrice);
    const newPriceNum = parseFloat(newPrice);
    const monthsLeft = parseFloat(remainingMonths);
    const oldMonths = parseFloat(oldPackageMonths);

    if (
      isNaN(oldPriceNum) ||
      isNaN(newPriceNum) ||
      isNaN(monthsLeft) ||
      isNaN(oldMonths) ||
      oldMonths <= 0
    ) {
      setResult('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง');
      return;
    }

    const oldMonthlyRate = oldPriceNum / oldMonths;
    const diffPerMonth = newPriceNum - oldMonthlyRate;
    const totalDiff = diffPerMonth * monthsLeft;

    setResult(`ส่วนต่างที่ต้องจ่ายเพิ่ม: ${totalDiff.toFixed(2)} บาท`);
  };

  const handleReset = () => {
    setOldPrice('');
    setNewPrice('');
    setRemainingMonths('');
    setOldPackageMonths('12');
    setResult(null);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
      <h1 className="text-2xl font-bold text-center text-red-600 mb-1">คำนวณส่วนต่างราคา YouTube Premium</h1>
      <p className="text-center text-gray-600 text-sm mb-6">by.ร้านบ้านยูทูป @106gpmvh</p>

      <div className="space-y-4">
        <div>
          <label className="block font-medium text-sm text-gray-700">
            <FaMoneyBillWave className="inline mr-1" />
            ราคาที่ซื้อไว้ (บาท)
          </label>
          <input
            type="number"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="ใส่ราคาบาท"
          />
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700">
            💳 ราคาใหม่ (บาท)
          </label>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="ใส่ราคาบาท"
          />
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700">
            <FaCalendarAlt className="inline mr-1" />
            แพ็กเกจเดิมที่เคยซื้อ
          </label>
          <select
            value={oldPackageMonths}
            onChange={(e) => setOldPackageMonths(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="1">1 เดือน</option>
            <option value="2">2 เดือน</option>
            <option value="3">3 เดือน</option>
            <option value="6">6 เดือน</option>
            <option value="9">9 เดือน</option>
            <option value="12">12 เดือน</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700">
            <FaStopwatch className="inline mr-1" />
            เหลือเดือนใช้งาน
          </label>
          <input
            type="number"
            value={remainingMonths}
            onChange={(e) => setRemainingMonths(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="เช่น 4"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleCalculate}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            คำนวณ
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            ล้างค่า
          </button>
        </div>

        {result && (
          <div className="mt-4 text-green-600 font-semibold text-center">
            💡 {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubePriceCalculator;
