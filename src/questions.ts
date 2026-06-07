export interface Question {
  id: number;
  part: string;
  partDesc: string;
  sentence: string;
  baseWord: string;
  correctAnswer: string;
  acceptedAnswers: string[];
  hint: string;
}

export const questions: Question[] = [
  // PHẦN 1: CÁC LOẠI TỪ CƠ BẢN ( danh từ, động từ, tính từ, trạng từ )
  {
    id: 1,
    part: "Phần 1",
    partDesc: "Các Loại Từ Cơ Bản (Danh từ, Động từ, Tính từ, Trạng từ)",
    sentence: "The ________ of the new system has caused some confusion.",
    baseWord: "INTRODUCE",
    correctAnswer: "introduction",
    acceptedAnswers: ["introduction"],
    hint: "Đứng sau mạo từ 'The' và đứng trước giới từ 'of' cần một Danh từ (Noun)."
  },
  {
    id: 2,
    part: "Phần 1",
    partDesc: "Các Loại Từ Cơ Bản (Danh từ, Động từ, Tính từ, Trạng từ)",
    sentence: "She is a very ________ person who always helps others.",
    baseWord: "RELY",
    correctAnswer: "reliable",
    acceptedAnswers: ["reliable"],
    hint: "Cần một Tính từ (Adjective) đứng trước danh từ 'person' để bổ nghĩa, đi kèm trạng từ chỉ mức độ 'very'."
  },
  {
    id: 3,
    part: "Phần 1",
    partDesc: "Các Loại Từ Cơ Bản (Danh từ, Động từ, Tính từ, Trạng từ)",
    sentence: "We need to ________ the environment to prevent further damage.",
    baseWord: "PROTECTION",
    correctAnswer: "protect",
    acceptedAnswers: ["protect"],
    hint: "Đứng sau động từ khuyết thiếu 'need to' cần một Động từ nguyên thể (Infinitive verb)."
  },
  {
    id: 4,
    part: "Phần 1",
    partDesc: "Các Loại Từ Cơ Bản (Danh từ, Động từ, Tính từ, Trạng từ)",
    sentence: "He spoke ________ about his experiences in the war.",
    baseWord: "PASSIONATE",
    correctAnswer: "passionately",
    acceptedAnswers: ["passionately"],
    hint: "Đứng sau động từ thường 'spoke' cần một Trạng từ (Adverb) bổ nghĩa cho hành động nói."
  },
  {
    id: 5,
    part: "Phần 1",
    partDesc: "Các Loại Từ Cơ Bản (Danh từ, Động từ, Tính từ, Trạng từ)",
    sentence: "The ________ of the new building is scheduled for next month.",
    baseWord: "CONSTRUCT",
    correctAnswer: "construction",
    acceptedAnswers: ["construction"],
    hint: "Cần một Danh từ (Noun) làm chủ ngữ chính của câu, đứng sau mạo từ 'The' và trước giới từ 'of'."
  },
  {
    id: 6,
    part: "Phần 1",
    partDesc: "Các Loại Từ Cơ Bản (Danh từ, Động từ, Tính từ, Trạng từ)",
    sentence: "The company is looking for ________ employees.",
    baseWord: "DEDICATE",
    correctAnswer: "dedicated",
    acceptedAnswers: ["dedicated"],
    hint: "Cần một Tính từ dạng phân từ (participle adjective) đứng trước danh từ 'employees' để chỉ đặc điểm tận tụy."
  },
  {
    id: 7,
    part: "Phần 1",
    partDesc: "Các Loại Từ Cơ Bản (Danh từ, Động từ, Tính từ, Trạng từ)",
    sentence: "The teacher ________ the students to participate in extracurricular activities.",
    baseWord: "COURAGE",
    correctAnswer: "encouraged",
    acceptedAnswers: ["encouraged", "encourages"],
    hint: "Cần một Động từ (Verb) chia ở thì phù hợp (quá khứ đơn 'encouraged' hoặc hiện tại đơn 'encourages') theo cấu trúc 'encourage somebody to do something'."
  },
  {
    id: 8,
    part: "Phần 1",
    partDesc: "Các Loại Từ Cơ Bản (Danh từ, Động từ, Tính từ, Trạng từ)",
    sentence: "The scenery in the mountains is absolutely ________.",
    baseWord: "BREATH",
    correctAnswer: "breathtaking",
    acceptedAnswers: ["breathtaking"],
    hint: "Đứng sau trạng từ mạnh 'absolutely' và động từ 'is' cần một Tính từ tuyệt đẹp, làm nghẹt thở."
  },

  // PHẦN 2: TIỀN TỐ (PREFIXES) VÀ HẬU TỐ (SUFFIXES) THÔNG DỤNG
  {
    id: 9,
    part: "Phần 2",
    partDesc: "Tiền Tố (Prefixes) và Hậu Tố (Suffixes) Thông Dụng",
    sentence: "It is ________ to drive without a license.",
    baseWord: "LEGAL",
    correctAnswer: "illegal",
    acceptedAnswers: ["illegal"],
    hint: "Cần một Tính từ mang nghĩa phủ định nhờ tiền tố 'il-': trái pháp luật."
  },
  {
    id: 10,
    part: "Phần 2",
    partDesc: "Tiền Tố (Prefixes) và Hậu Tố (Suffixes) Thông Dụng",
    sentence: "The instructions were ________, so I made a mistake.",
    baseWord: "CLEAR",
    correctAnswer: "unclear",
    acceptedAnswers: ["unclear"],
    hint: "Cần tiền tố phủ định 'un-' đi với tính từ 'clear' để tạo thành 'unclear' (không rõ ràng)."
  },
  {
    id: 11,
    part: "Phần 2",
    partDesc: "Tiền Tố (Prefixes) và Hậu Tố (Suffixes) Thông Dụng",
    sentence: "She felt ________ when she realized she had lost her phone.",
    baseWord: "HOPE",
    correctAnswer: "hopeless",
    acceptedAnswers: ["hopeless"],
    hint: "Đứng sau động từ nối 'felt' cần một Tính từ lo lắng, bất lực, vô vọng."
  },
  {
    id: 12,
    part: "Phần 2",
    partDesc: "Tiền Tố (Prefixes) và Hậu Tố (Suffixes) Thông Dụng",
    sentence: "He is an ________ person; he never waits for anything.",
    baseWord: "PATIENT",
    correctAnswer: "impatient",
    acceptedAnswers: ["impatient"],
    hint: "Chi tiết 'không bao giờ đợi' chỉ tính cách nóng nảy, mất kiên nhẫn. Thêm tiền tố phủ định 'im-'."
  },
  {
    id: 13,
    part: "Phần 2",
    partDesc: "Tiền Tố (Prefixes) và Hậu Tố (Suffixes) Thông Dụng",
    sentence: "The new software is very ________.",
    baseWord: "USER",
    correctAnswer: "user-friendly",
    acceptedAnswers: ["user-friendly", "friendly"],
    hint: "Cụm tính từ ghép chỉ phần mềm dễ tiếp cận cho người dùng."
  },
  {
    id: 14,
    part: "Phần 2",
    partDesc: "Tiền Tố (Prefixes) và Hậu Tố (Suffixes) Thông Dụng",
    sentence: "She has a strong ________ of belonging to the community.",
    baseWord: "SENSE",
    correctAnswer: "sense",
    acceptedAnswers: ["sense"],
    hint: "Cụm từ 'have a strong sense of...' diễn tả ý thức/cảm nhận sâu sắc về việc gì."
  },
  {
    id: 15,
    part: "Phần 2",
    partDesc: "Tiền Tố (Prefixes) và Hậu Tố (Suffixes) Thông Dụng",
    sentence: "He gave an ________ performance in the play.",
    baseWord: "OUTSTAND",
    correctAnswer: "outstanding",
    acceptedAnswers: ["outstanding"],
    hint: "Cần tính từ 'outstanding' đứng trước để bổ nghĩa cho danh từ 'performance' (màn thể hiện xuất chúng)."
  },
  {
    id: 16,
    part: "Phần 2",
    partDesc: "Tiền Tố (Prefixes) và Hậu Tố (Suffixes) Thông Dụng",
    sentence: "The journey was ________ long and tiring.",
    baseWord: "EXPECT",
    correctAnswer: "unexpectedly",
    acceptedAnswers: ["unexpectedly"],
    hint: "Trước tính từ 'long' cần một Trạng từ (Adverb) bổ nghĩa để chỉ mức độ dài một cách không ngờ tới."
  },

  // PHẦN 3: CHỦ ĐỀ MÔI TRƯỜNG & ĐỜI SỐNG (Gần với SGK Lớp 10)
  {
    id: 17,
    part: "Phần 3",
    partDesc: "Chủ Đề Môi Trường & Đời Sống (SGK Lớp 10)",
    sentence: "We must take action to reduce ________.",
    baseWord: "POLLUTE",
    correctAnswer: "pollution",
    acceptedAnswers: ["pollution"],
    hint: "Sau động từ 'reduce' cần một siêu Danh từ chỉ sự ô nhiễm."
  },
  {
    id: 18,
    part: "Phần 3",
    partDesc: "Chủ Đề Môi Trường & Đời Sống (SGK Lớp 10)",
    sentence: "The ________ of natural resources is a major concern.",
    baseWord: "DEPLETE",
    correctAnswer: "depletion",
    acceptedAnswers: ["depletion"],
    hint: "Sử dụng Danh từ 'depletion' đứng sau mạo từ 'The' và trước giới từ 'of' để diễn đạt sự cạn kiệt tài nguyên thiên nhiên."
  },
  {
    id: 19,
    part: "Phần 3",
    partDesc: "Chủ Đề Môi Trường & Đời Sống (SGK Lớp 10)",
    sentence: "Solar energy is a ________ source of power.",
    baseWord: "RENEW",
    correctAnswer: "renewable",
    acceptedAnswers: ["renewable"],
    hint: "Tính từ 'renewable' đứng trước bổ nghĩa cho danh từ chỉ nguồn năng lượng tái tạo."
  },
  {
    id: 20,
    part: "Phần 3",
    partDesc: "Chủ Đề Môi Trường & Đời Sống (SGK Lớp 10)",
    sentence: "The campaign aims to raise ________ about climate change.",
    baseWord: "AWARE",
    correctAnswer: "awareness",
    acceptedAnswers: ["awareness"],
    hint: "Cụm từ quen thuộc đi cùng động từ 'raise' là 'raise awareness of/about something' (nâng cao nhận thức)."
  },
  {
    id: 21,
    part: "Phần 3",
    partDesc: "Chủ Đề Môi Trường & Đời Sống (SGK Lớp 10)",
    sentence: "Many species of animals are currently ________.",
    baseWord: "DANGER",
    correctAnswer: "endangered",
    acceptedAnswers: ["endangered"],
    hint: "Cụm danh-tính từ 'endangered species' hay tính từ chỉ loài sinh vật có nguy cơ tuyệt chủng."
  },
  {
    id: 22,
    part: "Phần 3",
    partDesc: "Chủ Đề Môi Trường & Đời Sống (SGK Lớp 10)",
    sentence: "We should promote ________ development.",
    baseWord: "SUSTAIN",
    correctAnswer: "sustainable",
    acceptedAnswers: ["sustainable"],
    hint: "Tính từ cực kỳ quen thuộc trong sách giáo khoa 10: sự phát triển bền vững."
  },
  {
    id: 23,
    part: "Phần 3",
    partDesc: "Chủ Đề Môi Trường & Đời Sống (SGK Lớp 10)",
    sentence: "Organic farming is becoming increasingly ________.",
    baseWord: "POPULARITY",
    correctAnswer: "popular",
    acceptedAnswers: ["popular"],
    hint: "Sau động từ nối 'becoming' và trạng từ 'increasingly' bạn cần một Tính từ chỉ độ phổ biến."
  },
  {
    id: 24,
    part: "Phần 3",
    partDesc: "Chủ Đề Môi Trường & Đời Sống (SGK Lớp 10)",
    sentence: "Global warming is a serious ________ to our planet.",
    baseWord: "THREATEN",
    correctAnswer: "threat",
    acceptedAnswers: ["threat"],
    hint: "Sau mạo từ 'a' và tính từ 'serious' cần một Danh từ (Noun) mang nghĩa mối đe dọa."
  },

  // PHẦN 4: CHỦ ĐỀ GIÁO DỤC & NGHỀ NGHIỆP (Gần với SGK Lớp 10)
  {
    id: 25,
    part: "Phần 4",
    partDesc: "Chủ Đề Giáo Dục & Nghề Nghiệp (SGK Lớp 10)",
    sentence: "He is studying for a ________ in engineering.",
    baseWord: "DEGREED",
    correctAnswer: "degree",
    acceptedAnswers: ["degree"],
    hint: "Sau mạo từ 'a' cần một Danh từ chỉ bằng cấp học thuật."
  },
  {
    id: 26,
    part: "Phần 4",
    partDesc: "Chủ Đề Giáo Dục & Nghề Nghiệp (SGK Lớp 10)",
    sentence: "The school provides excellent ________ facilities.",
    baseWord: "EDUCATE",
    correctAnswer: "educational",
    acceptedAnswers: ["educational"],
    hint: "Đứng trước danh từ số nhiều 'facilities' cần một Tính từ để bổ nghĩa thành cơ sở vật chất giáo dục."
  },
  {
    id: 27,
    part: "Phần 4",
    partDesc: "Chủ Đề Giáo Dục & Nghề Nghiệp (SGK Lớp 10)",
    sentence: "She has a lot of ________ in teaching English.",
    baseWord: "EXPERIENCE",
    correctAnswer: "experience",
    acceptedAnswers: ["experience"],
    hint: "Sau cụm từ chỉ lượng 'a lot of' cần một danh từ số nhiều hoặc danh từ không đếm được chỉ kinh nghiệm."
  },
  {
    id: 28,
    part: "Phần 4",
    partDesc: "Chủ Đề Giáo Dục & Nghề Nghiệp (SGK Lớp 10)",
    sentence: "The course is designed to improve your ________ skills.",
    baseWord: "COMMUNICATE",
    correctAnswer: "communication",
    acceptedAnswers: ["communication", "communicative"],
    hint: "Danh từ ghép hoặc tính từ bổ nghĩa cho 'skills'. Kết hợp thành 'communication skills' (kỹ năng giao tiếp)."
  },
  {
    id: 29,
    part: "Phần 4",
    partDesc: "Chủ Đề Giáo Dục & Nghề Nghiệp (SGK Lớp 10)",
    sentence: "The job requires a high level of ________.",
    baseWord: "PROFESSION",
    correctAnswer: "professionalism",
    acceptedAnswers: ["professionalism"],
    hint: "Sau giới từ 'of' cần một Danh từ trừu tượng chỉ tác phong làm việc chuyên nghiệp."
  },
  {
    id: 30,
    part: "Phần 4",
    partDesc: "Chủ Đề Giáo Dục & Nghề Nghiệp (SGK Lớp 10)",
    sentence: "She is a very ________ employee.",
    baseWord: "PRODUCT",
    correctAnswer: "productive",
    acceptedAnswers: ["productive"],
    hint: "Cần một Tính từ trước danh từ 'employee' mang ý nghĩa làm việc năng suất, tạo ra nhiều giá trị."
  },
  {
    id: 31,
    part: "Phần 4",
    partDesc: "Chủ Đề Giáo Dục & Nghề Nghiệp (SGK Lớp 10)",
    sentence: "He is hoping to get a ________ next year.",
    baseWord: "PROMOTE",
    correctAnswer: "promotion",
    acceptedAnswers: ["promotion"],
    hint: "Sau cụm từ 'get a' chúng ta cần một Danh từ mang nghĩa thăng chức trong công việc."
  },
  {
    id: 32,
    part: "Phần 4",
    partDesc: "Chủ Đề Giáo Dục & Nghề Nghiệp (SGK Lớp 10)",
    sentence: "She has a deep ________ of the subject.",
    baseWord: "KNOW",
    correctAnswer: "knowledge",
    acceptedAnswers: ["knowledge"],
    hint: "Sau tính từ 'deep' và trước giới từ 'of' cần một Danh từ trừu tượng chỉ sự hiểu biết, kiến thức."
  },

  // PHẦN 5: BÀI TẬP TỔNG HỢP NÂN CAO
  {
    id: 33,
    part: "Phần 5",
    partDesc: "Bài Tập Tổng Hợp Nâng Cao",
    sentence: "The situation is completely ________.",
    baseWord: "HOPE",
    correctAnswer: "hopeless",
    acceptedAnswers: ["hopeless"],
    hint: "Đi sau động từ nối 'is' và trạng từ 'completely' cần một Tính từ chỉ tình trạng vô vọng, mất hết cơ hội."
  },
  {
    id: 34,
    part: "Phần 5",
    partDesc: "Bài Tập Tổng Hợp Nâng Cao",
    sentence: "He made a ________ error in his calculation.",
    baseWord: "DISASTER",
    correctAnswer: "disastrous",
    acceptedAnswers: ["disastrous"],
    hint: "Trước danh từ 'error' cần tính từ 'disastrous' nghĩa là thảm hại, gây ảnh hưởng cực kỳ xấu."
  },
  {
    id: 35,
    part: "Phần 5",
    partDesc: "Bài Tập Tổng Hợp Nâng Cao",
    sentence: "The painting is a masterpiece of ________.",
    baseWord: "IMAGINE",
    correctAnswer: "imagination",
    acceptedAnswers: ["imagination"],
    hint: "Đứng sau cụm 'masterpiece of' cần một Danh từ trừu tượng chỉ trí tưởng tượng phong phú."
  },
  {
    id: 36,
    part: "Phần 5",
    partDesc: "Bài Tập Tổng Hợp Nâng Cao",
    sentence: "The politician's speech was highly ________.",
    baseWord: "CONTROVERSY",
    correctAnswer: "controversial",
    acceptedAnswers: ["controversial"],
    hint: "Đứng sau động từ nối 'was' và trạng từ bổ nghĩa 'highly', bạn cần một Tính từ gây tranh cãi."
  },
  {
    id: 37,
    part: "Phần 5",
    partDesc: "Bài Tập Tổng Hợp Nâng Cao",
    sentence: "The ________ of the old traditions is important.",
    baseWord: "MAINTAIN",
    correctAnswer: "maintenance",
    acceptedAnswers: ["maintenance"],
    hint: "Phía sau mạo từ 'The' và trước giới từ 'of' cần một Danh từ chỉ việc bảo vệ/duy trì định hình nét đẹp truyền thống."
  },
  {
    id: 38,
    part: "Phần 5",
    partDesc: "Bài Tập Tổng Hợp Nâng Cao",
    sentence: "She has a ________ memory for names and faces.",
    baseWord: "REMARK",
    correctAnswer: "remarkable",
    acceptedAnswers: ["remarkable"],
    hint: "Cần tính từ 'remarkable' (đáng chú ý, phi thường) để bổ nghĩa cho danh từ 'memory'."
  },
  {
    id: 39,
    part: "Phần 5",
    partDesc: "Bài Tập Tổng Hợp Nâng Cao",
    sentence: "The new policy is highly ________.",
    baseWord: "BENEFIT",
    correctAnswer: "beneficial",
    acceptedAnswers: ["beneficial"],
    hint: "Cần một Tính từ 'beneficial' (có lợi, bổ ích) theo sau trạng từ chỉ mức độ 'highly' để miêu tả chính sách mới."
  },
  {
    id: 40,
    part: "Phần 5",
    partDesc: "Bài Tập Tổng Hợp Nâng Cao",
    sentence: "He showed great ________ in the face of danger.",
    baseWord: "COURAGEOUS",
    correctAnswer: "courage",
    acceptedAnswers: ["courage"],
    hint: "Đứng sau tính từ 'great' cần một Danh từ trừu tượng biểu thị lòng dũng cảm vượt khó."
  }
];
