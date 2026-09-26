export interface HistoricalEntry {
  id: string;
  date: string;
  title: string;
  statement: string;
  sourceIds: string[];
}

// Historical statements stay in data so the presentation copy can be reviewed separately from motion code.
export const historicalContent: HistoricalEntry[] = [
  {
    id: 'departure-1911',
    date: '05.06.1911',
    title: 'Rời cảng Sài Gòn',
    statement: 'Nguyễn Tất Thành lên tàu Amiral Latouche Tréville, bắt đầu hành trình tìm đường cứu nước.',
    sourceIds: ['departure-1911'],
  },
  {
    id: 'petition-1919',
    date: '06.1919',
    title: 'Yêu sách của Nhân dân An Nam',
    statement: 'Bản yêu sách được gửi tới Hội nghị Versailles; các yêu cầu đề cập quyền tự do, bình đẳng và dân chủ.',
    sourceIds: ['petition-1919'],
  },
  {
    id: 'theses-1920',
    date: '07.1920',
    title: 'Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa',
    statement: 'Nguyễn Ái Quốc tiếp cận luận cương của V.I. Lênin đăng trên báo L’Humanité.',
    sourceIds: ['theses-1920'],
  },
  {
    id: 'tours-1920',
    date: '12.1920',
    title: 'Đại hội lần thứ XVIII của Đảng Xã hội Pháp tại Tours',
    statement: 'Nguyễn Ái Quốc tham dự Đại hội và bỏ phiếu tán thành gia nhập Quốc tế Cộng sản.',
    sourceIds: ['tours-1920'],
  },
];

export const getHistoricalEntry = (id: string) => historicalContent.find((entry) => entry.id === id);
