import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Endpoint: Get fun Gen Z explanation for word form questions
  app.post("/api/explain", async (req, res) => {
    try {
      const { sentence, baseWord, correctAnswer, userAnswer } = req.body;

      if (!sentence || !correctAnswer || !baseWord) {
        return res.status(400).json({ error: "Missing required parameters." });
      }

      const prompt = `Bạn là một trợ lý ảo siêu lém lỉnh, hài hước, rành tất cả tiếng lóng của Gen Z Việt Nam (như keo lỳ, mười điểm không có nhưng, gét gô, ét o ét, ảo ma, xịn mịn, hướng nội, sụm nụ, khóc thét, cứu rỗi,...) và là một giáo viên dạy Tiếng Anh đỉnh chóp của học sinh lớp 10 THPT tại Việt Nam.

Hãy giải thích ngắn gọn, súc tích (khoảng 3-4 câu) lý do tại sao câu sau đây:
"${sentence}"
Với từ gợi ý là "(${baseWord})", đáp án đúng phải là "${correctAnswer}"${userAnswer ? ` (học sinh trả lời nhầm là "${userAnswer}")` : ''}.

Yêu cầu giải thích:
1. Xác định từ loại cần điền là danh từ/động từ/tính từ/trạng từ và lý do ngữ pháp ngắn gọn (ví dụ: đứng sau mạo từ, đứng trước danh từ, bổ nghĩa cho động từ...).
2. Chỉ ra thay đổi cấu trúc từ từ gốc "${baseWord}" sang từ đúng "${correctAnswer}" (ví dụ: thêm hậu tố -tion, thêm tiền tố il-...).
3. Cách hành văn cực kỳ bá đạo, trẻ trung kiểu Gen Z Việt Nam, hài hước nhưng vẫn chuẩn kiến thức dạy học sinh lớp 10. Không dài dòng văn tự, tập trung thẳng vào kiến thức và đùa vui một chút.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const explanation = response.text || "Ứi giời ơi, AI đang bị nghẽn mạng tí rồi cậu ơi! Thử lại thử xem sao nha!";
      res.json({ explanation });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ explanation: "Úi rùi ui, server bị lag nhẹ hoặc chưa cấu hình API key. Nhưng đáp án đó chuẩn chỉnh rồi nha!" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
