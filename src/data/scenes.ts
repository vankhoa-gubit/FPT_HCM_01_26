export interface SceneDefinition {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  durationSeconds: number;
  chapter: string;
  speakerNotes: string;
  transition: string;
  sourceIds: string[];
  beatCount?: number;
}

export const scenes: SceneDefinition[] = [
  {
    id: 'opening',
    number: '01',
    eyebrow: 'CÂU HỎI MỞ ĐẦU',
    title: 'Từ chủ nghĩa yêu nước đến chủ nghĩa Mác – Lênin',
    durationSeconds: 80,
    chapter: 'ĐẶT VẤN ĐỀ',
    speakerNotes: [
      'Đầu thế kỷ XX, Việt Nam không thiếu những người yêu nước. Phan Bội Châu, Phan Châu Trinh, Hoàng Hoa Thám và nhiều sĩ phu đã tìm kiếm những phương thức khác nhau để giành lại độc lập.',
      'Vì vậy, câu hỏi của bài thuyết trình hôm nay không phải là Nguyễn Ái Quốc có yêu nước hay không. Câu hỏi quan trọng hơn là: từ lòng yêu nước ban đầu, bằng cách nào Nguyễn Ái Quốc từng bước hình thành một hệ thống nhận thức mới và đi đến lựa chọn chủ nghĩa Mác – Lênin?',
      'Nhóm chúng em cho rằng đây không phải là một sự thay đổi tư tưởng xảy ra trong một ngày. Đó là kết quả của gần mười năm quan sát, trải nghiệm, thử nghiệm chính trị và tiếp nhận lý luận, trong đó năm 1920 trở thành bước ngoặt.',
      'Mời cả lớp chọn một hướng nếu mình là thanh niên Việt Nam năm 1911: tìm sự giúp đỡ từ một nước châu Á, cải cách xã hội và giáo dục, hay sang phương Tây để tìm hiểu chính các nước đang thống trị thuộc địa. Dành khoảng 15–20 giây để giơ tay hoặc chọn trên màn hình. Chưa có đáp án đúng hay sai ở câu hỏi mở đầu này.',
    ].join('\n\n'),
    transition: 'Từ câu hỏi cá nhân, chuyển sang cuộc khủng hoảng về phương hướng cứu nước.',
    sourceIds: ['context-early-century', 'asset-earth-map'],
  },
  {
    id: 'crossroads',
    number: '02',
    eyebrow: 'BỐI CẢNH ĐẦU THẾ KỶ XX',
    title: 'Yêu nước, nhưng đi con đường nào?',
    durationSeconds: 90,
    chapter: 'ĐẶT VẤN ĐỀ',
    speakerNotes: [
      'Nguyễn Tất Thành trưởng thành trong bối cảnh nhiều phong trào yêu nước đã xuất hiện nhưng chưa đạt được mục tiêu giành độc lập.',
      'Nguyễn Tất Thành trân trọng tinh thần yêu nước của những người đi trước, nhưng không lựa chọn lặp lại hoàn toàn con đường của họ. Các tư liệu chính thống ghi nhận ông không đi theo con đường của Phan Bội Châu, Phan Châu Trinh hay Hoàng Hoa Thám mà lựa chọn sang phương Tây để khảo nghiệm thực tế.',
      'Chủ nghĩa yêu nước xác định mục tiêu là độc lập dân tộc, nhưng bản thân lòng yêu nước chưa tự động cung cấp một phương pháp, lực lượng và tổ chức để đạt mục tiêu ấy.',
      'Vì thế, hành trình sau năm 1911 có thể được hiểu như quá trình đi tìm câu trả lời cho ba vấn đề: dựa vào lực lượng nào, đấu tranh bằng phương pháp nào, và dựa trên hệ tư tưởng nào?',
    ].join('\n\n'),
    transition: 'Lựa chọn sang phương Tây mở đầu một cách tìm hiểu bằng trải nghiệm trực tiếp.',
    sourceIds: ['context-early-century', 'journey-1911-1920'],
  },
  {
    id: 'departure',
    number: '03',
    eyebrow: '5 THÁNG 6, 1911 · SÀI GÒN',
    title: 'Ra đi để khảo nghiệm thực tiễn',
    durationSeconds: 90,
    chapter: 'KHẢO NGHIỆM',
    speakerNotes: [
      'Ngày 5 tháng 6 năm 1911, Nguyễn Tất Thành rời bến Nhà Rồng trên tàu Amiral Latouche-Tréville, bắt đầu hành trình ra nước ngoài.',
      'Điểm đáng phân tích không đơn thuần là việc đi ra nước ngoài, mà là phương pháp. Thay vì chỉ tìm một nước làm chỗ dựa, Nguyễn Tất Thành muốn quan sát trực tiếp thế giới, trong đó có chính nước Pháp. Các nguồn của Bảo tàng Hồ Chí Minh mô tả đây là lựa chọn có chủ đích nhằm tìm hiểu thực tế của nước Pháp và phương Tây.',
      'Từ đây có thể hình thành một nguyên tắc xuyên suốt hành trình: không chấp nhận sẵn một đáp án, đi khảo nghiệm thực tiễn, so sánh, rồi mới lựa chọn.',
      'Năm 1911 chưa phải thời điểm Nguyễn Ái Quốc đã có sẵn một hệ tư tưởng hoàn chỉnh. Đây là điểm xuất phát của quá trình tìm kiếm. Chiếc la bàn và hành lý trên hình là đạo cụ minh họa, không phải hiện vật lịch sử.',
    ].join('\n\n'),
    transition: 'Rời Việt Nam giúp mở rộng điều tra từ câu chuyện trong nước sang đời sống thuộc địa trên thế giới.',
    sourceIds: ['departure-1911', 'journey-1911-1920', 'asset-compass', 'asset-ship-wheel'],
  },
  {
    id: 'world-journey',
    number: '04',
    eyebrow: 'QUAN SÁT VÀ SO SÁNH',
    title: 'Từ vấn đề Việt Nam đến vấn đề thuộc địa',
    durationSeconds: 80,
    chapter: 'KHẢO NGHIỆM',
    speakerNotes: [
      'Trong những năm sống và lao động ở nhiều nơi, Nguyễn Tất Thành không chỉ tiếp xúc với đời sống của người Việt Nam mà còn quan sát điều kiện của người lao động và các dân tộc thuộc địa khác.',
      'Phạm vi nhận thức dần thay đổi. Ban đầu câu hỏi là làm thế nào giải phóng Việt Nam. Dần dần, câu hỏi được đặt trong một vấn đề rộng hơn: vì sao nhiều dân tộc ở các châu lục khác nhau cùng rơi vào tình trạng thuộc địa và áp bức?',
      'Muốn tìm được một lý luận có sức giải thích, trước hết cần nhận ra rằng vấn đề mình gặp không hoàn toàn là một hiện tượng riêng lẻ. Thực tiễn quốc tế đã chuẩn bị điều kiện nhận thức để Nguyễn Ái Quốc sau đó tiếp cận vấn đề dân tộc và thuộc địa ở cấp độ lý luận.',
    ].join('\n\n'),
    transition: 'Từ quan sát, Nguyễn Ái Quốc bắt đầu nêu vấn đề bằng hoạt động chính trị công khai.',
    sourceIds: ['journey-1911-1920', 'asset-earth-map'],
  },
  {
    id: 'paris-1919',
    number: '05',
    eyebrow: '18 THÁNG 6, 1919 · VERSAILLES',
    title: 'Nêu yêu sách bằng một diễn đàn quốc tế',
    durationSeconds: 90,
    chapter: 'THỬ NGHIỆM CHÍNH TRỊ',
    speakerNotes: [
      'Năm 1919 là một dấu mốc đáng chú ý. Ngày 18 tháng 6, thay mặt nhóm người Việt Nam yêu nước tại Pháp, Nguyễn Tất Thành gửi Yêu sách của nhân dân An Nam tới Hội nghị Versailles và ký tên Nguyễn Ái Quốc.',
      'Bản yêu sách gồm tám điểm, trong đó đề cập đến các quyền như tự do báo chí, tự do ngôn luận, tự do lập hội, cải cách pháp lý và quyền đại diện.',
      'Ở đây chúng ta nhìn thấy một giai đoạn chuyển tiếp. Nguyễn Ái Quốc đã không còn chỉ quan sát. Ông bắt đầu sử dụng các diễn đàn và ngôn ngữ chính trị quốc tế để nêu vấn đề của người Việt Nam.',
      'Bản yêu sách nêu các quyền tự do và cải cách; không nên trình bày nó như lời kêu gọi đòi độc lập tức thời. Câu hỏi cơ bản vẫn còn: lực lượng quốc tế nào thực sự đặt vấn đề giải phóng các dân tộc thuộc địa vào chương trình hành động của mình? Câu hỏi ấy đưa chúng ta đến năm 1920.',
    ].join('\n\n'),
    transition: 'Câu hỏi về lực lượng giải phóng dẫn tới việc tiếp cận Luận cương của Lênin.',
    sourceIds: ['petition-1919', 'journey-1911-1920', 'asset-typewriter'],
  },
  {
    id: 'theses-1920',
    number: '06',
    eyebrow: 'THÁNG 7, 1920 · L’ HUMANITÉ',
    title: 'Luận cương đặt vấn đề thuộc địa vào trung tâm',
    durationSeconds: 140,
    chapter: 'BƯỚC NGOẶT',
    speakerNotes: [
      'Bước ngoặt lý luận diễn ra vào mùa hè năm 1920. Ngày 16 và 17 tháng 7 năm 1920, báo L’Humanité đăng bản Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa của V.I. Lênin. Sau đó Nguyễn Ái Quốc đọc văn kiện này.',
      'Văn kiện có ý nghĩa đặc biệt vì trực tiếp đặt vấn đề dân tộc và thuộc địa trong chiến lược của phong trào cộng sản quốc tế, đồng thời nhấn mạnh sự liên hệ giữa phong trào công nhân với cuộc đấu tranh của các dân tộc bị áp bức.',
      'Nhiều năm sau, khi nhìn lại quá trình này, Hồ Chí Minh viết: “Lúc đầu, chính là chủ nghĩa yêu nước, chứ chưa phải chủ nghĩa cộng sản”.',
      'Câu này cho thấy quan hệ ở đây không phải yêu nước bị loại bỏ rồi chủ nghĩa Mác – Lênin thay thế. Có thể hiểu rằng chủ nghĩa yêu nước tạo ra động lực và câu hỏi; chủ nghĩa Mác – Lênin cung cấp một hệ thống lý luận mà Nguyễn Ái Quốc lựa chọn để trả lời câu hỏi ấy.',
      'Mời cả lớp chọn lý do vì sao Luận cương tạo bước ngoặt. Đáp án B nêu đúng điểm văn kiện trực tiếp đề cập các dân tộc thuộc địa và lực lượng giải phóng. Phương án A không mô tả trọng tâm văn kiện; phương án C diễn đạt ngược lại tinh thần giải phóng. Sau khi trao đổi, nhấn mạnh đây là mắt xích nối chủ nghĩa yêu nước với một lý luận cách mạng có phạm vi quốc tế.',
    ].join('\n\n'),
    transition: 'Tháng 7 thể hiện bước chuyển nhận thức; tháng 12 cho thấy lựa chọn chính trị cụ thể.',
    sourceIds: ['theses-1920', 'lenin-essay-quote', 'asset-clasp-book'],
    beatCount: 1,
  },
  {
    id: 'tours-1920',
    number: '07',
    eyebrow: 'THÁNG 12, 1920 · TOURS',
    title: 'Từ nhận thức đến lựa chọn chính trị',
    durationSeconds: 90,
    chapter: 'BƯỚC NGOẶT',
    speakerNotes: [
      'Nếu tháng 7 năm 1920 là bước ngoặt về nhận thức lý luận, thì tháng 12 năm 1920 thể hiện bước chuyển đó bằng một lựa chọn chính trị cụ thể.',
      'Tại Đại hội Tours của Đảng Xã hội Pháp, Nguyễn Ái Quốc bỏ phiếu tán thành việc gia nhập Quốc tế Cộng sản và tham gia lực lượng hình thành Đảng Cộng sản Pháp. Tư liệu chính thống của Việt Nam xem đây là cột mốc quan trọng trong quá trình Nguyễn Ái Quốc chuyển sang hoạt động trong phong trào cộng sản.',
      '1920 không phải kết thúc quá trình học tập. Chính Hồ Chí Minh sau này mô tả đây là một quá trình từng bước, vừa nghiên cứu lý luận, vừa hoạt động thực tế.',
      'Vì vậy, cách diễn đạt chính xác hơn là: 1920 là bước ngoặt về chất, chứ không phải điểm kết thúc của quá trình hình thành tư tưởng.',
    ].join('\n\n'),
    transition: 'Từ lựa chọn chính trị, ta có thể phân tích điều gì tiếp tục và điều gì thay đổi.',
    sourceIds: ['tours-1920', 'lenin-essay-quote'],
  },
  {
    id: 'synthesis',
    number: '08',
    eyebrow: 'NHẬN ĐỊNH CỦA NHÓM',
    title: 'Điều gì thay đổi sau bước ngoặt 1920?',
    durationSeconds: 120,
    chapter: 'TỔNG HỢP',
    speakerNotes: [
      'Đến đây, nhóm chúng em muốn đưa ra nhận định trung tâm của bài: điểm quan trọng của hành trình không phải là sự thay thế lòng yêu nước bằng một học thuyết mới, mà là sự chuyển hóa từ tình cảm yêu nước thành một nhận thức chính trị có hệ thống hơn.',
      'Có thể mô hình hóa quá trình này thành sáu bước: yêu nước, đặt câu hỏi, khảo nghiệm thế giới, kiểm nghiệm các tư tưởng, tiếp nhận lý luận, rồi trở lại hoạt động thực tiễn.',
      'Nguyễn Ái Quốc không tiếp nhận chủ nghĩa Mác – Lênin chỉ từ sách vở. Theo lời kể sau này của chính Hồ Chí Minh, quá trình ấy diễn ra đồng thời giữa nghiên cứu lý luận và hoạt động thực tế.',
      'Mối quan hệ quan trọng nhất mà bài muốn làm rõ là: thực tiễn đặt ra vấn đề, lý luận giải thích vấn đề, và thực tiễn tiếp tục kiểm nghiệm, phát triển nhận thức. Đây là diễn giải của nhóm dựa trên các mốc đã trình bày, không phải trích dẫn nguyên văn.',
    ].join('\n\n'),
    transition: 'Sau năm 1920, trọng tâm dịch chuyển từ tìm đường sang truyền bá và tổ chức.',
    sourceIds: ['lenin-essay-quote', 'theses-1920', 'tours-1920'],
    beatCount: 2,
  },
  {
    id: 'after-1920',
    number: '09',
    eyebrow: '1920 → 1921–1929 → 1930',
    title: 'Từ tìm thấy con đường đến chuẩn bị tổ chức',
    durationSeconds: 80,
    chapter: 'VẬN DỤNG',
    speakerNotes: [
      'Nếu chỉ dừng ở việc Nguyễn Ái Quốc tự mình tìm thấy một hệ tư tưởng thì hành trình vẫn chưa hoàn thành. Sau năm 1920, trọng tâm hoạt động chuyển dần từ tìm kiếm con đường sang truyền bá và tổ chức lực lượng.',
      'Các nguồn tư liệu chính thống ghi nhận trong những năm 1921–1929, Nguyễn Ái Quốc tiếp tục truyền bá những quan điểm của chủ nghĩa Mác – Lênin và chuẩn bị về chính trị, tư tưởng, tổ chức; đến đầu năm 1930, ông chủ trì hội nghị hợp nhất các tổ chức cộng sản, dẫn tới sự ra đời của Đảng Cộng sản Việt Nam.',
      'Vì thế có thể phân biệt: 1911–1920 chủ yếu là quá trình tìm đường; 1921–1930 chuyển mạnh sang quá trình chuẩn bị và tổ chức thực hiện con đường đã lựa chọn. Phân biệt hai giai đoạn giúp bài không bị lan man sang toàn bộ cuộc đời Hồ Chí Minh.',
    ].join('\n\n'),
    transition: 'Từ lịch sử, chuyển sang vận dụng phương pháp tiếp nhận tri thức trong bối cảnh hội nhập hiện nay.',
    sourceIds: ['journey-1911-1920', 'milestones-1930', 'asset-press'],
  },
  {
    id: 'application',
    number: '10',
    eyebrow: 'VẬN DỤNG · BỐI CẢNH 2025',
    title: 'Hội nhập không đồng nghĩa với tiếp nhận thụ động',
    durationSeconds: 110,
    chapter: 'VẬN DỤNG',
    speakerNotes: [
      'Giá trị mà nhóm chúng em muốn liên hệ với hiện tại không phải là sao chép một cách máy móc hoàn cảnh của hơn một thế kỷ trước. Điều có thể tham khảo là phương pháp tiếp cận tri thức và thế giới.',
      'Việt Nam ngày nay có mức độ hội nhập quốc tế rất lớn. Theo Cục Thống kê, năm 2025 kim ngạch xuất khẩu hàng hóa đạt khoảng 475,04 tỷ USD, nhập khẩu khoảng 455,01 tỷ USD, tức tổng cộng khoảng 930,05 tỷ USD. Khu vực có vốn đầu tư nước ngoài chiếm 77,3% giá trị xuất khẩu.',
      'Những con số này không dùng để chứng minh một sự kiện của năm 1920. Chúng cho thấy bối cảnh hiện nay đặt ra một câu hỏi tương tự về phương pháp: làm thế nào vừa tiếp nhận nguồn lực và tri thức quốc tế, vừa xây dựng năng lực tự chủ và khả năng chọn lọc của chính mình?',
      'Với sinh viên, điều đó có thể bắt đầu rất cụ thể: không tiếp nhận một thông tin chỉ vì nó xuất hiện trên Internet hay do AI đưa ra; cần kiểm chứng nguồn, hiểu bối cảnh và biến kiến thức thành năng lực giải quyết vấn đề.',
      'Điều này cũng liên hệ trực tiếp với yêu cầu sử dụng AI có trách nhiệm trong chính bài thuyết trình này.',
    ].join('\n\n'),
    transition: 'Khép lại bằng mối quan hệ giữa động lực yêu nước, khảo nghiệm thực tiễn, lý luận và hành động.',
    sourceIds: ['trade-2025', 'trade-detail-2025'],
  },
  {
    id: 'conclusion',
    number: '11',
    eyebrow: 'KẾT LUẬN',
    title: 'Một hành trình, ba sự chuyển biến',
    durationSeconds: 70,
    chapter: 'KẾT LUẬN',
    speakerNotes: [
      'Nếu phải tóm tắt toàn bộ hành trình bằng một câu, nhóm chúng em cho rằng: Nguyễn Ái Quốc bắt đầu bằng lòng yêu nước, đi tìm lời giải bằng thực tiễn, gặp chủ nghĩa Mác – Lênin ở điểm giao giữa vấn đề dân tộc và vấn đề thuộc địa, rồi tiếp tục kiểm nghiệm lựa chọn ấy trong hoạt động chính trị.',
      'Vì vậy, bước ngoặt năm 1920 không nên được nhìn như một sự kiện hoàn toàn tách biệt. Phía sau nó là gần mười năm đi, quan sát, đặt câu hỏi, so sánh, thử nghiệm, nghiên cứu, rồi lựa chọn.',
      'Một lựa chọn có cơ sở không bắt đầu từ việc tìm một câu trả lời có sẵn; nó bắt đầu từ việc biết đặt đúng câu hỏi, tiếp xúc với thực tiễn và kiểm chứng tri thức trước khi lựa chọn.',
      'Xin cảm ơn thầy cô và các bạn.',
    ].join('\n\n'),
    transition: 'Mời lớp đặt câu hỏi; phần hỏi đáp và ghi chú đầy đủ dành cho người thuyết trình.',
    sourceIds: ['lenin-essay-quote', 'journey-1911-1920', 'asset-lotus'],
  },
];

export const totalPresentationSeconds = scenes.reduce((total, scene) => total + scene.durationSeconds, 0);

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return minutes + ':' + String(remaining).padStart(2, '0');
};
