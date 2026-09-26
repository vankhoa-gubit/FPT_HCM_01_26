export interface SourceRecord {
  id: string;
  title: string;
  organization: string;
  year: string;
  url: string;
  supports: string;
  usedInScenes: number[];
}

export const sources: SourceRecord[] = [
  {
    id: 'journey-1911-1920',
    title: 'Những dấu mốc lịch sử trên hành trình tìm đường cứu nước, giải phóng dân tộc của Nguyễn Ái Quốc',
    organization: 'hochiminh.vn',
    year: '2022',
    url: 'https://hochiminh.vn/tu-tuong-dao-duc-ho-chi-minh/nghien-cuu-tu-tuong-dao-duc-ho-chi-minh/nhung-dau-moc-lich-su-tren-hanh-trinh-tim-duong-cuu-nuoc-giai-phong-dan-toc-cua-nguyen-ai-quoc-6949',
    supports: 'Tổng quan hành trình 1911–1920, việc lao động, học tập, quan sát đời sống ở nhiều nơi và tiếp cận tư liệu chính trị.',
    usedInScenes: [4],
  },
  {
    id: 'context-early-century',
    title: 'Chuyến đi lịch sử',
    organization: 'Bảo tàng Hồ Chí Minh',
    year: 'Tư liệu bảo tàng',
    url: 'https://baotanghochiminh.vn/chuyen-di-lich-su.htm',
    supports: 'Bối cảnh các phong trào yêu nước và việc tìm kiếm con đường cứu nước trước năm 1911.',
    usedInScenes: [2],
  },
  {
    id: 'departure-1911',
    title: 'Hành trình của con tàu Amiral Latouche Tréville đưa Nguyễn Tất Thành ra đi tìm đường cứu nước',
    organization: 'Bảo tàng Hồ Chí Minh',
    year: '2021',
    url: 'https://baotanghochiminh.vn/hanh-trinh-cua-con-tau-amiral-latouche-treville-dua-nguyen-tat-thanh-ra-di-tim-duong-cuu-nuoc.htm',
    supports: 'Ngày 5/6/1911, Nguyễn Tất Thành rời cảng Sài Gòn trên tàu Amiral Latouche Tréville.',
    usedInScenes: [3, 4, 10],
  },
  {
    id: 'petition-1919',
    title: 'Những dấu mốc lịch sử trên hành trình tìm đường cứu nước, giải phóng dân tộc của Nguyễn Ái Quốc',
    organization: 'hochiminh.vn',
    year: '2022',
    url: 'https://hochiminh.vn/tu-tuong-dao-duc-ho-chi-minh/nghien-cuu-tu-tuong-dao-duc-ho-chi-minh/nhung-dau-moc-lich-su-tren-hanh-trinh-tim-duong-cuu-nuoc-giai-phong-dan-toc-cua-nguyen-ai-quoc-6949',
    supports: 'Tháng 6/1919, bản Yêu sách của Nhân dân An Nam được gửi tới Hội nghị Versailles; bài viết nêu các yêu cầu về tự do, bình đẳng và dân chủ.',
    usedInScenes: [5],
  },
  {
    id: 'theses-1920',
    title: 'Nguyễn Ái Quốc nghiên cứu Sơ thảo luận cương của V.I. Lênin',
    organization: 'Tư liệu - Văn kiện Đảng Cộng sản Việt Nam',
    year: '2019',
    url: 'https://tulieuvankien.dangcongsan.vn/c-mac-angghen-lenin-ho-chi-minh/ho-chi-minh/nghien-cuu-hoc-tap-tu-tuong/nguyen-ai-quoc-nghien-cuu-so-thao-lan-thu-nhat-nhung-luan-cuong-ve-van-de-dan-toc-va-van-de-thuoc-dia-cua-lenin-3491',
    supports: 'Báo L’Humanité đăng luận cương vào ngày 16–17/7/1920; Nguyễn Ái Quốc nghiên cứu văn bản này.',
    usedInScenes: [6],
  },
  {
    id: 'tours-1920',
    title: 'Đồng chí Nguyễn Ái Quốc và Đại hội toàn quốc lần thứ 18 Đảng Xã hội Pháp',
    organization: 'Tư liệu - Văn kiện Đảng Cộng sản Việt Nam',
    year: '2015',
    url: 'https://tulieuvankien.dangcongsan.vn/c-mac-angghen-lenin-ho-chi-minh/ho-chi-minh/nghien-cuu-hoc-tap-tu-tuong/dong-chi-nguyen-ai-quoc-va-dai-hoi-toan-quoc-lan-thu-18-dang-xa-hoi-phap-2599',
    supports: 'Đại hội diễn ra từ ngày 25 đến 30/12/1920 tại Tours; Nguyễn Ái Quốc bỏ phiếu tán thành Quốc tế Cộng sản.',
    usedInScenes: [7],
  },
];

export const getSource = (id: string) => sources.find((source) => source.id === id);
