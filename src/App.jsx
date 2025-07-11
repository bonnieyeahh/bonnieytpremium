import React, { useState } from "react";
import { Calendar, DollarSign, Clock, Calculator } from "lucide-react";

function App() {
  const [form, setForm] = useState({
    oldPricePerMonth: "",
    remainingDays: "",
    newPricePerMonth: "",
    plan: "1",
  });

  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const planDays = parseInt(form.plan) * 30;
    const oldPerDay = Number(form.oldPricePerMonth) / planDays;
    const newPerDay = Number(form.newPricePerMonth) / 30;
    const oldValue = oldPerDay * Number(form.remainingDays);
    const newValue = newPerDay * Number(form.remainingDays);
    const diff = newValue - oldValue;

    setResult({ oldValue, newValue, diff });
  };

  const handleReset = () => {
    setForm({ oldPricePerMonth: "", remainingDays: "", newPricePerMonth: "", plan: "1" });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-pink-100 px-4 py-8">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2 mb-1">
          <Calculator className="w-6 h-6 text-red-500" />
          คำนวณส่วนต่าง YouTube
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          ระบบคำนวณส่วนต่างที่ต้องจ่ายเพิ่มเมื่อเปลี่ยนแพ็กเกจ
        </p>

        <div className="grid gap-4">
          {/* แพ็กเกจเดิม */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <label className="text-sm font-medium w-48">จำนวนเดือน (แพ็กเกจเดิม)</label>
            <select
              className="flex-1 border rounded px-2 py-1 text-sm"
              value={form.plan}
              onChange={(e) => setForm({ ...form, plan: e.target.value })}
            >
              <option value="1">1 เดือน</option>
              <option value="3">3 เดือน</option>
              <option value="6">6 เดือน</option>
              <option value="12">12 เดือน</option>
            </select>
          </div>

          {/* ราคาเดิม */}
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <label className="text-sm font-medium w-48">ราคา (แพ็กเกจเดิม)</label>
            <input
              type="number"
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="ใส่ราคาเป็นบาท"
              value={form.oldPricePerMonth}
              onChange={(e) => setForm({ ...form, oldPricePerMonth: e.target.value })}
            />
          </div>

          {/* จำนวนวันที่เหลือ */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <label className="text-sm font-medium w-48">เหลือวันใช้งาน</label>
            <input
              type="number"
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="ใส่จำนวนวัน"
              value={form.remainingDays}
              onChange={(e) => setForm({ ...form, remainingDays: e.target.value })}
            />
          </div>

          {/* ราคาใหม่ */}
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <label className="text-sm font-medium w-48">เพิ่มเป็นเดือนละ (แพ็กเกจใหม่)</label>
            <input
              type="number"
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="ใส่ราคาเดือนละ"
              value={form.newPricePerMonth}
              onChange={(e) => setForm({ ...form, newPricePerMonth: e.target.value })}
            />
          </div>

          {/* ปุ่มคำนวณ */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCalculate}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded py-2 font-semibold flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              คำนวณ
            </button>
            <button
              onClick={handleReset}
              className="px-4 border border-gray-400 rounded text-gray-600 text-sm"
            >
              รีเซ็ต
            </button>
          </div>
        </div>
      </div>

      {/* แสดงผลลัพธ์ */}
      <div className="max-w-xl mx-auto mt-6 bg-white shadow rounded-xl p-4">
        <h2 className="text-md font-bold mb-2">ผลการคำนวณ</h2>
        {!result ? (
          <p className="text-gray-500 text-sm">ยังไม่มีข้อมูล</p>
        ) : (
          <div className="text-sm space-y-1">
            <p>ค่าที่เหลือจากแพ็กเกจเดิม: {result.oldValue.toFixed(2)} บาท</p>
            <p>ค่าที่ต้องจ่ายเพิ่ม: {result.newValue.toFixed(2)} บาท</p>
            <p className={result.diff > 0 ? "text-red-500" : "text-green-600"}>
              ส่วนต่าง: {result.diff.toFixed(2)} บาท
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
