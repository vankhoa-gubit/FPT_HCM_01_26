export interface SceneDefinition {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  durationSeconds: number;
  chapter: string;
  narration: string;
  nextLabel: string;
  sourceIds: string[];
}

export const scenes: SceneDefinition[] = [
  {
    id: 'opening', number: '01', eyebrow: 'HÀNH TRÌNH',
    title: 'Từ chủ nghĩa yêu nước\nđến chủ nghĩa Mác – Lênin', durationSeconds: 45,
    chapter: 'HÀNH TRÌNH', narration: 'Mở đầu bằng câu hỏi về điểm khởi hành của một hành trình tư tưởng.',
    nextLabel: 'Câu hỏi trung tâm', sourceIds: [],
  },
  {
    id: 'question', number: '02', eyebrow: 'CÂU HỎI TRUNG TÂM',
    title: 'Nếu lòng yêu nước là điểm khởi đầu, điều gì giúp một người tìm được con đường cứu nước?', durationSeconds: 45,
    chapter: 'HÀNH TRÌNH', narration: 'Dừng lại vài giây để lớp suy nghĩ trước khi đi tiếp.',
    nextLabel: 'Ngã rẽ lịch sử', sourceIds: [],
  },
  {
    id: 'crossroads', number: '03', eyebrow: 'BỐI CẢNH TRƯỚC 1911',
    title: 'Đầu thế kỷ XX: một câu hỏi chưa có lời giải ổn định', durationSeconds: 105,
    chapter: 'BỐI CẢNH', narration: 'Đặt các khuynh hướng cứu nước vào bối cảnh lịch sử, không xếp hạng đúng sai.',
    nextLabel: 'Rời cảng Sài Gòn', sourceIds: ['context-early-century'],
  },
  {
    id: 'departure', number: '04', eyebrow: '05.06.1911 · SÀI GÒN',
    title: 'Một hành trình bắt đầu', durationSeconds: 75,
    chapter: 'HÀNH TRÌNH', narration: 'Ngày 5 tháng 6 năm 1911, Nguyễn Tất Thành rời cảng Sài Gòn trên tàu Amiral Latouche Tréville.',
    nextLabel: 'Khảo nghiệm thế giới', sourceIds: ['departure-1911'],
  },
  {
    id: 'world-journey', number: '05', eyebrow: '1911 — 1919',
    title: 'Đi để khảo nghiệm thực tiễn', durationSeconds: 135,
    chapter: 'HÀNH TRÌNH', narration: 'Không kể một tuyến địa lý chi tiết; tập trung vào trải nghiệm, quan sát và đối chiếu.',
    nextLabel: 'Paris · 1919', sourceIds: ['journey-1911-1920'],
  },
  {
    id: 'paris-1919', number: '06', eyebrow: 'PARIS · 1919',
    title: 'Yêu sách của Nhân dân An Nam', durationSeconds: 105,
    chapter: 'BƯỚC NGOẶT', narration: 'Một văn kiện năm 1919 đưa các yêu cầu về quyền của người dân thuộc địa ra diễn đàn quốc tế.',
    nextLabel: 'Tháng 7 năm 1920', sourceIds: ['petition-1919'],
  },
  {
    id: 'theses-1920', number: '07', eyebrow: 'THÁNG 7 · 1920',
    title: 'Luận cương về vấn đề dân tộc và thuộc địa', durationSeconds: 165,
    chapter: 'BƯỚC NGOẶT', narration: 'Tiếp cận văn bản của V.I. Lênin đăng trên L’Humanité; phần tổng hợp là diễn giải của nhóm.',
    nextLabel: 'Đại hội Tours', sourceIds: ['theses-1920'],
  },
  {
    id: 'tours-1920', number: '08', eyebrow: 'TOURS · 12.1920',
    title: 'Từ tiếp cận lý luận đến một lựa chọn chính trị cụ thể', durationSeconds: 90,
    chapter: 'BƯỚC NGOẶT', narration: 'Tại Đại hội Tours, Nguyễn Ái Quốc bỏ phiếu tán thành gia nhập Quốc tế Cộng sản.',
    nextLabel: 'Sơ đồ tổng hợp', sourceIds: ['tours-1920'],
  },
  {
    id: 'synthesis', number: '09', eyebrow: 'ANALYTICAL SYNTHESIS',
    title: 'Từ yêu nước đến lựa chọn lý luận', durationSeconds: 120,
    chapter: 'TỔNG HỢP', narration: 'Lần lượt đi qua sáu mắt xích trong sơ đồ diễn giải của nhóm.',
    nextLabel: 'Dừng lại suy ngẫm', sourceIds: [],
  },
  {
    id: 'reflection', number: '10', eyebrow: 'DỪNG LẠI 45 GIÂY',
    title: 'Nếu chỉ có lòng yêu nước mà không có quá trình khảo nghiệm thực tiễn và tiếp cận lý luận, liệu hành trình tư tưởng ấy có thể diễn ra như vậy?', durationSeconds: 90,
    chapter: 'TỔNG HỢP', narration: 'Mời trao đổi với người bên cạnh. Bấm T để bắt đầu đồng hồ 20 giây.',
    nextLabel: 'Kết luận', sourceIds: [],
  },
  {
    id: 'conclusion', number: '11', eyebrow: 'THE JOURNEY',
    title: 'Từ một hành trình địa lý\nđến một hành trình tư tưởng', durationSeconds: 60,
    chapter: 'TỔNG HỢP', narration: 'Khép lại bằng hình ảnh đường sáng nối hành trình địa lý và hành trình nhận thức.',
    nextLabel: 'Kết thúc', sourceIds: ['departure-1911'],
  },
];

export const totalPresentationSeconds = scenes.reduce((total, scene) => total + scene.durationSeconds, 0);

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}:${String(remaining).padStart(2, '0')}`;
};
