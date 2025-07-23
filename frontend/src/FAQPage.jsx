import React, { useState } from "react";

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleQuestion = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const faqs = [
        {
            question: "SecondWear là gì?",
            answer:
                "SecondWear là nền tảng thương mại điện tử chuyên cung cấp quần áo second-hand chất lượng, giúp người dùng mua sắm thời trang tiết kiệm và bền vững."
        },
        {
            question: "Sản phẩm trên SecondWear có đảm bảo chất lượng không?",
            answer:
                "Chúng tôi kiểm định sản phẩm kỹ lưỡng trước khi đăng bán. Mỗi món đồ đều được chụp thật, mô tả chi tiết và phân loại theo tình trạng sử dụng."
        },
        {
            question: "Tôi có thể đổi/trả hàng nếu không ưng ý?",
            answer:
                "Có, bạn có thể yêu cầu đổi/trả trong vòng 7 ngày kể từ khi nhận hàng, miễn là sản phẩm còn nguyên trạng như lúc nhận. Vui lòng tham khảo Chính sách đổi trả để biết thêm chi tiết."
        },
        {
            question: "Làm thế nào để thanh toán?",
            answer:
                "Chúng tôi hỗ trợ thanh toán bằng thẻ tín dụng, chuyển khoản ngân hàng hoặc thanh toán khi nhận hàng (COD)."
        },
        {
            question: "Làm sao để bán quần áo trên SecondWear?",
            answer:
                "Bạn cần đăng ký tài khoản người bán, cung cấp thông tin sản phẩm và hình ảnh. Sau khi được duyệt, sản phẩm của bạn sẽ hiển thị trên hệ thống."
        },
        {
            question: "Tôi nên liên hệ ai nếu gặp sự cố?",
            answer:
                "Bạn có thể liên hệ chúng tôi qua email: trung142p@gmail.com hoặc hotline 0778 157 629 để được hỗ trợ kịp thời."
        },
        {
            question: "Sản phẩm có được giặt sạch trước khi gửi không?",
            answer:
                "Tất cả sản phẩm được giặt là sạch sẽ và kiểm tra kỹ trước khi đóng gói và vận chuyển đến tay khách hàng. Chúng tôi cam kết mang đến trải nghiệm mua hàng sạch sẽ, an toàn và chuyên nghiệp."
        },
        {
            question: "Tôi có thể xem thử sản phẩm trước khi mua không?",
            answer:
                "Hiện tại SecondWear chỉ hoạt động trực tuyến nên không hỗ trợ xem sản phẩm trực tiếp. Tuy nhiên, chúng tôi luôn cung cấp hình ảnh thật và mô tả chi tiết để bạn dễ dàng lựa chọn."
        },
        {
            question: "Làm thế nào để xóa tài khoản SecondWear?",
            answer:
                "Nếu bạn muốn xóa tài khoản, vui lòng gửi yêu cầu qua email đến hotro@secondwear.vn. Chúng tôi sẽ xử lý trong vòng 48 giờ và xác nhận lại với bạn."
        },
        {
            question: "SecondWear có chương trình tích điểm hay ưu đãi thành viên không?",
            answer:
                "Có! Người dùng đăng ký tài khoản sẽ được tham gia các chương trình ưu đãi, tích điểm và nhận voucher định kỳ. Hãy thường xuyên kiểm tra hộp thư để không bỏ lỡ nhé!"
        },
        {
            question: "Tôi có thể mua số lượng lớn để kinh doanh không?",
            answer:
                "Chúng tôi có hỗ trợ bán sỉ hoặc số lượng lớn tùy theo từng sản phẩm. Vui lòng liên hệ trực tiếp để được tư vấn chính sách ưu đãi riêng dành cho người mua sỉ."
        },
        {
            question: "Làm sao để nhận thông báo sản phẩm mới?",
            answer:
                "Bạn có thể bật thông báo trong trình duyệt, đăng ký nhận bản tin qua email, hoặc theo dõi fanpage của chúng tôi để cập nhật sản phẩm và ưu đãi mới nhất."
        },
        {
            question: "Có mất phí khi đăng ký làm người bán không?",
            answer:
                "Không. Việc đăng ký tài khoản người bán trên SecondWear hoàn toàn miễn phí. Tuy nhiên, có thể áp dụng phí dịch vụ nhỏ cho mỗi giao dịch thành công để duy trì nền tảng."
        },
        {
            question: "SecondWear có ứng dụng di động không?",
            answer:
                "Chúng tôi đang phát triển ứng dụng dành cho cả Android và iOS. Trong thời gian chờ đợi, bạn có thể truy cập website qua trình duyệt di động với trải nghiệm tối ưu."
        },
        {
            question: "Tôi có thể chỉnh sửa thông tin đơn hàng sau khi đặt không?",
            answer:
                "Bạn có thể chỉnh sửa trong vòng 6 tiếng kể từ lúc đặt hàng bằng cách liên hệ bộ phận hỗ trợ. Sau thời gian này, đơn có thể đã được xử lý nên việc chỉnh sửa sẽ bị hạn chế."
        },
        {
            question: "Chính sách bảo hành cho sản phẩm như thế nào?",
            answer:
                "Vì là hàng second-hand, các sản phẩm sẽ không có bảo hành chính hãng. Tuy nhiên, chúng tôi cam kết mô tả đúng tình trạng và cho phép đổi trả trong 7 ngày nếu có lỗi mô tả."
        },
        {
            question: "SecondWear có hỗ trợ khách hàng 24/7 không?",
            answer:
                "Hiện tại, bộ phận chăm sóc khách hàng hoạt động từ 8h đến 22h mỗi ngày, bao gồm cả cuối tuần. Mọi email và tin nhắn sẽ được phản hồi trong vòng 24 giờ."
        },
        {
            question: "SecondWear có chính sách dành cho sinh viên không?",
            answer:
                "Chúng tôi thường xuyên có các chương trình ưu đãi cho sinh viên như giảm giá, miễn phí vận chuyển hoặc combo tiết kiệm. Hãy theo dõi fanpage để không bỏ lỡ!"
        },
        {
            question: "Tôi có thể theo dõi nhiều đơn hàng cùng lúc không?",
            answer:
                "Có, hệ thống quản lý đơn hàng của bạn sẽ hiển thị tất cả đơn đang xử lý, giao hàng và hoàn tất. Bạn có thể kiểm tra tại mục 'Đơn hàng của tôi'."
        },
        {
            question: "Tôi bị mất mật khẩu thì làm sao khôi phục?",
            answer:
                "Tại trang đăng nhập, hãy nhấn vào 'Quên mật khẩu' và làm theo hướng dẫn để đặt lại mật khẩu mới qua email đăng ký tài khoản."
        },
        {
            question: "Có bị giới hạn số lượng sản phẩm khi đăng bán không?",
            answer:
                "Đối với tài khoản người bán mới, bạn có thể đăng tối đa 20 sản phẩm/tháng. Sau khi được đánh giá uy tín, bạn có thể đăng không giới hạn."
        },
        {
            question: "Sản phẩm second-hand có nguồn gốc từ đâu?",
            answer:
                "Sản phẩm đến từ cộng đồng người bán, cửa hàng ký gửi và các đối tác uy tín. Mỗi sản phẩm đều được xác minh trước khi hiển thị."
        },
        {
            question: "Có được hoàn tiền nếu sản phẩm bị lỗi không?",
            answer:
                "Tất nhiên. Nếu bạn nhận sản phẩm lỗi hoặc không đúng mô tả, chúng tôi sẽ hoàn tiền 100% hoặc đổi sản phẩm khác tùy theo yêu cầu."
        },
        {
            question: "Tôi có thể mua tặng người khác không?",
            answer:
                "Bạn hoàn toàn có thể mua sản phẩm và điền địa chỉ người nhận khác khi thanh toán. Hệ thống sẽ xử lý và giao hàng theo yêu cầu của bạn."
        },
        {
            question: "SecondWear có hỗ trợ xuất hóa đơn không?",
            answer:
                "Chúng tôi hỗ trợ xuất hóa đơn điện tử cho mọi đơn hàng. Hãy chọn yêu cầu hóa đơn khi thanh toán và điền thông tin cần thiết."
        },
        {
            question: "Có thể đổi sản phẩm đã mua sang sản phẩm khác không?",
            answer:
                "Có thể, trong vòng 7 ngày kể từ khi nhận hàng. Sản phẩm cần còn nguyên tem, chưa sử dụng và trong tình trạng ban đầu."
        },
        {
            question: "Tôi có cần chụp ảnh sản phẩm khi muốn bán không?",
            answer: "Có, người bán cần cung cấp ít nhất 2–3 ảnh rõ nét của sản phẩm (tổng thể và chi tiết), để giúp người mua đánh giá chính xác tình trạng món đồ.",
        },
        {
            question: "SecondWear có thu mua quần áo không?",
            answer: "Hiện tại chúng tôi chưa hỗ trợ thu mua trực tiếp, nhưng bạn có thể đăng ký tài khoản người bán và tự đăng sản phẩm để bắt đầu kinh doanh.",
        },
        {
            question: "SecondWear có hỗ trợ ship toàn quốc không?",
            answer: "Chúng tôi hỗ trợ giao hàng đến hầu hết các tỉnh thành tại Việt Nam. Với những khu vực vùng sâu vùng xa, thời gian vận chuyển có thể lâu hơn dự kiến.",
        },
        {
            question: "Làm sao để biết món đồ còn hàng hay không?",
            answer: "Trang sản phẩm sẽ hiển thị rõ trạng thái: 'Còn hàng' hoặc 'Đã bán'. Ngoài ra, hệ thống sẽ không cho phép bạn thanh toán nếu sản phẩm đã hết.",
        },
        {
            question: "Tôi có thể lưu lại sản phẩm yêu thích không?",
            answer: "Có, bạn có thể nhấn vào biểu tượng 'trái tim' để thêm sản phẩm vào danh sách yêu thích. Sau đó bạn có thể xem lại trong trang hồ sơ cá nhân.",
        },
        {
            question: "SecondWear có ứng dụng di động không?",
            answer: "Hiện tại chúng tôi đang phát triển ứng dụng dành cho Android và iOS. Trong thời gian này, bạn vẫn có thể dùng trình duyệt trên điện thoại để trải nghiệm đầy đủ chức năng.",
        },
        {
            question: "Tôi có thể đánh giá sản phẩm sau khi mua không?",
            answer: "Chắc chắn rồi! Sau khi nhận hàng, bạn có thể vào mục 'Đơn hàng của tôi' và để lại đánh giá về sản phẩm cũng như người bán.",
        },
        {
            question: "Tôi có thể tạm dừng hoạt động bán hàng không?",
            answer: "Có. Trong trang quản lý người bán, bạn có thể chuyển trạng thái gian hàng sang 'Tạm nghỉ' để ngừng hiển thị sản phẩm của mình trong thời gian mong muốn.",
        },
        {
            question: "Có thể hẹn lịch lấy hàng với shipper không?",
            answer: "Hiện tại hệ thống chưa hỗ trợ hẹn giờ cố định, nhưng bạn có thể ghi chú yêu cầu trong đơn hàng hoặc liên hệ với đơn vị vận chuyển sau khi đơn được tạo.",
        },
        {
            question: "Có giới hạn số lượng sản phẩm đăng bán không?",
            answer: "Với tài khoản thường, bạn có thể đăng tối đa 50 sản phẩm. Nếu bạn cần đăng nhiều hơn, hãy nâng cấp lên gói người bán chuyên nghiệp.",
        },
        {
            question: "SecondWear có chương trình khuyến mãi không?",
            answer: "Chúng tôi thường xuyên có các chương trình flash sale, giảm giá theo mùa hoặc khuyến mãi dành riêng cho thành viên thân thiết.",
        },
        {
            question: "Tôi có thể xem lịch sử mua hàng ở đâu?",
            answer: "Bạn có thể xem tất cả đơn hàng đã đặt trong mục 'Đơn hàng của tôi' trong hồ sơ người dùng. Tại đây bạn cũng có thể theo dõi trạng thái giao hàng.",
        },
        {
            question: "Sản phẩm bị lỗi do vận chuyển thì giải quyết thế nào?",
            answer: "Nếu hàng bị móp méo, rách, ướt do vận chuyển, hãy chụp ảnh và liên hệ với chúng tôi trong vòng 48 giờ để được đổi/trả miễn phí.",
        },
        {
            question: "Thông tin cá nhân của tôi có được bảo mật không?",
            answer: "Chúng tôi cam kết tuân thủ chính sách bảo mật nghiêm ngặt, dữ liệu của bạn sẽ không bao giờ bị bán hoặc chia sẻ cho bên thứ ba khi chưa có sự đồng ý.",
        },
        {
            question: "SecondWear có hỗ trợ khách hàng quốc tế không?",
            answer: "Hiện tại chúng tôi chỉ hoạt động tại Việt Nam. Trong tương lai, chúng tôi sẽ mở rộng thị trường ra các quốc gia lân cận.",
        },
        {
            question: "Tôi có thể hủy đơn hàng sau khi đã đặt không?",
            answer: "Bạn có thể hủy đơn trong vòng 2 giờ kể từ khi đặt. Sau thời gian này, đơn sẽ được chuyển qua xử lý và có thể không hủy được nữa.",
        },
        {
            question: "Sản phẩm có được bảo hành không?",
            answer: "Vì đây là hàng đã qua sử dụng, chúng tôi không cung cấp bảo hành sản phẩm. Tuy nhiên, bạn có thể đổi/trả nếu sản phẩm không đúng mô tả.",
        },
        {
            question: "Có thể xem sản phẩm trực tiếp không?",
            answer: "SecondWear hoạt động online hoàn toàn, vì vậy hiện tại không có showroom. Tuy nhiên, chúng tôi cung cấp hình ảnh thật chi tiết để bạn yên tâm lựa chọn.",
        },

        // ... Thêm các câu hỏi khác ở đây ...
    ];

    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page-container">
            <h1 className="page-title">Câu hỏi thường gặp</h1>
            <p className="page-intro">
                Dưới đây là những câu hỏi phổ biến từ người dùng. Nếu bạn cần thêm thông tin, đừng ngần ngại liên hệ với đội ngũ hỗ trợ SecondWear.
            </p>

            <div className="faq-search">
                <input
                    type="text"
                    placeholder="🔍 Tìm câu hỏi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="faq-list">
                {filteredFaqs.length === 0 ? (
                    <p className="no-results">Không tìm thấy câu hỏi phù hợp.</p>
                ) : (
                    filteredFaqs.map((item, index) => (
                        <div key={index} className="faq-item">
                            <button
                                className="faq-question"
                                onClick={() => toggleQuestion(index)}
                            >
                                {item.question}
                                <span className="faq-icon">
                                    {activeIndex === index ? "−" : "+"}
                                </span>
                            </button>
                            {activeIndex === index && (
                                <div className="faq-answer">
                                    <p>{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FAQPage;
